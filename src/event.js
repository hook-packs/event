import HookCallback from "@hook/callback";
const executeMethodsSymbol = Symbol("executeMethods");
const getHookCallbackSymbol = Symbol("getStandCallback");
const bindSymbol = Symbol("bindSymbol");
const parseEventSymbol = Symbol("parseEvent");
const defaultGroupSymbole = Symbol("defaultGroup");
const isEmpty = (data) => {
  return typeof data === "undefined" || data === "";
};
export default class Event {
  constructor(settings = {}) {
    this.hookCallbacks = {};
  }
  getDefaultEventGroup() {
    return defaultGroupSymbole;
  }
  configEventGroups(eventName, groups = {}) {
    const callback = this[getHookCallbackSymbol](eventName);
    Object.keys(groups)
      .concat(Object.getOwnPropertySymbols(groups))
      .forEach((group) => {
        const item = groups[group];
        if (Array.isArray(item)) {
          const [order, defaultExtra = 1000] = item;
          callback.configGroup(group, order, defaultExtra);
        } else if (typeof item === "number") {
          callback.configGroup(group, item, 1000);
        }
      });
    return this;
  }
  on(eventInfo, method) {
    return this[bindSymbol](eventInfo, method);
  }
  once(eventInfo, method) {
    return this[bindSymbol](eventInfo, method, { count: 1 });
  }
  off(eventInfo) {
    const { name, group, extra, id } = this[parseEventSymbol](eventInfo, false);
    const callback = this.hookCallbacks[name];
    if (id) {
      callback.removeById(id, group);
    } else if (group) {
      callback.removeByGroup(group, extra);
    } else {
      callback.removeAll();
    }
    return this;
  }
  async emit(eventInfo, ...params) {
    const { name, group, extra, id } = this[parseEventSymbol](eventInfo, false);
    const callback = this.hookCallbacks[name];
    if (callback) {
      let items = [];
      if (id) {
        const item = callback.getById(id, group);
        if (item) {
          items = [item];
        }
      } else if (group) {
        items = callback.getByGroup(group, extra);
      } else {
        items = callback.getAll();
      }
      await this[executeMethodsSymbol](items, ...params);
    }
    return this;
  }
  parseEventIdentity(identity) {
    if (typeof identity === "string") {
      const reg = /([^./#|]+)?(\/([^./#|]*))?(\.([-\d]*))?(#([^./#|]+))?(\|([-\d]+))?/;
      const arr = reg.exec(identity);
      const name = arr[1] || "";
      let group = arr[3] || "";
      const result = {
        name: arr[1] || "",
        group: arr[3],
        extra: arr[5] ? parseInt(arr[5], 10) : arr[5],
        id: arr[7],
        count: arr[9] ? parseInt(arr[9], 10) : arr[9],
        groupSign: arr[2] ? "/" : "",
        extraSign: arr[4] ? "." : "",
        idSign: arr[6] ? "#" : "",
        countSign: arr[8] ? "|" : ""
      };
      return result;
    } else {
      return identity;
    }
  }
  [parseEventSymbol](eventInfo, isBind) {
    const info = this.parseEventIdentity(eventInfo);
    if (isEmpty(info.group) && (info.groupSign || isBind)) {
      info.group = this.getDefaultEventGroup();
    }
    if (isBind && info.group && isEmpty(info.extra)) {
      const callback = this[getHookCallbackSymbol](info.name);
      const config = callback.getGroupConfig(info.group);
      info.extra = config[1];
    }
    if (info.count) {
      info.count = parseInt(info.count, 10);
    }
    if (info.extra) {
      info.extra = parseInt(info.extra, 10);
    }
    return info;
  }
  [bindSymbol](eventInfo, method, other = {}) {
    const { name, group, extra, id, count } = this[parseEventSymbol](
      eventInfo,
      true
    );
    const callback = this[getHookCallbackSymbol](name);
    const item = { method, group, extra, id, executed: 0, count, ...other };
    callback.add(item);
    return this;
  }
  [getHookCallbackSymbol](eventName) {
    if (!this.hookCallbacks[eventName]) {
      this.hookCallbacks[eventName] = new HookCallback();
    }
    return this.hookCallbacks[eventName];
  }
  async [executeMethodsSymbol](items = [], ...params) {
    if (items.length) {
      const item = items.shift();
      const { executed, count } = item;
      if (!count || count > executed) {
        await item.method.call(this, ...params);
        item.executed += 1;
      }
      await this[executeMethodsSymbol](items, ...params);
    }
    return this;
  }
}
