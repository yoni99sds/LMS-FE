import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/features/auth/authSlice";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = params.get("token");
    const role = params.get("role");

    if (!token || !role) {
      navigate("/login");
      return;
    }

    dispatch(
      setCredentials({
        token,
        user: {
          role,
        },
      })
    );

    switch (role.toLowerCase()) {
      case "student":
        navigate("/dashboard/student");
        break;

      case "admin":
        navigate("/admin");
        break;

      case "instructor":
        navigate("/instructor");
        break;

      default:
        navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      Logging you in...
    </div>
  );
};

export default OAuthCallback;