// require(dotenv).config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


router.post('/register', async(req, res) => {
    const {username, password} = req.body
    if(!username & !password)
      return res.status(400).json({success: false, message: "Username or password is incorrect"})
    try {
        const user = await User.findOne({username});
        if (user)
            return res.status(400).json({success: false, message: "Username is existed"})
        const hashPW = await argon2.hash(password)
        const newUser = new User({username, password: hashPW})
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN)
        res.status(200).json({success: true, message: "User created", jwt: accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Server error"})
    }
})

router.get('/login', async(req, res) => {
    const {username, password} = req.body
    if(!username & !password)
        return res.status(400).json({success: false, message: "Username or password is incorrect"})
    try {
        const user = await User.findOne({username})
        if (!user)
            res.status(400).json({success: false, message: "Username or password is incorrect"})
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
            res.status(400).json({success: false, message: "Username or password is incorrect"})

        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN)
        res.status(200).json({success: true, message: "Logged", jwt: accessToken})
    } catch (error){
        console.log(error)
        res.status(500).json({success: false, message: "Server error"})
    }
})

module.exports = router