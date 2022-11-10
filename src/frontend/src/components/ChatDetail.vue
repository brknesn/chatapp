<template>
  <div
    class="col-8 d-flex flex-column p-0 justify-content-between p-3 border border-top-0 chatDetails"
  >
    <div class="d-flex flex-column justify-content-between chat">
      <div class="d-flex justify-content-center mb-5">
        <h2 class="text-info fw-bold">{{ currentChannel.name }}</h2>
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
              {{ channelMessage.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <input type="text" class="chat-input p-2" placeholder="Type" />
  </div>
</template>
<script>
import { inject } from "@vue/runtime-core";
export default {
  name: "Chat",
  async setup() {
    const store = inject("store");
    const { channelMessages, currentUser, currentChannel } = store();
    return {
      currentUser,
      channelMessages,
      currentChannel,
    };
  },
};
</script>
<style scoped>
.chat-input {
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: #f0f0f0;
  transition: 0.2s;
  color: #383838;
}
.chat-list {
  overflow: auto;
  height: 65vh;
}
input {
  width: 100%;
}
.chat-input:focus,
.chat-content {
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
.current .chat-content {
  float: right;
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
