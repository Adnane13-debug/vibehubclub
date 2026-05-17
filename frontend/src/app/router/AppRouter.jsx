import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollToTop";

import HomePage from "../../features/home/pages/HomePage";
import AboutPage from "../../features/about/pages/AboutPage";
import EventsPage from "../../features/events/pages/EventsPage";
import EventDetailsPage from "../../features/events/pages/EventDetailsPage";
import ContactPage from "../../features/contact/pages/ContactPage";
import LoginPage from "../../features/auth/pages/LoginPage";
// RegisterPage route disabled — public sign-up replaced by membership application flow
// import RegisterPage from "../../features/auth/pages/RegisterPage";
import ApplyPage from "../../features/apply/pages/ApplyPage";
import ProfilePage from "../../features/profile/pages/ProfilePage";
import AdminPage from "../../features/admin/pages/AdminPage";
import VisitorPage from "../../features/visitor/pages/VisitorPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visitor"
            element={
              <ProtectedRoute roles={["visiteur"]}>
                <VisitorPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          {/* RegisterPage route disabled — public sign-up replaced by membership application flow */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/apply" element={<ApplyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
