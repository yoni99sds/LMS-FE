import axios from 'axios';
import { ENV } from '@/config/env';

const API = axios.create({
  baseURL: ENV.API_URL, 
  withCredentials: true,
});

// Attach token automatically if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const signup = (data: any) => API.post('/auth/signup', data);
export const login = (data: any) => API.post('/auth/login', data);
export const verifyOtp = (data: any) => API.post('/auth/verify-otp', data);

export const forgotPassword = (data: any) =>
  API.post('/auth/forgot-password', data);

export const resetPassword = (token: string, data: any) =>
  API.post(`/auth/reset-password/${token}`, data);

export const refreshToken = () => API.post('/auth/refresh-token');
export const logout = () => API.post('/auth/logout');

export default API;