import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

/**
 * @param {{ children: React.ReactNode, roles?: string[] }} props
 */
function ProtectedRoute({ children, roles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'visiteur' && location.pathname === '/profile') {
    return <Navigate to="/visitor" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    if (user.role === 'visiteur') return <Navigate to="/visitor" replace />;
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default ProtectedRoute;
