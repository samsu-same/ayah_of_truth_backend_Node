const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session');
const articleRoutes = require("./features/article/article.route");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const dailyDuaRoutes = require('./features/dailydua/dailydua.route');
 const bannerRoutes = require("./routes/banner.routes");
//middleware
app.use(cors())
app.use(express.json())
// app.use(session({
//   secret:"samsu",
//   resave: false,
//   saveUninitialized: false,  
// }))

app.use(compression());  // for high traffic, compress responses to save bandwidth
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs  
}));  

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/dailydua", dailyDuaRoutes);
app.use("/api/banners", bannerRoutes);
app.get('/', async(req,res)=>{
res.send({message:"Allah Loves Samsu and Muskan !"})
})
app.get("/test", (req, res) => {
  res.json({
    message: "Cluster working",
    pid: process.pid
  });
});

// 404 handler
// app.all('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint not found',
//   });
// });


// Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined,
//   });
// });
module.exports = app;