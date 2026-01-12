import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../context/AuthContext";
import "./Register.css";
import axiosInstance from "../lib/axios";

/**
 * Register page component
 * Allows users to create a new account
 */
const Register = () => {
  const { register, isAuthenticated , setIsAuthenticated , setUser} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Himanshu",
    email: "himanshu@gmail.com",
    password: "123456",
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

  const validateForm = () => {
    if (formData.password.length < 3) {
      setError("Password must be at least 3 characters long");
      return false;
    }

    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    console.log("formData", formData);

    try {
      const response = await axios.post("https://backend-ideas-8pfw.onrender.com/api/v1/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("response", response);
      if (response.status === 201) {
        toast.success("Account created successfully");
        localStorage.setItem("accessToken", response.data.accessToken);
        // localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setIsAuthenticated(true);
        setUser(response.data.data);
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Sign up to start shopping with us</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              autoComplete="name"
            />
          </div>

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
              placeholder="At least 6 characters"
              required
              autoComplete="new-password"
              minLength="6"
            />
            <span className="form-hint">Must be at least 6 characters</span>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
