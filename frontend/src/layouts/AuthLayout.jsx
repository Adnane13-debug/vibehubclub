import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function AuthLayout() {
  const { pathname } = useLocation();
  const isRegister = pathname === "/register";

  return (
    <>
      <Navbar />
      <main
        className={
          isRegister
            ? "min-h-[calc(100vh-4.5rem)] w-full"
            : "container-custom flex min-h-[calc(100vh-180px)] items-center justify-center py-12"
        }
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AuthLayout;
