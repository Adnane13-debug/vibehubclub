import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

/**
 * @param {{ children: React.ReactNode, roles?: string[] }} props
 */
function ProtectedRoute({ children, roles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default ProtectedRoute;
