import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as fakeAuth from "./fakeAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => fakeAuth.getCurrentUser());

  const login = useCallback((role) => {
    const next = fakeAuth.login(role);
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    fakeAuth.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? null,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
