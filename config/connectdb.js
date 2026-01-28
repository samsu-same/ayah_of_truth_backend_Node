const mongoose = require('mongoose')

require('dotenv').config(); 

const mongoURL = process.env.DATABASE_URL
const connectDB = async()=>{
    try {
        await mongoose.connect(mongoURL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

module.exports = connectDB; 