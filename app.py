from flask import Flask, Response, request
import cv2
import numpy as np
import pickle

app = Flask(__name__)

# Load your pre-trained model pipeline
pipe = pickle.load(open("my_model.pkl", "rb"))

def decode_image(image_data):
    """
    Decodes image bytes to a NumPy array for processing.
    """
    np_array = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    return frame

def detect_shoplifting(frame):
    """
    Processes the frame using the loaded model.
    Returns the processed frame with detections.
    """
    # Example: Perform prediction and annotate the frame
    predictions = pipe.predict([frame.flatten()])  # Example model usage
    if predictions[0] == 1:  # Example: Detected shoplifting
        cv2.putText(frame, "Shoplifting Detected", (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    return frame

@app.route('/detect', methods=['POST'])
def detect():
    """
    Route to process incoming video frames and return detection results.
    """
    if 'video' in request.files:
        video_file = request.files['video']
        image_data = video_file.read()
        frame = decode_image(image_data)

        # Process frame with the detection model
        processed_frame = detect_shoplifting(frame)

        # Encode the processed frame
        _, buffer = cv2.imencode('.jpg', processed_frame)
        frame_data = buffer.tobytes()

        return Response(frame_data, mimetype='image/jpeg')
    return "No video frame provided", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
