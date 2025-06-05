import React, { useState } from 'react'
import './settings.css'

function Settings() {

  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const toggleAlerts = () => {
    setAlertsEnabled(prev => !prev);
  };

  return (
    <section className="settings-container">
      <div className="settings-header">
        <h2>Alert Settings</h2>
        <p className="subheading">Manage your alert preferences to customize notifications.</p>
      </div>

      <div className="settings-card">
        <div className="setting-item">
          <label htmlFor="alerts-toggle" className="setting-label">Enable Alerts</label>
          <div className="toggle-wrapper">
            <input
              id="alerts-toggle"
              type="checkbox"
              checked={alertsEnabled}
              onChange={toggleAlerts}
              className="toggle-switch"
            />
            <span className="toggle-label">{alertsEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        <div className="setting-item">
          <label htmlFor="alert-type" className="setting-label">Alert Type</label>
          <select id="alert-type" className="alert-type-dropdown">
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push Notification</option>
          </select>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-secondary">Cancel</button>
      </div>
    </section>
  )
}

export default Settings
