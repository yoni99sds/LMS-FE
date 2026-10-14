
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole =
  | "student"
  | "instructor"
  | "admin"
  | "subadmin"
  | "Student"
  | "Instructor"
  | "Admin"
  | "SubAdmin";

export interface User {
  id: string;
  _id?: string;
  name?: string;
  fullName?: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  permissions?: string[];
  status?: string;
  isEmailVerified?: boolean;
  isMfaActive?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

export const normalizeRole = (role: string): UserRole | null => {
  switch (role.toLowerCase()) {
    case "student":
      return "student";
    case "instructor":
      return "instructor";
    case "admin":
      return "admin";
    case "subadmin":
    case "sub_admin":
    case "sub-admin":
      return "subadmin";
    default:
      return null;
  }
};

export const normalizeUser = (user: User): User => {
  const id = String(user.id || user._id || "");
  const role = normalizeRole(user.role);

  return {
    ...user,
    id,
    _id: user._id ? String(user._id) : id,
    name:
      user.name ||
      user.fullName ||
      [user.firstName, user.lastName].filter(Boolean).join(" "),
    role: role ?? user.role,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token?: string | null;
      }>
    ) => {
      const normalizedUser = normalizeUser(action.payload.user);

      state.user = normalizedUser;
      state.token = null;
      state.isAuthenticated = true;
      state.isLoading = false;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        localStorage.removeItem("token");
      }
    },

    restoreUser: (state, action: PayloadAction<User | null>) => {
      if (!action.payload) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;

        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }

        return;
      }

      const normalizedUser = normalizeUser(action.payload);

      state.user = normalizedUser;
      state.token = null;
      state.isAuthenticated = true;
      state.isLoading = false;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        localStorage.removeItem("token");
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCredentials,
  restoreUser,
  logout,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;