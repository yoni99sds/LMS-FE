import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "/api/v1";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        /*
        |--------------------------------------------------------------------------
        | GOOGLE OAUTH CALLBACK
        |--------------------------------------------------------------------------
        */

        const roleFromUrl = params.get("role");

        /*
        |--------------------------------------------------------------------------
        | GET AUTHENTICATED USER
        |--------------------------------------------------------------------------
        |
        | We do NOT trust the role in the URL for authentication.
        |
        | The backend has already placed the JWT inside the
        | httpOnly accessToken cookie.
        |
        | /users/me reads that cookie and returns the actual
        | authenticated user.
        |
        */

        const response = await fetch(
          `${API_URL}/users/me`,
          {
            method: "GET",

            /*
             * Allows the browser to send the
             * httpOnly authentication cookie.
             */
            credentials: "include",

            headers: {
              Accept: "application/json",
            },
          }
        );

        /*
        |--------------------------------------------------------------------------
        | READ RESPONSE
        |--------------------------------------------------------------------------
        */

        const responseText =
          await response.text();

        /*
        |--------------------------------------------------------------------------
        | CHECK RESPONSE
        |--------------------------------------------------------------------------
        */

        if (!response.ok) {
          throw new Error(
            `Authentication failed (${response.status}): ${responseText}`
          );
        }

        /*
        |--------------------------------------------------------------------------
        | PARSE JSON
        |--------------------------------------------------------------------------
        */

        let result: unknown;

        try {
          result =
            JSON.parse(responseText);
        } catch {
          throw new Error(
            "Invalid JSON returned by /users/me"
          );
        }

        /*
        |--------------------------------------------------------------------------
        | GET USER FROM RESPONSE
        |--------------------------------------------------------------------------
        |
        | Depending on your controller response structure,
        | the user could be located in:
        |
        | data.user
        | data
        | user
        |
        */

        const responseData =
          result as {
            data?: {
              user?: {
                role?: string;
                email?: string;
                _id?: string;
                id?: string;
              };
              role?: string;
              email?: string;
              _id?: string;
              id?: string;
            };
            user?: {
              role?: string;
              email?: string;
              _id?: string;
              id?: string;
            };
          };

        const user =
          responseData?.data?.user ||
          responseData?.data ||
          responseData?.user;

        /*
        |--------------------------------------------------------------------------
        | CHECK USER
        |--------------------------------------------------------------------------
        */

        if (!user) {
          throw new Error(
            "User information was not returned by the server."
          );
        }

        /*
        |--------------------------------------------------------------------------
        | DETERMINE AUTHENTICATED ROLE
        |--------------------------------------------------------------------------
        |
        | IMPORTANT:
        |
        | We use user.role returned by the backend.
        |
        | The role query parameter is only a fallback.
        |
        */

        const authenticatedRole = (
          user.role ||
          roleFromUrl ||
          ""
        )
          .toString()
          .trim()
          .toLowerCase();

        /*
        |--------------------------------------------------------------------------
        | STUDENT
        |--------------------------------------------------------------------------
        */

        if (
          authenticatedRole ===
          "student"
        ) {
          navigate(
            "/dashboard/student",
            {
              replace: true,
            }
          );

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */

        if (
          authenticatedRole ===
          "admin"
        ) {
          navigate(
            "/admin",
            {
              replace: true,
            }
          );

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | INSTRUCTOR
        |--------------------------------------------------------------------------
        */

        if (
          authenticatedRole ===
          "instructor"
        ) {
          navigate(
            "/instructor/dashboard",
            {
              replace: true,
            }
          );

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | UNKNOWN ROLE
        |--------------------------------------------------------------------------
        */

        throw new Error(
          `Unknown user role: ${
            user.role || "missing"
          }`
        );
      } catch (err) {
        /*
        |--------------------------------------------------------------------------
        | ERROR HANDLING
        |--------------------------------------------------------------------------
        */

        const message =
          err instanceof Error
            ? err.message
            : "Google authentication failed.";

        setError(message);

        /*
        |--------------------------------------------------------------------------
        | REDIRECT TO LOGIN
        |--------------------------------------------------------------------------
        */

        setTimeout(() => {
          navigate(
            "/login?error=oauth_failed",
            {
              replace: true,
            }
          );
        }, 3000);
      }
    };

    authenticateUser();
  }, [navigate, params]);

  /*
  |--------------------------------------------------------------------------
  | ERROR UI
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h2 className="mb-3 text-lg font-semibold">
            Authentication failed
          </h2>

          <p className="text-sm text-muted-foreground break-words">
            {error}
          </p>

          <p className="mt-4 text-xs text-muted-foreground">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
        </div>

        <p className="text-sm text-muted-foreground">
          Logging you in...
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Please wait while we verify your account.
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
