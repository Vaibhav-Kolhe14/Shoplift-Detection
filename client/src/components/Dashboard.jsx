import React, { useState, useEffect } from 'react'
import './dashboard.css'
import { FaExclamationCircle, FaBroadcastTower } from 'react-icons/fa';

function Dashboard() {

  const [activeAlerts, setActiveAlerts] = useState(0);
  const [activeFeed, setActiveFeed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlerts((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000); // Simulate real-time alert updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="dashboard">
      <h2>Real-Time Dashboard 🏴󠁰󠁴󠀱󠀷󠁿</h2>
      <div className="dashboard-info">
        <div className="info-item">
          <FaBroadcastTower size={24} color="#3498db" />
          <p>Active Live Feeds: {activeFeed}</p>
        </div>
        <div className="info-item">
          <FaExclamationCircle size={24} color="#e74c3c" />
          <p>Active Alerts: {activeAlerts}</p>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
