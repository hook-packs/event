'use strict';

require('core-js/modules/es.symbol.js');
require('core-js/modules/es.symbol.description.js');
require('core-js/modules/es.array.concat.js');
require('core-js/modules/es.array.for-each.js');
require('core-js/modules/es.array.is-array.js');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.object.keys.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.parse-int.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/web.dom-collections.for-each.js');
require('regenerator-runtime/runtime.js');
var HookCallback = require('@hook/callback');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var HookCallback__default = /*#__PURE__*/_interopDefaultLegacy(HookCallback);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var executeMethodsSymbol = Symbol("executeMethods");
var getHookCallbackSymbol = Symbol("getStandCallback");
var bindSymbol = Symbol("bindSymbol");
var parseEventSymbol = Symbol("parseEvent");
var defaultGroupSymbole = Symbol("defaultGroup");

var isEmpty = function isEmpty(data) {
  return typeof data === "undefined" || data === "";
};

var Event = /*#__PURE__*/function () {
  function Event() {

    _classCallCheck(this, Event);

    this.hookCallbacks = {};
  }

  _createClass(Event, [{
    key: "getDefaultEventGroup",
    value: function getDefaultEventGroup() {
      return defaultGroupSymbole;
    }
  }, {
    key: "configEventGroups",
    value: function configEventGroups(eventName) {
      var groups = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = this[getHookCallbackSymbol](eventName);
      Object.keys(groups).concat(Object.getOwnPropertySymbols(groups)).forEach(function (group) {
        var item = groups[group];

        if (Array.isArray(item)) {
          var _item = _slicedToArray(item, 2),
              order = _item[0],
              _item$ = _item[1],
              defaultExtra = _item$ === void 0 ? 1000 : _item$;

          callback.configGroup(group, order, defaultExtra);
        } else if (typeof item === "number") {
          callback.configGroup(group, item, 1000);
        }
      });
      return this;
    }
  }, {
    key: "on",
    value: function on(eventInfo, method) {
      return this[bindSymbol](eventInfo, method);
    }
  }, {
    key: "once",
    value: function once(eventInfo, method) {
      return this[bindSymbol](eventInfo, method, {
        count: 1
      });
    }
  }, {
    key: "off",
    value: function off(eventInfo) {
      var _this$parseEventSymbo = this[parseEventSymbol](eventInfo, false),
          name = _this$parseEventSymbo.name,
          group = _this$parseEventSymbo.group,
          extra = _this$parseEventSymbo.extra,
          id = _this$parseEventSymbo.id;

      var callback = this.hookCallbacks[name];

      if (id) {
        callback.removeById(id, group);
      } else if (group) {
        callback.removeByGroup(group, extra);
      } else {
        callback.removeAll();
      }

      return this;
    }
  }, {
    key: "emit",
    value: function () {
      var _emit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eventInfo) {
        var _this$parseEventSymbo2,
            name,
            group,
            extra,
            id,
            callback,
            items,
            item,
            _len,
            params,
            _key,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$parseEventSymbo2 = this[parseEventSymbol](eventInfo, false), name = _this$parseEventSymbo2.name, group = _this$parseEventSymbo2.group, extra = _this$parseEventSymbo2.extra, id = _this$parseEventSymbo2.id;
                callback = this.hookCallbacks[name];

                if (!callback) {
                  _context.next = 8;
                  break;
                }

                items = [];

                if (id) {
                  item = callback.getById(id, group);

                  if (item) {
                    items = [item];
                  }
                } else if (group) {
                  items = callback.getByGroup(group, extra);
                } else {
                  items = callback.getAll();
                }

                for (_len = _args.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  params[_key - 1] = _args[_key];
                }

                _context.next = 8;
                return this[executeMethodsSymbol].apply(this, [items].concat(params));

              case 8:
                return _context.abrupt("return", this);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function emit(_x) {
        return _emit.apply(this, arguments);
      }

      return emit;
    }()
  }, {
    key: "parseEventIdentity",
    value: function parseEventIdentity(identity) {
      if (typeof identity === "string") {
        var reg = /([^./#|]+)?(\/([^./#|]*))?(\.([-\d]*))?(#([^./#|]+))?(\|([-\d]+))?/;
        var arr = reg.exec(identity);
        var name = arr[1] || "";
        var group = arr[3] || "";
        var result = {
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
  }, {
    key: parseEventSymbol,
    value: function value(eventInfo, isBind) {
      var info = this.parseEventIdentity(eventInfo);

      if (isEmpty(info.group) && (info.groupSign || isBind)) {
        info.group = this.getDefaultEventGroup();
      }

      if (isBind && info.group && isEmpty(info.extra)) {
        var callback = this[getHookCallbackSymbol](info.name);
        var config = callback.getGroupConfig(info.group);
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
  }, {
    key: bindSymbol,
    value: function value(eventInfo, method) {
      var other = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _this$parseEventSymbo3 = this[parseEventSymbol](eventInfo, true),
          name = _this$parseEventSymbo3.name,
          group = _this$parseEventSymbo3.group,
          extra = _this$parseEventSymbo3.extra,
          id = _this$parseEventSymbo3.id,
          count = _this$parseEventSymbo3.count;

      var callback = this[getHookCallbackSymbol](name);

      var item = _objectSpread2({
        method: method,
        group: group,
        extra: extra,
        id: id,
        executed: 0,
        count: count
      }, other);

      callback.add(item);
      return this;
    }
  }, {
    key: getHookCallbackSymbol,
    value: function value(eventName) {
      if (!this.hookCallbacks[eventName]) {
        this.hookCallbacks[eventName] = new HookCallback__default['default']();
      }

      return this.hookCallbacks[eventName];
    }
  }, {
    key: executeMethodsSymbol,
    value: function () {
      var _value = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var items,
            item,
            executed,
            count,
            _len2,
            params,
            _key2,
            _item$method,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                items = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : [];

                if (!items.length) {
                  _context2.next = 11;
                  break;
                }

                item = items.shift();
                executed = item.executed, count = item.count;

                for (_len2 = _args2.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  params[_key2 - 1] = _args2[_key2];
                }

                if (!(!count || count > executed)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 8;
                return (_item$method = item.method).call.apply(_item$method, [this].concat(params));

              case 8:
                item.executed += 1;

              case 9:
                _context2.next = 11;
                return this[executeMethodsSymbol].apply(this, [items].concat(params));

              case 11:
                return _context2.abrupt("return", this);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function value() {
        return _value.apply(this, arguments);
      }

      return value;
    }()
  }]);

  return Event;
}();

module.exports = Event;
