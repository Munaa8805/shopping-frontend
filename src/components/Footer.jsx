import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Footer component
 * Displays footer information, links, and social media
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">ShopCart</h3>
            <p className="footer-description">
              Your one-stop shop for all your shopping needs. Quality products
              at great prices, delivered with care.
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li>
                <Link to="/contact" className="footer-link">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="#shipping" className="footer-link">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#returns" className="footer-link">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-link">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="footer-section">
            <h4 className="footer-heading">My Account</h4>
            <ul className="footer-links">
              <li>
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="footer-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="footer-link">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:support@shopcart.com" className="footer-link">
                  support@shopcart.com
                </a>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+15551234567" className="footer-link">
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span className="footer-text">
                  123 Shopping Street
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} ShopCart. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy" className="footer-legal-link">
                Privacy Policy
              </a>
              <span className="footer-separator">|</span>
              <a href="#terms" className="footer-legal-link">
                Terms of Service
              </a>
              <span className="footer-separator">|</span>
              <a href="#cookies" className="footer-legal-link">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

