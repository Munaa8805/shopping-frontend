import React, { useState, useRef, useEffect } from 'react'
import './LazyImage.css'

/**
 * Lazy loading image component
 * Loads images only when they enter the viewport
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} className - CSS class name
 */
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px' // Start loading 50px before the image enters viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return (
    <div ref={imgRef} className={`lazy-image-container ${className || ''}`}>
      {!isLoaded && (
        <div className="lazy-image-placeholder">
          <div className="spinner"></div>
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  )
}

export default LazyImage

