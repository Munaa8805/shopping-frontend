import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import "./Products.css";

/**
 * Products page component
 * Displays all products using ProductContext with advanced filtering and sorting
 */
const Products = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name"); // name, price-low, price-high
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from all products' categories arrays
  const allCategories = products.flatMap((p) => p.categories || []);
  const categories = ["All", ...new Set(allCategories)];

  // Filter products based on search and category
  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (product.categories && product.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">All Products</h1>
        <p className="products-subtitle">
          Browse our complete collection of {products.length} products
        </p>
      </div>

      <div className="products-controls">
        <div className="products-search-sort">
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

          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              Sort by:
            </label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            {showFilters ? "Hide" : "Show"} Filters
          </button>
        </div>

        <div
          className={`category-filters ${
            showFilters ? "show" : ""
          }`}
        >
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

      <div className="products-results">
        <div className="results-header">
          <p className="results-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
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
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

