
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import API from "@/api/auth.api";
import {
  logout as clearAuthSession,
  restoreUser,
  type User,
} from "@/features/auth/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = async () => {
      setCheckingAuth(true);

      try {
        // Verify the HTTP-only access-token cookie with the backend.
        const response = await API.get("/users/me");

        const result = response.data;

        const currentUser =
          result?.data?.user ??
          result?.data ??
          result?.user;

        if (
          !currentUser ||
          typeof currentUser.email !== "string" ||
          typeof currentUser.role !== "string"
        ) {
          throw new Error(
            "The server did not return a valid authenticated user."
          );
        }

        if (mounted) {
          dispatch(restoreUser(currentUser as User));
          setAuthenticated(true);
        }
      } catch (error) {
        console.warn(
          "Protected route: session verification failed.",
          error
        );

        if (mounted) {
          dispatch(clearAuthSession());
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    void checkAuthentication();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
