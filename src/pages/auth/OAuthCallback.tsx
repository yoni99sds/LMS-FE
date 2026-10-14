
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch } from "@/hooks/redux";
import { setCredentials, type User } from "@/features/auth/authSlice";
import API from "@/api/auth.api";

const CHECKOUT_PATH = "/dashboard/checkout";
const AUTH_REDIRECT_KEY = "edumaster_auth_redirect";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const authenticateUser = async () => {
      try {
        // Read the saved destination before completing OAuth.
        const savedDestination = sessionStorage.getItem(AUTH_REDIRECT_KEY);

        // Only honor known, internal destinations.
        const redirectToCheckout =
          savedDestination === CHECKOUT_PATH;

        // Retrieve the authenticated user using the OAuth cookie.
        const response = await API.get("/users/me");

        const result = response.data;

        const user = (
          result?.data?.user ??
          result?.data ??
          result?.user
        ) as User | undefined;

        if (!user || !user.role) {
          throw new Error(
            "The server did not return an authenticated user."
          );
        }

        if (!active) return;

        const token =
          result?.data?.token ??
          result?.token ??
          result?.accessToken ??
          null;

        dispatch(setCredentials({ user, token }));

        const role = user.role.toLowerCase();

        // Preserve the checkout destination for students who
        // started authentication from the cart.
        if (redirectToCheckout && role === "student") {
          sessionStorage.removeItem(AUTH_REDIRECT_KEY);
          navigate(CHECKOUT_PATH, { replace: true });
          return;
        }

        // Checkout is only available to students.
        // Other roles continue to their normal dashboards.
        sessionStorage.removeItem(AUTH_REDIRECT_KEY);

        if (role === "student") {
          navigate("/dashboard/student", { replace: true });
        } else if (role === "admin") {
          navigate("/admin", { replace: true });
        } else if (role === "instructor") {
          navigate("/instructor/dashboard", { replace: true });
        } else {
          throw new Error("Your account has an unrecognized role.");
        }
      } catch (err) {
        if (!active) return;

        console.error("OAuth callback failed:", err);
        setError("Unable to complete login. Please try again.");
        toast.error("Google login failed. Please try again.");
      }
    };

    void authenticateUser();

    return () => {
      active = false;
    };
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="space-y-3 text-center">
        {error ? (
          <>
            <p className="text-destructive">{error}</p>
            <button
              onClick={() => navigate("/login", { replace: true })}
              className="text-primary underline"
            >
              Return to login
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
            <p>Completing your login...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;