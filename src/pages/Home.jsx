import React, { useState, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Home.css";

/**
 * Home page component
 * Displays all products in a grid layout with cart sidebar
 */
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from all products' categories arrays
  const allCategories = products.flatMap((p) => p.categories || []);
  const categories = ["All", ...new Set(allCategories)];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (product.categories && product.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetch("https://shopping-backend-yzo4.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("products", data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-title">Welcome to ShopCart</h1>
        <p className="home-subtitle">
          Discover amazing products at great prices
        </p>
      </div>

      <div className="home-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="products-section">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
