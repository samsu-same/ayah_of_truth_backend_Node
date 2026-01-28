const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session');
const articleRoutes = require("./features/article/article.route");
//middleware
app.use(cors())
app.use(express.json())
// app.use(session({
//   secret:"samsu",
//   resave: false,
//   saveUninitialized: false,  
// }))

app.use("/api/articles", articleRoutes);
app.get('/', async(req,res)=>{
res.send({message:"Allah Loves Samsu and Muskan !"})
})
module.exports = app;