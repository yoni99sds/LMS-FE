
import axios, { type AxiosError } from "axios";
import { ENV } from "@/config/env";

const API = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    // A failed login or other authentication request must not
    // automatically terminate an existing session.
    const isAuthEndpoint = url.includes("/auth/");

    if (
      status === 401 &&
      !isAuthEndpoint &&
      typeof window !== "undefined"
    ) {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        window.dispatchEvent(
          new Event("lms:session-expired")
        );
      }
    }

    // Never refresh or retry the failed request.
    return Promise.reject(error);
  }
);

export const signup = (data: unknown) =>
  API.post("/auth/signup", data);

export const login = (data: unknown) =>
  API.post("/auth/login", data);

export const verifyOtp = (data: { email: string; otp: string }) =>
  API.post("/auth/verify-otp", data);

export const forgotPassword = (data: { email: string }) =>
  API.post("/auth/forgot-password", data);

export const resetPassword = (
  token: string,
  data: { password: string }
) => API.post(`/auth/reset-password/${token}`, data);

export const refreshToken = () =>
  API.post("/auth/refresh-token");

export const logout = () =>
  API.post("/auth/logout");

export const googleLoginRedirect = () => {
  window.location.href = `${ENV.API_URL}/auth/google`;
};

export default API;
