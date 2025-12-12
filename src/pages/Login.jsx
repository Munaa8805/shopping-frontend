import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

/**
 * Login page component
 * Allows users to log in to their account
 */
const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue shopping</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

