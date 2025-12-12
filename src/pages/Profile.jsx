import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Profile.css";

/**
 * Profile page component
 * Displays and allows editing of user profile information
 */
const Profile = () => {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const { itemCount, total } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    setIsLoading(true);

    try {
      await updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
      });
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading...</div>
      </div>
    );
  }

  const accountCreatedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : "U"}
              </div>
            </div>

            {!isEditing ? (
              <div className="profile-info">
                <div className="info-item">
                  <label>Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>Member Since</label>
                  <p>{accountCreatedDate}</p>
                </div>
                <button className="edit-button" onClick={handleEdit}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <form className="profile-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="save-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="profile-stats">
            <h2>Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-value">{itemCount}</div>
                <div className="stat-label">Items in Cart</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-value">${total.toFixed(2)}</div>
                <div className="stat-label">Cart Total</div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

