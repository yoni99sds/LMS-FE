import axios from "axios";
import { ENV } from "@/config/env";

const API = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});

// ========================
// AUTH REQUESTS
// ========================
export const signup = (data: any) => API.post("/auth/signup", data);

export const login = (data: any) => API.post("/auth/login", data);

export const verifyOtp = (data: { email: string; otp: string }) =>
  API.post("/auth/verify-otp", data);

export const forgotPassword = (data: any) =>
  API.post("/auth/forgot-password", data);

export const resetPassword = (token: string, data: any) =>
  API.post(`/auth/reset-password/${token}`, data);

export const refreshToken = () => API.post("/auth/refresh-token");

export const logout = () => API.post("/auth/logout");

// ========================
// GOOGLE OAUTH (REDIRECT FLOW)
// ========================

// 🔥 THIS IS THE ONLY GOOGLE FUNCTION YOU NEED
export const googleLoginRedirect = () => {
  window.location.href = `${ENV.API_URL}/auth/google`;
};

export default API;