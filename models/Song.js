const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: false
    },
    userAdd: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.module('Song', SongSchema)