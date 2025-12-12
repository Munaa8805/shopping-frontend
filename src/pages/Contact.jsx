import React, { useState } from 'react'
import './Contact.css'

/**
 * Contact page component
 * Displays contact information and a contact form
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1000)
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-section">
              <h3>Get in Touch</h3>
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>support@shopcart.com</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>123 Shopping Street<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🕒</span>
                <div>
                  <strong>Business Hours</strong>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="form-success">
                  ✓ Thank you! Your message has been sent successfully.
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

