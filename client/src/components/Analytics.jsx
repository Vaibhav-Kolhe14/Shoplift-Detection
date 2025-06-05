import React from 'react'
import './analytics.css'
import { Line } from 'react-chartjs-2'; // For graph visualization
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytics() {

  const data = {
    labels: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'],
    datasets: [
      {
        label: 'Suspicious Activities',
        data: [10, 12, 15, 13, 14],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <section className="analytics">
      <h2 className="analytics-title">Real-Time Analytics Dashboard</h2>

      {/* Line Chart for suspicious activity */}
      <div className="analytics-card">
        <h3>Suspicious Activity Trends</h3>
        <Line data={data} />
      </div>

      {/* Add more sections like heatmaps or AI confidence scores here */}
      {/* <div className="analytics-card"> */}
      {/* <h3>Hotspot Detection Heatmap</h3> */}
      {/* <div className="heatmap">
          <img src="heatmap-placeholder.png" alt="Heatmap Placeholder" />
        </div> */}
      {/* </div> */}
    </section>
  )
}

export default Analytics
