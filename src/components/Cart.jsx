import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import LazyImage from './LazyImage'
import './Cart.css'

/**
 * Cart component
 * Displays cart items, quantities, and total
 * @param {boolean} isOpen - Whether the cart is open
 * @param {Function} onClose - Function to close the cart
 */
const Cart = ({ isOpen, onClose }) => {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } =
    useCart()

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart ({itemCount})</h2>
          <button className="cart-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Link to="/" className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-image"
                    onClick={onClose}
                  >
                    <LazyImage src={item.image} alt={item.name} />
                  </Link>
                  <div className="cart-item-info">
                    <Link
                      to={`/product/${item.id}`}
                      className="cart-item-name"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-controls">
                      <div className="quantity-controls-small">
                        <button
                          className="quantity-btn-small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-btn-small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn">Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart

