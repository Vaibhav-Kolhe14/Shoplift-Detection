const mongoose = require('mongoose')

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Camera = mongoose.model('Camera', cameraSchema)

module.exports = Camera