'use strict';

function normalizeMessage (message) {
  message.notifyTime = new Date(message.notifyTime);
}

async function loadMessages () {
  const res = await fetch(`/api/messages`);
  const messages = await res.json();
  messages.forEach(normalizeMessage);
  return messages;
}

async function createMessage (content) {
  // Set notify time to tomorrow at noon
  const notifyTime = new Date();
  notifyTime.setMilliseconds(0);
  notifyTime.setSeconds(0);
  notifyTime.setMinutes(0);
  notifyTime.setHours(12);
  notifyTime.setTime(notifyTime.getTime() + 24 * 60 * 60 * 1000);

  const res = await fetch(`/api/messages`, {
    method: `post`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify({ content, notifyTime }),
  });
  const message = await res.json();
  normalizeMessage(message);
  return message;
}

document.addEventListener(`DOMContentLoaded`, async () => {
  const app = new Vue({
    el: `#app`,
    data: {
      messages: [],
      newMessageContent: ``,
    },
    methods: {
      createMessage() {
        createMessage(app.newMessageContent).then(message => {
          app.messages.push(message);
          app.newMessageContent = ``;
        });
      },
    },
  });

  app.messages = await loadMessages();
});
