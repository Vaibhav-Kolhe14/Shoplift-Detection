from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os
import pickle

app = Flask(__name__)

# Enable CORS for all routes in the Flask app
CORS(app, resources={r"/detect": {"origins": "http://localhost:5173"}})

# Load your pre-trained model
model = pickle.load(open("my_model.pkl", "rb"))

# Directory to temporarily store uploaded files
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def detect_shoplifting(frame):
    """
    Use the loaded model to make predictions on a video frame.
    """
    print("1st in detect shoplifting")
    try:
        frame = frame.flatten()  # Example preprocessing: flattening, adapt as required
        print(f"Flattened frame shape: {frame.shape}")
        prediction = model.predict([frame])  # Assuming the model works with `.predict()`
        print(f"Model prediction: {prediction}")
        return prediction[0]
    except Exception as e:
        print(f"Error in detect_shoplifting: {str(e)}")
        raise e

@app.route('/detect', methods=['POST'])
def detect():
    """
    Route to process uploaded video file and return model predictions.
    """
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400
    
    video_file = request.files['video']
    file_path = os.path.join(UPLOAD_FOLDER, video_file.filename)
    video_file.save(file_path)
    
    try:
        print("before try block")
        prediction = process_video(file_path)
        print("after try block")
        return jsonify({"prediction": prediction}), 200
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Log the specific error
        return jsonify({"error": "An error occurred during processing."}), 500
    finally:
        print("print in finally")
        if os.path.exists(file_path):
            os.remove(file_path)

def process_video(file_path):
    """
    Process the video file and return model predictions.
    """
    print("1st in process video")
    cap = cv2.VideoCapture(file_path)
    if not cap.isOpened():
        print("Error: Could not open video file.")
        return "Error: Could not open video file"
    
    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                print("Error: Could not read frame.")
                break

            frame = cv2.resize(frame, (224, 224))  # Example preprocessing
            frame = frame / 255.0  # Normalize
            print("2nd in process video")
            prediction = detect_shoplifting(frame)
            if prediction == "Shoplifting":
                return "Shoplifting Detected"
            print("3rd in process video")
        return "No Shoplifting Detected"
    finally:
        print("finally in process video")
        cap.release()  # Ensure video resource is released

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
