const mongoose = require('mongoose')

const detectionSchema = new mongoose.Schema({
    confidence_score: {
        type: Number,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    alert_type: { 
        type: String, 
        enum: ['no alert', 'soft alert', 'hard alert'], 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    camera_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Camera', 
        required: true 
    },
}, { timestamps: true })

const Detection = mongoose.model('Detection', detectionSchema)

module.exports = Detection