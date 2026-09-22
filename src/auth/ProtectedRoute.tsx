import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

const API_URL =
  import.meta.env.VITE_API_URL || "/api/v1";

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication =
      async () => {
        try {
          /*
          |--------------------------------------------------------------------------
          | If Redux already has the user
          |--------------------------------------------------------------------------
          */

          if (user) {
            console.log(
              "✅ ProtectedRoute: User already exists in Redux"
            );

            if (mounted) {
              setAuthenticated(true);
              setCheckingAuth(false);
            }

            return;
          }

          /*
          |--------------------------------------------------------------------------
          | Check authentication using httpOnly cookie
          |--------------------------------------------------------------------------
          */

          console.log(
            "🔐 ProtectedRoute: Checking authentication..."
          );

          const response =
            await fetch(
              `${API_URL}/users/me`,
              {
                method: "GET",

                /*
                 * IMPORTANT:
                 * Sends the httpOnly accessToken cookie.
                 */
                credentials: "include",

                headers: {
                  Accept:
                    "application/json",
                },
              }
            );

          console.log(
            "📡 ProtectedRoute /users/me:",
            response.status
          );

          if (!response.ok) {
            throw new Error(
              "User is not authenticated"
            );
          }

          const result =
            await response.json();

          const currentUser =
            result?.data?.user ||
            result?.data ||
            result?.user;

          if (!currentUser) {
            throw new Error(
              "Authenticated user was not returned"
            );
          }

          console.log(
            "✅ ProtectedRoute: Authenticated user:",
            currentUser
          );

          if (mounted) {
            setAuthenticated(true);
            setCheckingAuth(false);
          }
        } catch (error) {
          console.error(
            "❌ ProtectedRoute authentication failed:",
            error
          );

          if (mounted) {
            setAuthenticated(false);
            setCheckingAuth(false);
          }
        }
      };

    checkAuthentication();

    return () => {
      mounted = false;
    };
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
          </div>

          <p className="text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Not authenticated
  |--------------------------------------------------------------------------
  */

  if (!authenticated && !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Authenticated
  |--------------------------------------------------------------------------
  */

  return children;
};

export default ProtectedRoute;