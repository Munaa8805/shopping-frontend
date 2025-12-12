import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import LazyImage from "../components/LazyImage";
import "./Cart.css";

/**
 * Cart page component
 * Full-page view of shopping cart with all items and checkout functionality
 */
const Cart = () => {
  const {
    items,
    total,
    itemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page-container">
          <h1 className="cart-page-title">Shopping Cart</h1>
          <div className="cart-empty-state">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <h1 className="cart-page-title">Shopping Cart</h1>
          <p className="cart-page-subtitle">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="cart-page-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Items</h2>
              <button
                className="clear-cart-link"
                onClick={clearCart}
                aria-label="Clear all items from cart"
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-page-item">
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-page-item-image"
                  >
                    <LazyImage src={item.image} alt={item.name} />
                  </Link>

                  <div className="cart-page-item-info">
                    <Link
                      to={`/product/${item.id}`}
                      className="cart-page-item-name"
                    >
                      {item.name}
                    </Link>
                    <p className="cart-page-item-price">
                      ${item.price.toFixed(2)} each
                    </p>

                    <div className="cart-page-item-controls">
                      <div className="cart-page-quantity-controls">
                        <button
                          className="cart-page-quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cart-page-quantity-display">
                          {item.quantity}
                        </span>
                        <button
                          className="cart-page-quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-page-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <button
                        className="cart-page-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-details">
                <div className="cart-summary-row">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                <div className="cart-summary-row">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="cart-summary-divider"></div>
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <button className="checkout-button">Proceed to Checkout</button>

              <Link to="/" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

