'use strict';

document.addEventListener(`DOMContentLoaded`, () => {
  const app = new Vue({
    el: `#app`,
    data: {
      messages: []
    },
  });

  fetch(`/api/messages`).then(res => res.json()).then(messages => {
    app.messages = messages;
  });
});
