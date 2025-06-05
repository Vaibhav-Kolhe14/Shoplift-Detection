import React from 'react'
import './alertHistory.css'

function AlertHistory({ alertHistory }) {
  return (
    <section className="alert-history">
      <h2>Alert History</h2>
      <ul>
        {alertHistory.length === 0 ? (
          <p>No alerts in history</p>
        ) : (
          alertHistory.map((alert, index) => (
            <li key={index}>
              <strong>{alert.time}</strong>: {alert.message}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default AlertHistory
