import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: savedUser ? JSON.parse(savedUser) : null,
      token: savedToken || null,
      isAuthenticated: !!savedToken,
      isLoading: false,
    },
  },
});