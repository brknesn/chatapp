<template>
  <div class="col-2 d-flex flex-column p-2 channel-list">
    <div class="d-flex flex-column">
      <div class="d-flex flex-row justify-content-between mx-1 m-2 w-90">
        <h5 class="fw-bold mt-auto mr-2">Channel List</h5>
        <button class="btn btn-md btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">+</button>
      </div>

      <a
        href="#"
        v-for="channel in channels"
        :key="channel.id"
        class="d-flex flex-column mt-2 gap-1"
        :class="{ current: channel.id === currentChannel.id }"
        :id="channel.id"
        @click="setCurrentChannel"
      >
        <h6 class="fw-bold text-dark">{{ channel.name }}</h6>
        <span class="text-muted">Last message...</span>
      </a>
    </div>
    <CreateChannelModal />
  </div>
</template>

<script>
import CreateChannelModal from './CreateChannelModal.vue'
import { inject } from "vue";
export default {
  name: "ChannelList",
  async setup() {
    const store = inject("store");
    const { channels, setChannel, currentChannel } = store();
    const setCurrentChannel = function (e) {
      let id = e.target.closest("a").id;
      setChannel(id);
    };
    return {
      channels,
      currentChannel,
      setCurrentChannel,
    };
  },
  components: { CreateChannelModal }
};
</script>

<style scoped>
.current,
.current:hover {
  background: #0dcaf036;
}
a {
  padding: 0.5em;
  border-radius: 5px;
}
a:hover {
  background: #0dcaf036;
}
.channel-list {
  background: #f5f5f5;
}
button {
  font-size: 1rem;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}
h5 {
  font-size: clamp(0.5rem, 5vw, 1.2rem);
}
@media screen and (max-width: 1024px) {
  .channel-list {
    display: none !important;
  }
}
</style>
