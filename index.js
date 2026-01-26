const express = require('express')
const http = require('http');
const cors = require('cors')
const session = require('express-session');


const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(session({
  secret:"samsu",
  resave: false,
  saveUninitialized: false,  
}))



app.get('/', async(req,res)=>{
res.send({message:"Allah Loves Samsu !"})
})






app.listen( port, ()=>{
    console.log(`Server is running at ${port}`)
})