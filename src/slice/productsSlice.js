// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// // Define an asynchronous thunk action for fetching products
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     const response = await axios.get(apiUrl); // Replace `apiUrl` with your actual API URL
//     return response.data;
//   }
// );

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {}, // No synchronous reducers in this case
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productsSlice.reducer;