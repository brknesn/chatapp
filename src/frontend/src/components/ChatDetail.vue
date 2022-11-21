<template>
  <div
    class="col-8 d-flex flex-column p-0 justify-content-between p-3 border border-top-0 chatDetails"
  >
    <div class="d-flex flex-column justify-content-between chat">
      <div
        class="d-flex flex-column m-auto text-center justify-content-center mb-2 header"
      >
        <h2 class="text-success fw-bold">{{ currentChannel.name }}</h2>
        <p class="text-muted" v-if="channelMessages.length === 0">
          No messages yet
        </p>
      </div>

      <div class="chat-list">
        <div
          v-for="channelMessage in channelMessages"
          :key="channelMessage.id"
          class="d-flex gap-2 w-75 mb-4 bubble"
          :class="{ current: currentUser.id === channelMessage.userId }"
        >
          <img
            :src="
              channelMessage?.avatar ||
              'https://media-exp1.licdn.com/dms/image/C4D03AQG9dpL0gShAag/profile-displayphoto-shrink_200_200/0/1580839598511?e=1673481600&v=beta&t=Leb3lkLIP3MfdNKJHQEVtVo47sPSGZssdSue0e_Yv8Y'
            "
            width="50"
            height="50"
          />
          <div class="text">
            <div class="username">{{ channelMessage.username }}</div>
            <div class="chat-content p-2 rounded">
              <span v-html="convertStringToUrl(channelMessage.message)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form>
      <input
        type="text"
        class="chatbox p-2"
        placeholder="Type"
        @keyup.enter="handleSendMessage"
      />
    </form>
  </div>
</template>
<script>
import { inject, onUpdated } from "@vue/runtime-core";
export default {
  name: "Chat",
  async setup() {
    const store = inject("store");
    const { channelMessages, currentUser, currentChannel, sendMessage } = store();
      
    onUpdated(() => {
      const chatList = document.getElementsByClassName("chatlist")[0];
      if (chatList) {
        chatList.scrollTop = chatList.scrollHeight;
      }
    });

    const handleSendMessage = function (e) {
      sendMessage(
        currentUser.value.id,
        currentChannel.value.id,
        e.target.value
      );
      e.target.value = "";
    };

    return {
      currentUser,
      channelMessages,
      currentChannel,
      userSendMsg,
      handleSendMessage
    };
  },
  methods: {
    convertStringToUrl: function (text) {
      const URLMatcher =
        /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
      return text.replace(
        URLMatcher,
        (text) => `<a class="text-primary" target="_blank" href="${text}">${text}</a>`
      );
    },
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  border-bottom: 2px #8dbd8d solid;
}
.chat-input {
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  background: #f0f0f0;
  transition: 0.2s;
  color: #383838;
}
.chat-list {
  overflow: auto;
  min-height: 60vh;
  max-height: 70vh;
  padding-right: 1em;
}
.chat-list::-webkit-scrollbar {
  background: #d8d6d6;
  width: 8px;
  border-radius: 10px;
}
.chat-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #8dbd8d;
}
input {
  width: 100%;
}
.chat-input:focus,
.current .chat-content {
  background: #0dcaf036;
}
.chat-content {
  font-size: 1rem;
  width: fit-content;
}
.bubble {
  flex-flow: row;
}
.bubble.current {
  flex-flow: row-reverse;
}
.current {
  text-align: right;
  float: right;
  flex-flow: row-reverse;
}
.current .chat-content {
  background: #c6d8e4;
}
img {
  -webkit-user-drag: none;
}
@media screen and (max-width: 1024px) {
  .chatDetails {
    width: 100%;
  }
}
</style>
