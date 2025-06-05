import React from 'react'
import './contact.css'

function Contact() {
  return (
    <section className="contact">
    <h2 className="contact-title">Contact Us</h2>
    <p className="contact-description">
      We'd love to hear from you! Whether you have questions, feedback, or collaboration ideas, feel free to reach out.
    </p>
    <div className="contact-info">
      <h3>Team Members</h3>
      <ul>
        <li>Pankaj Katre - <strong>Email:</strong> pankaj@example.com | <strong>Phone:</strong> +91-9876543210</li>
        <li>Vaibhav Kolhe - <strong>Email:</strong> vaibhav@example.com | <strong>Phone:</strong> +91-8765432109</li>
        <li>Anuj Gadekar - <strong>Email:</strong> anuj@example.com | <strong>Phone:</strong> +91-7654321098</li>
        <li>Suraj Khairnar - <strong>Email:</strong> suraj@example.com | <strong>Phone:</strong> +91-6543210987</li>
      </ul>
    </div>
    <form className="contact-form">
      <label>
        Name:
        <input type="text" placeholder="Your name" />
      </label>
      <label>
        Email:
        <input type="email" placeholder="Your email" />
      </label>
      <label>
        Message:
        <textarea placeholder="Your message"></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  </section>
  )
}

export default Contact
