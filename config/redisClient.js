const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

client.on("error", (err) => console.error(`Redis Error | PID: ${process.pid}`, err));
client.on("connect", () => console.log(`Connected to Redis | PID: ${process.pid}`));

module.exports = client;