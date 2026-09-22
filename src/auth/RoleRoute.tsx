import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

interface RoleRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const API_URL =
  import.meta.env.VITE_API_URL || "/api/v1";

const RoleRoute = ({
  children,
  allowedRoles,
}: RoleRouteProps) => {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  const [currentUser, setCurrentUser] =
    useState<any>(user || null);

  const [checkingRole, setCheckingRole] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        /*
        |--------------------------------------------------------------------------
        | Redux already has user
        |--------------------------------------------------------------------------
        */

        if (user) {
          console.log(
            "✅ RoleRoute: User found in Redux:",
            user
          );

          if (mounted) {
            setCurrentUser(user);
            setCheckingRole(false);
          }

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | Get authenticated user from backend
        |--------------------------------------------------------------------------
        */

        console.log(
          "🔐 RoleRoute: Requesting current user..."
        );

        const response =
          await fetch(
            `${API_URL}/users/me`,
            {
              method: "GET",

              /*
               * Send httpOnly cookie.
               */
              credentials: "include",

              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        console.log(
          "📡 RoleRoute /users/me:",
          response.status
        );

        if (!response.ok) {
          throw new Error(
            "Unable to authenticate user"
          );
        }

        const result =
          await response.json();

        const authenticatedUser =
          result?.data?.user ||
          result?.data ||
          result?.user;

        if (!authenticatedUser) {
          throw new Error(
            "User information was not returned"
          );
        }

        console.log(
          "✅ RoleRoute: Authenticated user:",
          authenticatedUser
        );

        if (mounted) {
          setCurrentUser(
            authenticatedUser
          );

          setCheckingRole(false);
        }
      } catch (error) {
        console.error(
          "❌ RoleRoute authentication failed:",
          error
        );

        if (mounted) {
          setCurrentUser(null);
          setCheckingRole(false);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (checkingRole) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
          </div>

          <p className="text-sm text-muted-foreground">
            Verifying permissions...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | User not authenticated
  |--------------------------------------------------------------------------
  */

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Normalize role
  |--------------------------------------------------------------------------
  */

  const userRole =
    currentUser.role
      ?.toString()
      .trim()
      .toLowerCase();

  const normalizedAllowedRoles =
    allowedRoles.map((role) =>
      role
        .toString()
        .trim()
        .toLowerCase()
    );

  console.log(
    "👤 RoleRoute user role:",
    userRole
  );

  console.log(
    "🔐 Allowed roles:",
    normalizedAllowedRoles
  );

  /*
  |--------------------------------------------------------------------------
  | Check role
  |--------------------------------------------------------------------------
  */

  if (
    !normalizedAllowedRoles.includes(
      userRole
    )
  ) {
    console.error(
      "❌ RoleRoute: User does not have permission"
    );

    console.error(
      "User role:",
      userRole
    );

    console.error(
      "Allowed roles:",
      normalizedAllowedRoles
    );

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Authorized
  |--------------------------------------------------------------------------
  */

  console.log(
    "✅ RoleRoute: User authorized"
  );

  return children;
};

export default RoleRoute;