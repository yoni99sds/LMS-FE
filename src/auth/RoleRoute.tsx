import { useAppSelector } from "@/hooks/redux";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }: any) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;