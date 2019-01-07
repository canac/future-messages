'use strict';

async function loadMessages () {
  const res = await fetch(`/api/messages`);
  const messages = await res.json();
  messages.forEach(message => {
    message.notifyTime = new Date(message.notifyTime);
  });
  return messages;  
}

document.addEventListener(`DOMContentLoaded`, async () => {
  const app = new Vue({
    el: `#app`,
    data: {
      messages: [],
    },
  });

  app.messages = await loadMessages();
});
