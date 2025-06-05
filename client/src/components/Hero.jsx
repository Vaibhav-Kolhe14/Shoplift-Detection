import React from 'react'
import './hero.css'
import { useNavigate } from 'react-router-dom';
import hero from '../assets/shoplifting-banner.png'

function Hero() {

  const navigate = useNavigate();

  // Function to handle button click and navigate to the analytics page
  const handleExploreAnalytics = () => {
    navigate("/analytics"); // Navigate to the Analytics page
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Text Content */}
        <div className="hero-text">
          <h1 className="hero-title">Welcome to ShopSecure</h1>
          <p className="hero-subtitle">
            Advanced Security with AI-driven Analytics
          </p>
          <p className="hero-description">
            Revolutionizing retail security with cutting-edge AI tools. Stay
            ahead with real-time monitoring and analytics to prevent theft and
            ensure safety.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">View Alerts</button>
            <button
              className="btn-secondary"
              onClick={handleExploreAnalytics} // Add onClick handler for navigation
            >
              Explore Analytics
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image">
          <img src={hero} alt="Shoplifting Detection Banner" />
        </div>
      </div>
    </section>
  )
}

export default Hero
