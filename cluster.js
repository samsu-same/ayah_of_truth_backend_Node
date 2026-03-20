const cluster = require("cluster");
const os = require("os");


const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process running: ${process.pid}`);
  console.log(`Forking ${numCPUs} workers...\n`);

  // Create workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker if it crashes
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  console.log(`Worker started: ${process.pid}`);
  require("./server"); // start express server
}