const express = require('express');
const axios = require('axios');
const Detection = require('../model/detectionModel'); // Import Detection model
const router = express.Router();

// Detection data endpoint
const detectedData =  async (req, res) => {
    try {
        // Log received request body
        console.log('Request received:', req.body);

        // Call the Flask API
        const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', req.body.formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response from Flask API:', flaskResponse.data);

        // Additional data logic
        const extraData = {
            timestamp: new Date(),
            alert: 'soft alert',
        };

        // Save detection data to MongoDB
        const newDetection = new Detection({
            confidence_score: flaskResponse.data.confidence_score,
            response: flaskResponse.data.prediction,
            alert_type: extraData.alert,
            user_id: req.body.user_id, // Assuming user_id is sent from the frontend
            camera_id: req.body.camera_id, // Assuming camera_id is sent from the frontend
        });

        await newDetection.save();

        // Send aggregated response
        res.status(200).json({
            message: 'Detection data saved successfully',
            flaskData: flaskResponse.data,
            extraData,
        });
    } catch (error) {
        console.error('Error in detectionData:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = detectedData;
