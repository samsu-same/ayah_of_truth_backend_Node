const express = require('express')
const app = require("./app");
const connectDB = require('./config/connectdb')

const PORT = process.env.PORT || 3000;

connectDB()
app.listen( PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})