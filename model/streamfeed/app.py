from flask import Flask, jsonify, request
from ultralytics import YOLO
import cv2
import xgboost as xgb
import numpy as np
import pandas as pd
import base64
from flask_cors import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173/"])




# Load YOLO and XGBoost models
try:
    model_yolo = YOLO("best.pt")  # Update path
    model_xgb = xgb.Booster()
    model_xgb.load_model("model_weights.json")  # Update path
except Exception as e:
    print(f"Error loading models: {e}")
    raise

def process_frame(frame):
    """Process a single frame for shoplifting detection."""
    try:
        results = model_yolo(frame, verbose=False)
        annotated_frame = results[0].plot(boxes=False)

        detections = []
        for r in results:
            bound_box = r.boxes.xyxy
            conf = r.boxes.conf.tolist()
            keypoints = r.keypoints.xyn.tolist() if hasattr(r.keypoints, "xyn") else []

            for index, box in enumerate(bound_box):
                if conf[index] > 0.75:  # Confidence threshold
                    x1, y1, x2, y2 = map(int, box.tolist())
                    data = {}

                    # Extract keypoints if available
                    if keypoints:
                        for j in range(len(keypoints[index])):
                            data[f'x{j}'] = keypoints[index][j][0]
                            data[f'y{j}'] = keypoints[index][j][1]

                    # Predict with XGBoost
                    if data:
                        df = pd.DataFrame(data, index=[0])
                        dmatrix = xgb.DMatrix(df)
                        prediction = model_xgb.predict(dmatrix)
                        binary_prediction = int((prediction > 0.5).astype(int))
                    else:
                        binary_prediction = -1  # No prediction due to missing data

                    label = "Suspicious" if binary_prediction == 0 else "Normal" if binary_prediction == 1 else "Unknown"
                    color = (0, 0, 255) if binary_prediction == 0 else (0, 255, 0) if binary_prediction == 1 else (0, 255, 255)
                    cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), color, 2)
                    cv2.putText(annotated_frame, f'{label} ({conf[index]:.2f})', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

                    detections.append({
                        "label": label,
                        "confidence": conf[index],
                        "bounding_box": [x1, y1, x2, y2]
                    })

        return annotated_frame, detections
    except Exception as e:
        print(f"Error processing frame: {e}")
        return frame, []

@app.route('/detect', methods=['POST', 'OPTIONS'])
def detect_shoplifting_live():
    """Endpoint to process a single frame for shoplifting detection."""
    try:
        data = request.get_json()
        print(f"Received request: {data}")  # Debug log

        frame_data = data.get('frame')
        if not frame_data:
            return jsonify({"error": "No frame provided"}), 400

        # Decode the base64 image
        img_data = base64.b64decode(frame_data.split(",")[1])
        np_arr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        annotated_frame, detections = process_frame(frame)
        print(f"Detections: {detections}")  # Debug log
        return jsonify({"detections": detections})

    except Exception as e:
        print(f"Error in detect_shoplifting_live: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
