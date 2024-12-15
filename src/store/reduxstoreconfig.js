import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
// import productsReducer from '../slice/productsSlice'; // Import your slice (explained later)

export const store = configureStore({
  reducer: {
    // products: productsReducer, // Add your slice to the store reducers
    auth:authReducer,
  },
});