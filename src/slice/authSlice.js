import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  message: null, // Optional: Store the login message for display
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user, accessToken, refreshToken, message } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.message = message; // Optional
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.message = null; // Optional
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

// export const selectUser = (state) => state.auth.user;
// export const selectAccessToken = (state) => state.auth.accessToken;
// export const selectRefreshToken = (state) => state.auth.refreshToken;
// export const selectLoginMessage = (state) => state.auth.message; // Optional

export default authSlice.reducer;