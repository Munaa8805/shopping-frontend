import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import LazyImage from '../components/LazyImage'
import './ProductDetail.css'

/**
 * Product detail page component
 * Displays full product information with add to cart functionality
 */
const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const product = getProductById(id)

  // Redirect to home if product not found
  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className="back-button">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    setTimeout(() => {
      addToCart(product, quantity)
      setIsAdding(false)
      // Show success message (could be enhanced with a toast notification)
      alert(`${quantity} ${product.name}(s) added to cart!`)
    }, 200)
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1
    setQuantity(Math.max(1, Math.min(10, value)))
  }

  // Get images array or fallback to single image
  const productImages = product.images && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : [])
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Get categories array or fallback to single category
  const productCategories = product.categories || (product.category ? [product.category] : [])

  return (
    <div className="product-detail-page">
      <button className="back-nav-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail-container">
        <div className="product-detail-images">
          <div className="main-image-container">
            <LazyImage
              src={productImages[selectedImageIndex]}
              alt={`${product.name} - Image ${selectedImageIndex + 1}`}
              className="detail-image"
            />
          </div>
          {productImages.length > 1 && (
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <LazyImage
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-info">
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-categories">
            {productCategories.map((category, index) => (
              <span key={index} className="detail-category-tag">
                {category}
              </span>
            ))}
          </div>
          <p className="detail-price">${product.price.toFixed(2)}</p>

          <div className="detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-availability">
            <span
              className={`availability-badge ${
                product.inStock ? 'in-stock' : 'out-of-stock'
              }`}
            >
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </span>
          </div>

          {product.inStock && (
            <div className="detail-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className={`add-to-cart-detail-btn ${isAdding ? 'adding' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? 'Adding...' : `Add ${quantity} to Cart`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

