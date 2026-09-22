import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "/api/v1";

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
          "Role:",
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
            "❌ OAuth role is missing"
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
        // GET CURRENT USER
        // ====================================================

        console.log(
          "🔎 Requesting authenticated user..."
        );

        const response = await fetch(
          `${API_URL}/users/me`,
          {
            method: "GET",

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

        const responseText =
          await response.text();

        console.log(
          "📡 /users/me response:",
          responseText
        );

        if (!response.ok) {
          throw new Error(
            `Authentication failed (${response.status}): ${responseText}`
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
            "Invalid JSON returned by /users/me"
          );
        }

        console.log(
          "✅ User response:",
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
          throw new Error(
            "User information was not returned."
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
              "🎓 Redirecting to student dashboard"
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
              "👑 Redirecting to admin dashboard"
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
              "👨‍🏫 Redirecting to instructor dashboard"
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
              "❌ Unknown role:",
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
          "❌ OAuth callback error:",
          err
        );

        const message =
          err instanceof Error
            ? err.message
            : "Google authentication failed.";

        setError(message);

        setTimeout(() => {
          navigate(
            "/login?error=oauth_failed",
            {
              replace: true,
            }
          );
        }, 2000);
      }
    };

    authenticateUser();
  }, [navigate, params]);

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h2 className="mb-3 text-lg font-semibold">
            Authentication failed
          </h2>

          <p className="text-sm text-muted-foreground">
            {error}
          </p>

          <p className="mt-4 text-xs text-muted-foreground">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // LOADING
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