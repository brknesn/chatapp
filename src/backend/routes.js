const axios = require("axios");

const axiosInstance = axios.create({ baseURL: "http://localhost:5000" });

module.exports = function (fastify, options, done) {
  // get all channels
  fastify.get("/channels", async (req, res) => {
    try {
      const { userId } = req.query;

      const data = await axiosInstance.get("/channels").then((res) => res.data);
      const channelList = data.filter((ch) => ch.users.includes(+userId));

      res.status(200).send(channelList);
    } catch (err) {
      res.status(404).send(err);
      console.error(err.response);
    }
  });

  // Get channel details
  fastify.get("/channels/:channelId", async (req, res) => {
    try {
      const { channelId } = req.params;

      const data = await axiosInstance
        .get("/channels/" + channelId)
        .then((res) => res.data);

      res.status(200).send(data);
    } catch (err) {
      res.status(404).send(err);
      console.error(err.response);
    }
  });

  // Get channel users
  fastify.get("/channels/:channelId/users", async (req, res) => {
    try {
      const { channelId } = req.params;

      const data = await axiosInstance
        .get("/channels/" + channelId)
        .then((res) => res.data?.users);
      const userList = await Promise.all(
        data.map(
          async (userId) =>
            await axiosInstance.get("/users/" + userId).then((res) => res.data)
        )
      );
      res
        .status(200)
        .send(userList.sort((a, b) => (a.username > b.username ? 1 : -1)));
    } catch (err) {
      res.status(404).send(err);
      console.error(err.response);
    }
  });

  // Get all messages
  fastify.get("/messages/:channelId", async (req, res) => {
    try {
      const { channelId } = req.params;

      const data = await axiosInstance.get("/messages").then((res) => res.data);
      const messageList = await Promise.all(
        data
          .filter((msg) => msg.channelId === Number(channelId))
          .map(async (msg) => {
            const user = await axiosInstance
              .get("/users/" + msg.userId)
              .then((res) => res.data);

            return {
              ...msg,
              username: user.username,
              avatar: user?.avatar,
            };
          })
      );

      res.status(200).send(messageList);
    } catch (err) {
      res.status(404).send(err);
      console.error(err.response);
    }
  });

  // Send a message to channel
  fastify.post("/messages", async (req, res) => {
    try {
      const { userId, channelId, message } = req.body;

      const msgData = {
        channelId,
        message,
        userId,
      };

      const data = await axiosInstance.post(
        "/messages",
        JSON.stringify(msgData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).send(data.data);
    } catch (err) {
      console.error(err);
      res.status(404).send(err);
    }
  });

  // Add new channel
  fastify.post("/channels", async (req, res) => {
    try {
      const { name, userId } = req.body;

      const chData = {
        name,
        users: [userId],
      };

      const data = await axiosInstance.post(
        "/channels",
        JSON.stringify(chData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).send(data.data);
    } catch (err) {
      console.error(err);
      res.status(404).send(err);
    }
  });

  // user details
  fastify.get("/users/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      const data = await axiosInstance.get("/users/" + userId);
      res.status(200).send(data.data);
    } catch (err) {
      console.error(err);
      res.status(404).send(err);
    }
  });

  done();
};
