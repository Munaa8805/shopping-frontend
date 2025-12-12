import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'
import './ProductCard.css'

/**
 * Product card component
 * Displays product information with lazy-loaded image
 * @param {Object} product - Product object
 */
const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    // Simulate async operation
    setTimeout(() => {
      addToCart(product, 1)
      setIsAdding(false)
    }, 200)
  }

  // Get first image from images array, or fallback to image property for backward compatibility
  const productImage = product.images && product.images.length > 0
    ? product.images[0]
    : product.image

  // Get categories array or fallback to single category
  const productCategories = product.categories || (product.category ? [product.category] : [])

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <LazyImage
            src={productImage}
            alt={product.name}
            className="product-image"
          />
          {!product.inStock && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-categories">
            {productCategories.map((category, index) => (
              <span key={index} className="product-category-tag">
                {category}
              </span>
            ))}
          </div>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        className={`add-to-cart-btn ${isAdding ? 'adding' : ''} ${
          !product.inStock ? 'disabled' : ''
        }`}
        onClick={handleAddToCart}
        disabled={!product.inStock || isAdding}
      >
        {isAdding ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  )
}

export default ProductCard

