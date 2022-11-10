import axios from "axios";
import { reactive, toRefs } from "vue";

const state = reactive({
  error: null,
  channels: [],
  channelMessages: [],
  channelUsers: [],
  currentChannel: {},
  currentUser: {},
});

export default function () {
  const setUser = async (userId) => {
    try {
      const response = await axios.get("http://localhost:3000/users/" + userId);
      const { data } = response;
      state.currentUser = data;

      await getChannels(state.currentUser.id);
    } catch (err) {
      state.error = err;
    }
  };
  const setChannelUsers = async (channelId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/channels/" + channelId + "/users"
      );
      const { data } = response;
      state.channelUsers = data;
    } catch (err) {
      state.error = err;
    }
  };
  const getMessages = async (channelId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/messages/" + channelId
      );
      const { data } = response;
      state.channelMessages = data;
    } catch (err) {
      state.error = err;
    }
  };

  const getChannels = async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/channels?userId=" + userId
      );
      const { data } = response;
      state.channels = data;
      if (!state.currentChannel?.id) setChannel(state.channels[0].id);
    } catch (err) {
      state.error = err;
    }
  };

  const setChannel = async (channelId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/channels/" + channelId
      );
      const { data } = response;
      state.currentChannel = data;
      await getMessages(state.currentChannel.id);
      await setChannelUsers(state.currentChannel.id);
    } catch (err) {
      state.error = err;
    }
  };

  return {
    ...toRefs(state),
    getChannels,
    setChannelUsers,
    setChannel,
    getMessages,
    setUser,
  };
}
