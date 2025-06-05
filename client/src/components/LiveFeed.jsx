import React, { useState, useRef, useEffect } from "react";
import "./livefeed.css";
import Webcam from "react-webcam";
import axios from "axios";

function LiveFeed() {
  const [feedActive, setFeedActive] = useState(true);
  const [timestamp, setTimestamp] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null); // Webcam reference

  const toggleFeed = () => {
    setFeedActive(!feedActive);
    if (!feedActive) {
      setTimestamp(new Date().toLocaleString());
    } else {
      setTimestamp(null);
    }
  };

  const captureFrame = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        console.log("Captured frame:", imageSrc); // Debug captured frame
        handleCapture(imageSrc);
      }
    }
  };

  const handleCapture = async (imageSrc) => {
    try {
      setLoading(true);
      console.log("Sending frame to backend:", imageSrc); // Debug sent data

      const response = axios.post(
        "http://localhost:5050/detect",
        {
          frame: imageSrc,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true 
        }
      );
            console.log("Backend response:", response.data); // Debug response
      if (response.data && response.data.detections) {
        setDetections(response.data.detections);
      } else {
        console.warn("No detections in response:", response.data);
        setDetections([]);
      }

    } catch (error) {
      console.error("Error in sending frame:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let intervalId;
    if (feedActive) {
      intervalId = setInterval(captureFrame, 2000); // Capture a frame every 2 seconds
    }
    return () => clearInterval(intervalId); // Cleanup
  }, [feedActive]);

  return (
    <section className="live-feed">
      <h2 className="live-feed-title">Live Feed</h2>
      <div className="video-container">
        {feedActive ? (
          <>
            <Webcam
              width={400}
              height={400}
              mirrored={true}
              ref={webcamRef} // Attach the ref here
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
            />
            <p className="feed-status">
              <strong>Status:</strong> Live video feed is active. Monitoring for
              suspicious activities...
            </p>
          </>
        ) : (
          <p className="feed-status">
            <strong>Status:</strong> Live feed is paused. Press{" "}
            <strong>"Start Feed"</strong> to resume.
          </p>
        )}
      </div>
      <button
        onClick={toggleFeed}
        className={`feed-control-button ${feedActive ? "pause" : "start"}`}
      >
        {feedActive ? "Pause Feed" : "Start Feed"}
      </button>
      {!feedActive && timestamp && (
        <p className="timestamp">
          <strong>Paused At:</strong> {timestamp}
        </p>
      )}

      {loading && <p>Processing...</p>}
      {detections.length > 0 && (
        <div className="detections">
          <h3>Detection Results:</h3>
          {detections.map((detection, index) => (
            <div key={index}>
              <p>
                <strong>Label:</strong> {detection.label}
              </p>
              <p>
                <strong>Confidence:</strong> {detection.confidence.toFixed(2)}
              </p>
              <p>
                <strong>Bounding Box:</strong>{" "}
                {`[${detection.bounding_box.join(", ")}]`}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LiveFeed;
