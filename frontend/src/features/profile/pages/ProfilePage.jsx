import { Navigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import VisitorProfile from "../../../components/profile/VisitorProfile";
import MemberDashboard from "../../../components/profile/MemberDashboard";

function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user.role === "member") {
    return (
      <div className="container-custom section-padding">
        <MemberDashboard user={user} />
      </div>
    );
  }

  return (
    <div className="container-custom section-padding">
      <VisitorProfile user={user} />
    </div>
  );
}

export default ProfilePage;
