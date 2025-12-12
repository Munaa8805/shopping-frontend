import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

/**
 * Cart Context for managing shopping cart state
 * Uses useReducer for efficient state management
 */

// Action types
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  TOGGLE_CART: "TOGGLE_CART",
  CLOSE_CART: "CLOSE_CART",
  LOAD_CART: "LOAD_CART",
};

// LocalStorage key
const CART_STORAGE_KEY = "shopping_cart";

/**
 * Load cart from localStorage
 * @returns {Object|null} - Cart state or null if not found/invalid
 */
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      // Validate cart structure
      if (
        parsedCart &&
        Array.isArray(parsedCart.items) &&
        typeof parsedCart.total === "number" &&
        typeof parsedCart.itemCount === "number"
      ) {
        return parsedCart;
      }
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return null;
};

/**
 * Save cart to localStorage
 * @param {Object} cartState - Cart state to save
 */
const saveCartToStorage = (cartState) => {
  try {
    const cartToSave = {
      items: cartState.items,
      total: cartState.total,
      itemCount: cartState.itemCount,
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartToSave));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Get initial state from localStorage or use default
const getInitialState = () => {
  const savedCart = loadCartFromStorage();
  if (savedCart) {
    return {
      ...savedCart,
      isOpen: false, // Always start with cart closed
    };
  }
  return {
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false,
  };
};

// Initial state for the cart
const initialState = getInitialState();

/**
 * Calculate total price and item count
 * @param {Array} items - Array of cart items
 * @returns {Object} - Object with total and itemCount
 */

const calculateTotals = (items) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

/**
 * Cart reducer function
 * Handles all cart state updates
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // New item, add to cart
        newItems = [...state.items, action.payload];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return {
        items: newItems,
        total,
        itemCount,
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const { total, itemCount } = calculateTotals(newItems);
      return {
        items: newItems,
        total,
        itemCount,
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      return {
        items: newItems,
        total,
        itemCount,
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        items: [],
        total: 0,
        itemCount: 0,
        isOpen: state.isOpen,
      };

    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case CART_ACTIONS.CLOSE_CART:
      return {
        ...state,
        isOpen: false,
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...action.payload,
        isOpen: state.isOpen, // Preserve cart open/closed state
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext(undefined);

/**
 * CartProvider component
 * Provides cart state and actions to all child components
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart) {
      dispatch({
        type: CART_ACTIONS.LOAD_CART,
        payload: savedCart,
      });
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (state.items.length > 0) {
      saveCartToStorage(state);
    } else {
      // Remove from localStorage if cart is empty
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
        console.error("Error removing cart from localStorage:", error);
      }
    }
  }, [state.items, state.total, state.itemCount]);

  // Memoized action creators for better performance
  const addToCart = useCallback((product, quantity = 1) => {
    // Get first image from images array, or fallback to image property
    const productImage =
      product.images && product.images.length > 0
        ? product.images[0]
        : product.image || "";

    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: productImage,
        quantity,
      },
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: productId,
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    // localStorage will be cleared automatically by useEffect when items become empty
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLOSE_CART });
  }, []);

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    isOpen: state.isOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Custom hook to use cart context
 * @returns {Object} - Cart state and actions
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
