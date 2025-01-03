import React, { useState } from 'react';
import './livefeed.css';
import Webcam from 'react-webcam';

function LiveFeed() {
  const [feedActive, setFeedActive] = useState(true);
  const [timestamp, setTimestamp] = useState(null);

  const toggleFeed = () => {
    if (feedActive) {
      setTimestamp(new Date().toLocaleString());
    } else {
      setTimestamp(null);
    }
    setFeedActive(!feedActive);
  };

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
            />
            <p className="feed-status">
              <strong>Status:</strong> Live video feed is active. Monitoring for suspicious activities...
            </p>
          </>
        ) : (
          <p className="feed-status">
            <strong>Status:</strong> Live feed is paused. Press <strong>"Start Feed"</strong> to resume.
          </p>
        )}
      </div>
      <button
        onClick={toggleFeed}
        className={`feed-control-button ${feedActive ? 'pause' : 'start'}`}
      >
        {feedActive ? 'Pause Feed' : 'Start Feed'}
      </button>
      {!feedActive && timestamp && (
        <p className="timestamp">
          <strong>Paused At:</strong> {timestamp}
        </p>
      )}
    </section>
  );
}

export default LiveFeed;
