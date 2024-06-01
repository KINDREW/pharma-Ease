const redis = require("async-redis");
require("dotenv").config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis", err);
});

module.exports = redisClient;
