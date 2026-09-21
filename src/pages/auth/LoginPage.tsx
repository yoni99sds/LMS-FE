import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { login, googleLoginRedirect } from "@/api/auth.api";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/features/auth/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  // =========================
  // EMAIL LOGIN
  // =========================
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await login(payload);

      const user = res.data.data.user;
      const token = res.data.token || res.data.accessToken;

      dispatch(setCredentials({ user, token }));

      toast.success("Login successful");

      const role = user.role?.toLowerCase();

      if (role === "student") navigate("/dashboard/student");
      else if (role === "admin") navigate("/admin");
      else if (role === "instructor") navigate("/instructor");
      else navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN REDIRECT
  // =========================
  const handleGoogleLogin = () => {
    googleLoginRedirect();
  };

  // =========================
  // GOOGLE ERROR HANDLING
  // =========================
  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "user_not_found") {
      toast.error(
        "No account exists for this Google email. Please register first."
      );
    }

    if (error === "oauth_failed") {
      toast.error("Google login failed. Please try again.");
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      {/* GOOGLE BUTTON (ICON ONLY) */}
      <div className="flex justify-center">
        <button
          onClick={handleGoogleLogin}
          className="p-3 rounded-full border hover:bg-muted transition"
        >
          <FcGoogle className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        or continue with email
      </div>

      {/* EMAIL LOGIN */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4" />
            <Input name="email" type="email" className="pl-10" required />
          </div>
        </div>

        <div>
          <Label>Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4" />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>

      <p className="text-center text-sm">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;