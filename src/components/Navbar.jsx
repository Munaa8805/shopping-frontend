import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

/**
 * Navigation bar component
 * Displays navigation links and cart icon with item count
 */
const Navbar = () => {
  const { itemCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">ShopCart</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? 'hamburger open' : 'hamburger'}></span>
        </button>

        {/* Navigation links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link
              to="/"
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/products"
              className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/contact"
              className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/cart"
              className={`navbar-link cart-link ${isActive('/cart') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-text">Cart</span>
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link
                  to="/profile"
                  className={`navbar-link ${isActive('/profile') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="profile-icon">👤</span>
                  <span className="profile-text">{user?.name?.split(' ')[0] || 'Profile'}</span>
                </Link>
              </li>
              <li className="navbar-item">
                <button
                  className="navbar-link logout-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link
                  to="/login"
                  className={`navbar-link ${isActive('/login') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="/register"
                  className={`navbar-link ${isActive('/register') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

