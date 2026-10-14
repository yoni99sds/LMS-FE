
import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  normalizeRole,
  normalizeUser,
  type User,
} from "../features/auth/authSlice";

function getSavedUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser) as Partial<User>;

    if (
      typeof parsedUser.email !== "string" ||
      typeof parsedUser.role !== "string"
    ) {
      localStorage.removeItem("user");
      return null;
    }

    const normalizedRole = normalizeRole(parsedUser.role);

    if (!normalizedRole) {
      localStorage.removeItem("user");
      return null;
    }

    const id = String(parsedUser.id || parsedUser._id || "");

    if (!id) {
      localStorage.removeItem("user");
      return null;
    }

    return normalizeUser({
      ...parsedUser,
      id,
      email: parsedUser.email,
      role: normalizedRole,
    } as User);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

// The backend stores authentication tokens in httpOnly cookies.
// Do not restore an access token from localStorage.
const savedUser = getSavedUser();

if (typeof window !== "undefined") {
  localStorage.removeItem("token");
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },

  preloadedState: {
    auth: {
      user: savedUser,
      token: null,
      isAuthenticated: Boolean(savedUser),
      isLoading: false,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;