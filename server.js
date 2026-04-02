require('dotenv').config();
const app = require("./app");
const connectDB = require('./config/connectdb');
const redisClient = require("./config/redisClient");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    console.log(`Connected to MongoDB | PID: ${process.pid}`);

    // Connect Redis only if not already connected
    if (!redisClient.isOpen) {
      await redisClient.connect();
    //   console.log(`Connected to Redis | PID: ${process.pid}`);
    }

    app.listen(PORT, () => {
    //   console.log(`Server running at port ${PORT} | PID: ${process.pid}`);
    });
  } catch (err) {
    console.error("Startup error", err);
    process.exit(1);
  }
};

startServer();