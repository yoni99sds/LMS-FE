
import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { login, googleLoginRedirect } from "@/api/auth.api";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/features/auth/authSlice";

const CHECKOUT_PATH = "/dashboard/checkout";
const AUTH_REDIRECT_KEY = "edumaster_auth_redirect";

interface LoginLocationState {
  from?: string | { pathname?: string };
}

type SupportedRole = "student" | "admin" | "instructor" | "subadmin";

interface LoginUser {
  id?: string;
  _id?: string;
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
  permissions?: string[];
  status?: string;
  isEmailVerified?: boolean;
  isMfaActive?: boolean;
}

const normalizeRole = (role: string): SupportedRole | null => {
  switch (role.trim().toLowerCase()) {
    case "student":
      return "student";

    case "admin":
      return "admin";

    case "instructor":
      return "instructor";

    case "subadmin":
    case "sub_admin":
    case "sub-admin":
      return "subadmin";

    default:
      return null;
  }
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const locationState = location.state as LoginLocationState | null;

  /*
   * Resolve the destination requested before login.
   * React Router state takes priority over sessionStorage.
   */
  const getRedirectPath = (): string | null => {
    const from = locationState?.from;

    if (typeof from === "string" && from.startsWith("/")) {
      return from;
    }

    if (
      typeof from === "object" &&
      from !== null &&
      typeof from.pathname === "string" &&
      from.pathname.startsWith("/")
    ) {
      return from.pathname;
    }

    const storedRedirect = sessionStorage.getItem(AUTH_REDIRECT_KEY);

    if (storedRedirect?.startsWith("/")) {
      return storedRedirect;
    }

    return null;
  };

  const redirectTo = getRedirectPath();

  /*
   * Default destination for each account role.
   * Confirm that /sub-admin matches your router configuration.
   */
  const getDefaultRedirect = (role: SupportedRole): string => {
    switch (role) {
      case "student":
        return "/dashboard/student";

      case "admin":
        return "/admin";

      case "subadmin":
        return "/sub-admin";

      case "instructor":
        return "/instructor/dashboard";

      default:
        return "/";
    }
  };

  // =========================
  // EMAIL LOGIN
  // =========================
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    };

    if (!payload.email || !payload.password) {
      toast.error("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await login(payload);

      /*
       * Backend login response:
       * {
       *   status: "success",
       *   data: {
       *     user: { ... }
       *   }
       * }
       *
       * Also support the alternative response shapes used by
       * existing API implementations.
       */
      const user = (
        res.data?.data?.user ??
        res.data?.user
      ) as LoginUser | undefined;

      if (!user || typeof user.role !== "string") {
        throw new Error(
          "The server did not return valid user information.",
        );
      }

      const userId =
        typeof user.id === "string"
          ? user.id
          : typeof user._id === "string"
            ? user._id
            : "";

      const userEmail =
        typeof user.email === "string"
          ? user.email.trim()
          : "";

      const userName =
        typeof user.name === "string" && user.name.trim()
          ? user.name.trim()
          : typeof user.fullName === "string" && user.fullName.trim()
            ? user.fullName.trim()
            : [
                typeof user.firstName === "string"
                  ? user.firstName
                  : "",
                typeof user.lastName === "string"
                  ? user.lastName
                  : "",
              ]
                .filter(Boolean)
                .join(" ")
                .trim();

      const normalizedRole = normalizeRole(user.role);

      /*
       * Validate the required account fields and allow Sub Admin.
       */
      if (!userId || !userEmail || !userName || !normalizedRole) {
        throw new Error(
          "The server returned incomplete user information. Please check the login API response.",
        );
      }

      /*
       * The backend currently uses httpOnly cookies for authentication.
       * Do not require an access token in the JSON response.
       */
      const authenticatedUser = {
        id: userId,
        _id: user._id || userId,
        name: userName,
        fullName: user.fullName || userName,
        email: userEmail,
        role: normalizedRole,
        ...(typeof user.firstName === "string"
          ? { firstName: user.firstName }
          : {}),
        ...(typeof user.lastName === "string"
          ? { lastName: user.lastName }
          : {}),
        ...(typeof user.profilePicture === "string"
          ? { profilePicture: user.profilePicture }
          : {}),
        ...(Array.isArray(user.permissions)
          ? { permissions: user.permissions }
          : {}),
        ...(typeof user.status === "string"
          ? { status: user.status }
          : {}),
        ...(typeof user.isEmailVerified === "boolean"
          ? { isEmailVerified: user.isEmailVerified }
          : {}),
        ...(typeof user.isMfaActive === "boolean"
          ? { isMfaActive: user.isMfaActive }
          : {}),
      };

      dispatch(
        setCredentials({
          user: authenticatedUser,
          token: null,
        }),
      );

      toast.success("Login successful");

      const destination = getRedirectPath();

      /*
       * Only students may continue to the student checkout page.
       */
      if (
        destination === CHECKOUT_PATH &&
        normalizedRole === "student"
      ) {
        sessionStorage.removeItem(AUTH_REDIRECT_KEY);

        navigate(CHECKOUT_PATH, {
          replace: true,
        });

        return;
      }

      /*
       * Do not redirect Admin, Sub Admin, or Instructor accounts
       * to the student checkout page.
       */
      sessionStorage.removeItem(AUTH_REDIRECT_KEY);

      navigate(getDefaultRedirect(normalizedRole), {
        replace: true,
      });
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = () => {
    const destination = getRedirectPath();

    /*
     * Preserve the original destination across the OAuth redirect.
     */
    if (destination) {
      sessionStorage.setItem(AUTH_REDIRECT_KEY, destination);
    } else {
      sessionStorage.removeItem(AUTH_REDIRECT_KEY);
    }

    googleLoginRedirect();
  };

  // =========================
  // GOOGLE ERROR HANDLING
  // =========================
  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "user_not_found") {
      toast.error(
        "No account exists for this Google email. Please register first.",
      );
    }

    if (error === "oauth_failed") {
      toast.error("Google login failed. Please try again.");
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      {/* GOOGLE LOGIN */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleGoogleLogin}
          aria-label="Continue with Google"
          className="p-3 rounded-full border hover:bg-muted transition"
          disabled={loading}
        >
          <FcGoogle className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        or continue with email
      </div>

      {redirectTo === CHECKOUT_PATH && (
        <p className="rounded-lg bg-primary/10 px-3 py-2 text-center text-sm text-primary">
          Log in to continue to checkout.
        </p>
      )}

      {/* EMAIL LOGIN */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4" />

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="pl-10"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="pl-10 pr-10"
              required
              disabled={loading}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <p className="text-center text-sm">
        No account?{" "}
        <Link
          to="/register"
          state={redirectTo ? { from: redirectTo } : undefined}
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;