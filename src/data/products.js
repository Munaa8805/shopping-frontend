/**
 * Product data for the shopping cart application
 * In a real application, this would come from an API
 */

export const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop'
    ],
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    categories: ['Electronics', 'Audio', 'Wireless'],
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=500&fit=crop'
    ],
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone connectivity.',
    categories: ['Electronics', 'Wearables', 'Fitness'],
    inStock: true
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&h=500&fit=crop'
    ],
    description: 'Ergonomic aluminum laptop stand for better posture and workspace organization.',
    categories: ['Accessories', 'Office', 'Ergonomic'],
    inStock: true
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587820192435-5b98ad11c2dd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1618384887929-16ec33cab9ef?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop'
    ],
    description: 'RGB backlit mechanical keyboard with customizable keys and premium switches.',
    categories: ['Electronics', 'Gaming', 'Accessories'],
    inStock: true
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39f7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1605773527852-c546b891e55b?w=500&h=500&fit=crop'
    ],
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    categories: ['Accessories', 'Electronics', 'Office'],
    inStock: true
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=500&fit=crop'
    ],
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader support.',
    categories: ['Accessories', 'Electronics', 'Connectivity'],
    inStock: true
  },
  {
    id: 7,
    name: 'Monitor Stand',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
    ],
    description: 'Adjustable monitor stand with built-in storage and cable management.',
    categories: ['Accessories', 'Office', 'Ergonomic'],
    inStock: true
  },
  {
    id: 8,
    name: 'Webcam HD',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=500&fit=crop'
    ],
    description: '1080p HD webcam with auto-focus and built-in microphone for video calls.',
    categories: ['Electronics', 'Video', 'Office'],
    inStock: true
  }
]

/**
 * Get a product by ID
 * @param {number} id - Product ID
 * @returns {Object|null} - Product object or null if not found
 */
export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id)) || null
}

