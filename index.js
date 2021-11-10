require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./route/auth')


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testJS', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("MongoDB connected")
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()
const app = express()
app.use(express.json())
app.use('/api/auth', auth);

const PORT = 5000
app.listen(PORT, () => console.log(`Server listening in Port ${PORT}`));