const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const client = redis.createClient({
  url: REDIS_URL
});

client.on("error", (err) => console.error("Redis Client Error", err));
client.on("connect", () => console.log("Connected to Redis"));

client.connect(); // Connect to Redis (v4+ async)

module.exports = client;