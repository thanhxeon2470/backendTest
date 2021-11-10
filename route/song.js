const express = require('express')
const router = express.Router()

const Song = require('../models/Song')
const verifyToken = require('../middleware/authenticate')

router.post('/insert', verifyToken, async (req, res) => {
    const {name, author} = req.body
    if (!name)
        return res.status(400).json({success: false, message: "The name is error"})
    try {
        const newSong = new Song({name, author: author || 'No copyright', userAdd: req.userId})
        await newSong.save()

        res.json({success: true, message: "Added"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Server error"})
    }
})

module.exports = router
