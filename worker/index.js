require("dotenv").config();

const fetch = require('node-fetch');
const { getActor } = require("./actor");

const kObj = JSON.parse(Buffer.from(process.env.DFX_KEY, "base64").toString());
const actor = getActor(
  process.env.DFX_HOST,
  process.env.DFX_CANISTERID,
  makeKeyPair(kObj.publicKey.data, kObj.secretKey.data)
);

// All of the tasks will be stored in the Queue variable.
var queue = [];

const process = async () => {
  const tasks = await actor.flush();
  
  tasks.forEach((taskElement) => {
    queue.push(taskElement);

    if (queue.length === 1) {
      queueMicrotask(() => {
        perform();
      });
    }
  });
};

const perform = async () => {
  
  let promises = [];
  let item = queue.shift();

  for (item; true ; item = queue.shift()) {

    if (!isValidUrl(item.url)) {
      // Refer to line 63
      continue;
    }

    try {
      const promise = fetch(item.url, {
        method: 'post',
        body:    "{}",
        headers: { 'Content-Type': 'application/json' },
      });
      promises.push(promise);
    } catch (e) {}

    if (promises.length === 10) {
      try {
        await Promise.all(promises);
      } catch (e) {
        console.error("Error: While making post requests.", e);
      } finally {
        promises = [];
      }
    }
  }
};

const isValidUrl = url => {
  // TODO: Verify that url is a valid url.
  return true;
};

// Start the event loop.
setInterval(process, 10000);

