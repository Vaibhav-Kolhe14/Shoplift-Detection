import React from 'react'
import './about.css'

function About() {
  return (
    <section className="about">
      <h2 className="about-title">About Us</h2>
      <p className="about-description">
        Welcome to the Shoplifting Detection System, a cutting-edge solution designed to ensure store security with advanced monitoring and real-time alerts. Our system combines modern technology with intelligent analytics to provide a secure and trustworthy environment.
      </p>
      <h3 className="team-title">Meet the Team</h3>
      <ul className="team-list">
        <li>Pankaj Katre - System Architect</li>
        <li>Vaibhav Kolhe - AI & ML Specialist</li>
        <li>Anuj Gadekar - Backend Developer</li>
        <li>Suraj Khairnar - Frontend Developer</li>
      </ul>
    </section>
  )
}

export default About
