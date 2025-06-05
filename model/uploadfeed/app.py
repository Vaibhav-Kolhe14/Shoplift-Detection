import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os
from concurrent.futures import ThreadPoolExecutor

# Load the pre-trained model
model = tf.keras.models.load_model('shoplifting_detection_model.h5')

# Initialize Flask app
app = Flask(__name__)

# Apply CORS to all routes, allow requests from localhost:5173
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Thread pool for async video processing
executor = ThreadPoolExecutor(max_workers=4)

# Preprocess function to handle video input
def preprocess_video(video_path, frame_size=(128, 128), frame_skip=5):
    cap = cv2.VideoCapture(video_path)
    frames = []
    count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if count % frame_skip == 0:  # Skip frames
            frame_resized = cv2.resize(frame, frame_size)
            frame_resized = frame_resized.astype('float32') / 255.0  # Normalize the frame
            frames.append(frame_resized)
        count += 1

    cap.release()
    frames = np.array(frames)
    
    # Reshape the frames to match the expected input shape (batch_size, frames, height, width, channels)
    # For example, if the model expects (None, None, 128, 128, 3), we need to reshape it as follows:
    frames = np.expand_dims(frames, axis=0)  # Adding the batch dimension at the beginning
    return frames

# Predict function to handle video prediction
def predict_video(video_path):
    print(f"Starting prediction for {video_path}")
    frames = preprocess_video(video_path)
    print(f"Frames processed: {frames.shape}")

    batch_size = frames.shape[0]  # Adjust batch size dynamically based on frames
    predictions = model.predict(frames, batch_size=batch_size, verbose=0)

    avg_prediction = np.mean(predictions)
    result = 'Shoplifting Detected' if avg_prediction > 0.5 else 'No Shoplifting Detected'
    confidence = avg_prediction if avg_prediction > 0.5 else 1 - avg_prediction

    print(f"Prediction result: {result} with confidence: {confidence}")
    return result, confidence

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'video' not in request.files:
            return jsonify({'error': 'No video file provided'}), 400

        file = request.files['video']
        video_path = os.path.join('./uploads', file.filename)
        os.makedirs('./uploads', exist_ok=True)
        print(f"Saving file to: {video_path}")
        file.save(video_path)

        # Run video processing asynchronously
        future = executor.submit(predict_video, video_path)
        result, confidence = future.result()

        # Clean up video file
        if os.path.exists(video_path):
            os.remove(video_path)

        return jsonify({
            'prediction': result,
            'confidence': float(confidence)
        })

    except Exception as e:
        print(f"Error processing video: {e}")
        return jsonify({'error': str(e)}), 500

# Handle CORS for preflight requests
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

if __name__ == '__main__':
    app.run(debug=True)
