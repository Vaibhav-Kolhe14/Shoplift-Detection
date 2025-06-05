import React, { useState } from 'react'
import './alerts.css'
import { useNavigate } from 'react-router-dom';

function Alerts({ addAlertToHistory }) {

  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()

  const triggerAlert = () => {
    const alertMessages = [
      "Suspicious activity detected! Possible shoplifting.",
      "Alert: Customer left the store without scanning items.",
      "Warning: Unusual movement detected in aisle 5.",
      "Notice: Camera feed temporarily disconnected.",
      "Critical: Restricted access area breached!",
    ];
    const randomAlert =
      alertMessages[Math.floor(Math.random() * alertMessages.length)];

    setAlert(randomAlert);

    const timestamp = new Date().toLocaleTimeString();
    addAlertToHistory(randomAlert, timestamp); // Add alert to history
  };

  const viewAlertHistory = () => {
    navigate("/alert-history"); // Navigate to alert history
  };

  const manageSettings = () => {
    navigate("/settings"); // Navigate to settings
  };

  return (
    <section className="alerts">
      <h2 className="alerts-title">Alerts 🚨</h2>
      <button onClick={triggerAlert} className="alert-button">
        Simulate Alert
      </button>

      {alert && (
        <div className="alert-box">
          <p>{alert}</p>
        </div>
      )}

      <div className="alerts-footer">
        <button className="clear-alerts" onClick={() => setAlert(null)}>
          Clear Alert
        </button>

        <button className="view-history" onClick={viewAlertHistory}>
          View Alert History
        </button>

        <button className="settings" onClick={manageSettings}>
          Manage Settings
        </button>
      </div>
    </section>
  )
}

export default Alerts
