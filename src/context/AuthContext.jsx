import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

/**
 * Auth Context for managing user authentication state
 * Stores user data in localStorage for persistence
 */

// LocalStorage keys
const AUTH_STORAGE_KEY = "auth_user";
const TOKEN_STORAGE_KEY = "auth_token";

// Create context
const AuthContext = createContext(undefined);

/**
 * Load user from localStorage
 * @returns {Object|null} - User object or null if not found
 */
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      return { user, token: storedToken };
    }
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
  }
  return null;
};

/**
 * Save user to localStorage
 * @param {Object} user - User object
 * @param {string} token - Auth token
 */
const saveUserToStorage = (user, token) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

/**
 * Remove user from localStorage
 */
const removeUserFromStorage = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing user from localStorage:", error);
  }
};

/**
 * AuthProvider component
 * Provides authentication state and actions to all child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedAuth = loadUserFromStorage();
    if (savedAuth) {
      setUser(savedAuth.user);
      setToken(savedAuth.token);
    }
    setLoading(false);
  }, []);

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - User object
   */
  const register = useCallback(async (userData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email already exists (simulate)
        const existingUsers = JSON.parse(
          localStorage.getItem("registered_users") || "[]"
        );
        const emailExists = existingUsers.find(
          (u) => u.email === userData.email
        );

        if (emailExists) {
          reject(new Error("Email already registered"));
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          createdAt: new Date().toISOString(),
        };

        // Save to registered users list
        existingUsers.push({
          ...newUser,
          password: userData.password, // In real app, this would be hashed
        });
        localStorage.setItem(
          "registered_users",
          JSON.stringify(existingUsers)
        );

        // Generate token (simulate)
        const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Save to state and localStorage
        setUser(newUser);
        setToken(authToken);
        saveUserToStorage(newUser, authToken);

        resolve(newUser);
      }, 500);
    });
  }, []);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User object
   */
  const login = useCallback(async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const registeredUsers = JSON.parse(
          localStorage.getItem("registered_users") || "[]"
        );
        const user = registeredUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          reject(new Error("Invalid email or password"));
          return;
        }

        // Generate token (simulate)
        const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        // Save to state and localStorage
        setUser(userWithoutPassword);
        setToken(authToken);
        saveUserToStorage(userWithoutPassword, authToken);

        resolve(userWithoutPassword);
      }, 500);
    });
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    removeUserFromStorage();
  }, []);

  /**
   * Update user profile
   * @param {Object} updatedData - Updated user data
   * @returns {Promise<Object>} - Updated user object
   */
  const updateProfile = useCallback(async (updatedData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject(new Error("User not logged in"));
          return;
        }

        const updatedUser = {
          ...user,
          ...updatedData,
        };

        // Update in registered users list
        const registeredUsers = JSON.parse(
          localStorage.getItem("registered_users") || "[]"
        );
        const userIndex = registeredUsers.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          registeredUsers[userIndex] = {
            ...registeredUsers[userIndex],
            ...updatedData,
          };
          localStorage.setItem(
            "registered_users",
            JSON.stringify(registeredUsers)
          );
        }

        setUser(updatedUser);
        saveUserToStorage(updatedUser, token);

        resolve(updatedUser);
      }, 500);
    });
  }, [user, token]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 * @returns {Object} - Auth state and actions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

