import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const role = params.get("role");

        console.log(
          "=================================================="
        );

        console.log(
          "🔐 GOOGLE OAUTH FRONTEND CALLBACK"
        );

        console.log(
          "Role from URL:",
          role
        );

        console.log(
          "API URL:",
          API_URL
        );

        console.log(
          "=================================================="
        );

        // ====================================================
        // CHECK ROLE
        // ====================================================

        if (!role) {
          console.error(
            "❌ No role returned from OAuth callback"
          );

          navigate(
            "/login?error=oauth_failed",
            {
              replace: true,
            }
          );

          return;
        }

        // ====================================================
        // GET AUTHENTICATED USER
        // ====================================================

        console.log(
          "🔎 Requesting authenticated user..."
        );

        const response = await fetch(
          `${API_URL}/users/me`,
          {
            method: "GET",

            // VERY IMPORTANT:
            // This allows the browser to send the
            // httpOnly accessToken cookie to Render.
            credentials: "include",

            headers: {
              Accept:
                "application/json",
            },
          }
        );

        console.log(
          "📡 /users/me status:",
          response.status
        );

        console.log(
          "📡 /users/me response OK:",
          response.ok
        );

        // ====================================================
        // READ RESPONSE
        // ====================================================

        const responseText =
          await response.text();

        console.log(
          "📡 /users/me response:",
          responseText
        );

        if (!response.ok) {
          throw new Error(
            `Authentication failed with status ${response.status}: ${responseText}`
          );
        }

        // ====================================================
        // PARSE RESPONSE
        // ====================================================

        let result;

        try {
          result =
            JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned an invalid JSON response."
          );
        }

        console.log(
          "✅ /users/me parsed response:",
          result
        );

        // ====================================================
        // GET USER
        // ====================================================

        const user =
          result?.data?.user ||
          result?.data ||
          result?.user;

        if (!user) {
          console.error(
            "❌ User information was not returned"
          );

          throw new Error(
            "User information was not returned by the backend."
          );
        }

        console.log(
          "✅ AUTHENTICATED USER:",
          user
        );

        // ====================================================
        // DETERMINE ROLE
        // ====================================================

        const authenticatedRole =
          user.role || role;

        console.log(
          "👤 Authenticated role:",
          authenticatedRole
        );

        // ====================================================
        // REDIRECT
        // ====================================================

        switch (
          authenticatedRole.toLowerCase()
        ) {
          case "student":
            console.log(
              "🎓 Redirecting to student dashboard..."
            );

            navigate(
              "/dashboard/student",
              {
                replace: true,
              }
            );

            break;

          case "admin":
            console.log(
              "👑 Redirecting to admin dashboard..."
            );

            navigate(
              "/admin",
              {
                replace: true,
              }
            );

            break;

          case "instructor":
            console.log(
              "👨‍🏫 Redirecting to instructor dashboard..."
            );

            navigate(
              "/instructor",
              {
                replace: true,
              }
            );

            break;

          default:
            console.error(
              "❌ Unknown user role:",
              authenticatedRole
            );

            navigate(
              "/",
              {
                replace: true,
              }
            );
        }
      } catch (err) {
        console.error(
          "❌ Google OAuth callback error:",
          err
        );

        const message =
          err instanceof Error
            ? err.message
            : "Google authentication failed.";

        setError(message);

        // Give the browser console time to show
        // the diagnostic information before redirecting.
        setTimeout(() => {
          navigate(
            "/login?error=oauth_failed",
            {
              replace: true,
            }
          );
        }, 1500);
      }
    };

    authenticateUser();
  }, [navigate, params]);

  // ==========================================================
  // ERROR UI
  // ==========================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-4 text-red-500">
            Authentication failed
          </div>

          <p className="text-sm text-muted-foreground">
            {error}
          </p>

          <p className="mt-4 text-xs text-muted-foreground">
            Redirecting you back to login...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // LOADING UI
  // ==========================================================

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