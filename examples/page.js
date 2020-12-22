const init = async () => {
  const event = new HookEvent();
  const defaultGroup = event.getDefaultEventGroup();
  event.configEventGroups("response", {
    message: 1500,
    payload: 500,
    [defaultGroup]: 200
  });
  event.on("response/message", function () {
    console.log("message");
  });
  event.on("response/payload", function () {
    console.log("payload");
  });
  event.on("response", function () {
    console.log("default");
  });

  await event.emit("response");
};
init();
