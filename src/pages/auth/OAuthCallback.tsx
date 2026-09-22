import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const role = params.get("role");

        // Make sure Google OAuth returned a role
        if (!role) {
          navigate(
            "/login?error=oauth_failed",
            { replace: true }
          );
          return;
        }

        /*
         * IMPORTANT:
         *
         * We do NOT read a token from the URL.
         *
         * The browser automatically sends the
         * httpOnly accessToken cookie to the backend.
         */
        const response = await fetch(
          `${API_URL}/users/me`,
          {
            method: "GET",

            // This is critical.
            // It allows the browser to send cookies.
            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Authentication failed: ${response.status}`
          );
        }

        const result = await response.json();

        /*
         * Depending on your API response structure,
         * support both:
         *
         * result.data.user
         * result.user
         */
        const user =
          result?.data?.user ||
          result?.user;

        if (!user) {
          throw new Error(
            "User information was not returned"
          );
        }

        /*
         * Authentication succeeded.
         *
         * The role from the backend user is preferred
         * over the URL role.
         */
        const authenticatedRole =
          user.role || role;

        switch (
          authenticatedRole.toLowerCase()
        ) {
          case "student":
            navigate(
              "/dashboard/student",
              { replace: true }
            );
            break;

          case "admin":
            navigate(
              "/admin",
              { replace: true }
            );
            break;

          case "instructor":
            navigate(
              "/instructor",
              { replace: true }
            );
            break;

          default:
            navigate(
              "/",
              { replace: true }
            );
        }
      } catch (error) {
        console.error(
          "Google OAuth callback error:",
          error
        );

        navigate(
          "/login?error=oauth_failed",
          { replace: true }
        );
      }
    };

    authenticateUser();
  }, [navigate, params]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
        </div>

        <p className="text-sm text-muted-foreground">
          Logging you in...
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;