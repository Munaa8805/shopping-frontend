# Shopping Cart Application

A full-featured shopping cart application built with React and Context API. This project demonstrates modern React patterns including state management with Context API, lazy loading, responsive design, and efficient component architecture.

## Features

- 🛒 **Shopping Cart Functionality**
  - Add/remove items from cart
  - Update item quantities
  - Real-time cart total calculation
  - Persistent cart state using React Context

- 🏠 **Home Page**
  - Product grid display
  - Search functionality
  - Category filtering
  - Responsive design

- 📦 **Product Detail Page**
  - Detailed product information
  - Quantity selector
  - Add to cart functionality
  - Lazy-loaded images

- 📧 **Contact Page**
  - Contact form with validation
  - Business information display
  - Responsive layout

- 🎨 **UI/UX Features**
  - Fully responsive design (mobile, tablet, desktop)
  - Lazy loading for images (performance optimization)
  - Smooth animations and transitions
  - Modern, clean interface

## Technology Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Vite** - Build tool and dev server
- **CSS3** - Styling with responsive design

## Project Structure

```
shoppin-cart/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── ProductCard.jsx  # Product card component
│   │   ├── Cart.jsx         # Shopping cart sidebar
│   │   └── LazyImage.jsx    # Lazy loading image component
│   ├── context/             # Context providers
│   │   └── CartContext.jsx  # Shopping cart state management
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Home page with product listing
│   │   ├── ProductDetail.jsx # Product detail page
│   │   └── Contact.jsx     # Contact page
│   ├── data/                # Data files
│   │   └── products.js      # Product data
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Navigate to the project directory:
```bash
cd shoppin-cart
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

## Build for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Key Features Explained

### Context API State Management

The shopping cart state is managed using React Context API with `useReducer` for efficient state updates. The `CartContext` provides:
- Cart items array
- Total price calculation
- Item count
- Actions: add, remove, update quantity, clear cart

### Lazy Loading Images

Images are loaded only when they enter the viewport using the Intersection Observer API. This improves initial page load performance and reduces bandwidth usage.

### Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (< 480px)
- Tablets (480px - 768px)
- Desktop (> 768px)

### Component Architecture

- **Reusable Components**: ProductCard, LazyImage, Navbar
- **Page Components**: Home, ProductDetail, Contact
- **Context Providers**: CartProvider for global state

## Usage

1. **Browse Products**: View all products on the home page
2. **Search & Filter**: Use the search bar and category filters to find products
3. **View Details**: Click on any product to see detailed information
4. **Add to Cart**: Click "Add to Cart" button on product cards or detail page
5. **Manage Cart**: Click the cart icon in the navbar to view and manage cart items
6. **Contact**: Visit the contact page to send a message

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication
- Product reviews and ratings
- Payment integration
- Order history
- Wishlist functionality
- Product recommendations
- Backend API integration

## License

This project is open source and available for educational purposes.

## Author

Created as a demonstration of modern React development practices.

