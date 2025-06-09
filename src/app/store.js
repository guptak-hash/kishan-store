// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,  // Handles user authentication
    cart: cartReducer,   // Manages shopping cart
    products: productsReducer,   // Manages product data
  },
});