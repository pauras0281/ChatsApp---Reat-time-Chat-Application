// /redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state loaded from sessionStorage
const initialState = {
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,
  token: sessionStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      state.user = userData;
      state.token = userData.token;
      sessionStorage.setItem("token", userData.token);
      sessionStorage.setItem("user", JSON.stringify(userData));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

// Actions
export const { login, logout } = authSlice.actions;

// Selector
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => !!state.auth.user;

export default authSlice.reducer;
