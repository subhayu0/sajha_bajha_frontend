import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '../utils/helpers';

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      } else {
        // Add new item
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        ...action.payload,
      };
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get('cart');
    if (savedCart) {
      dispatch({ type: CART_ACTIONS.LOAD_CART, payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set('cart', state);
  }, [state]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity,
      stockQuantity: product.stockQuantity,
      sku: product.sku,
    };
    
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Calculate subtotal
  const getSubtotal = () => {
    return state.total;
  };

  // Calculate tax (13% VAT for Nepal)
  const getTax = () => {
    return state.total * 0.13;
  };

  // Calculate shipping (free for orders over NPR 5000)
  const getShipping = () => {
    return state.total >= 5000 ? 0 : 500;
  };

  // Calculate total with tax and shipping
  const getTotal = () => {
    return state.total + getTax() + getShipping();
  };

  // Check if cart is empty
  const isEmpty = () => {
    return state.items.length === 0;
  };

  // Get cart summary
  const getCartSummary = () => {
    return {
      subtotal: getSubtotal(),
      tax: getTax(),
      shipping: getShipping(),
      total: getTotal(),
      itemCount: state.itemCount,
      isEmpty: isEmpty(),
    };
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    isEmpty,
    getCartSummary,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 