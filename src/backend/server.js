const fastify = require("fastify")({ logger: false });

fastify.register(require("fastify-cors"), {
  origin: "*",
  methods: ["POST", "GET"],
});

fastify.register(require("./routes"));

fastify.get("/", async (req, res) => {
  res.status(200).send("Home");
});

const start = async () => {
  try {
    await fastify.listen(3000);
    console.log(`Server running at localhost:3000`);
  } catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
