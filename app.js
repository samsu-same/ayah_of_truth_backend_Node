const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session');
const articleRoutes = require("./features/article/article.route");
const verseRoutes = require('./routes/verses');
const dailyRoutes = require('./routes/daily');

//middleware
app.use(cors())
app.use(express.json())
// app.use(session({
//   secret:"samsu",
//   resave: false,
//   saveUninitialized: false,  
// }))

// Routes
app.use('/api/verses', verseRoutes);
app.use('/api/daily', dailyRoutes);
app.use("/api/articles", articleRoutes);
app.get('/', async(req,res)=>{
res.send({message:"Allah Loves Samsu and Muskan !"})
})
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