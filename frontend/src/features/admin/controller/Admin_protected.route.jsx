import { Navigate, Outlet } from "react-router-dom";
import { useAuth_context } from "../../auth/context/Auth.context.js";

export default function Admin_protected_route({ allowed_roles }) {
  const { user, loading } = useAuth_context();

  if (loading) {
    return <div>Checking access...</div>;
  }
  if (!user) {
    return <Navigate to="/admin/login" />;
  }
  if (!allowed_roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
