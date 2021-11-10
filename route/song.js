const express = require('express')
const router = express.Router()

const User = require('../models/Song')

router.post('/insert', async (req, res) => {
    const {name, author, userAdd} = req.body

})