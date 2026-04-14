import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  const goAfterLogin = (role) => {
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  };

  const handleRoleLogin = (role) => {
    login(role);
    goAfterLogin(role);
  };

  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 font-heading text-3xl font-bold text-slate-900">
        Sign in (demo)
      </h1>
      <p className="mb-8 text-sm text-slate-600">
        Fake authentication — pick a role to load the matching UI. No API calls.
      </p>

      {isAuthenticated && user && (
        <p className="mb-6 rounded-xl bg-primary/10 px-4 py-3 text-sm text-slate-800">
          Signed in as <strong>{user.role}</strong>.{" "}
          <button
            type="button"
            className="font-semibold text-primary underline"
            onClick={() =>
              user.role === "admin"
                ? navigate("/admin")
                : navigate("/profile")
            }
          >
            Go to dashboard
          </button>
        </p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="btn-secondary w-full justify-center"
          onClick={() => handleRoleLogin("visitor")}
        >
          Login as Visitor
        </button>
        <button
          type="button"
          className="btn-secondary w-full justify-center"
          onClick={() => handleRoleLogin("member")}
        >
          Login as Member
        </button>
        <button
          type="button"
          className="btn-primary w-full justify-center"
          onClick={() => handleRoleLogin("admin")}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
