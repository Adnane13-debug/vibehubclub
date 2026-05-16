import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const langs = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
  ];

  return (
    <div
      className="flex items-center rounded-lg border border-slate-200/80 bg-slate-50/80 p-0.5"
      role="group"
      aria-label="Language selector"
    >
      {langs.map((lang, idx) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`
            relative h-7 px-2.5 text-[11px] font-bold tracking-wide transition-all duration-200
            ${idx === 0 ? "rounded-l-[5px]" : "rounded-r-[5px]"}
            ${
              i18n.language === lang.code
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/60"
                : "text-slate-400 hover:text-slate-600"
            }
          `}
          aria-pressed={i18n.language === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();

  const navItems = [
    { to: "/", label: t("navbar.home") },
    { to: "/about", label: t("navbar.about") },
    { to: "/events", label: t("navbar.events") },
    { to: "/contact", label: t("navbar.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 backdrop-blur-xl">
      <div className="container-custom flex items-center justify-between py-4">

        {/* ── Logo ── */}
        <Link to="/" className="flex flex-shrink-0 items-center gap-3 group">
          <img
            src="/logo vibe hub.svg"
            alt="VibeHub Logo"
            className="h-12 w-auto transition-all duration-300 group-hover:animate-floating-logo drop-shadow-[0_0_12px_#f59f0a] group-hover:drop-shadow-[0_0_30px_#f59f0a]"
          />
          <div className="flex flex-col leading-none whitespace-nowrap overflow-hidden max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-[800ms] ease-out">
            <span className="font-heading text-xl font-black tracking-tight text-slate-900">
              VibeHub
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
              {t("navbar.universityClub")}
            </span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Desktop actions ── */}
        <div className="hidden items-center gap-2 md:flex">

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Soft divider */}
          <div
            aria-hidden
            className="mx-1.5 h-5 w-px bg-slate-200"
          />

          {/* Auth / profile */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn-secondary h-9 px-4 text-xs font-semibold"
              >
                {t("navbar.signIn")}
              </Link>
              <Link
                to="/register"
                className="btn-primary h-9 px-4 text-xs font-bold"
              >
                {t("navbar.createAccount")}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={user?.role === "admin" ? "/admin" : "/profile"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-slate-800 transition-all hover:bg-primary/25 hover:scale-105"
                title={user?.role === "admin" ? t("navbar.admin") : t("navbar.profile")}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {user?.role === "admin" ? "admin_panel_settings" : "account_circle"}
                </span>
              </Link>
              <button
                type="button"
                className="btn-secondary h-9 px-4 text-xs"
                onClick={() => logout()}
              >
                {t("navbar.logOut")}
              </button>
            </div>
          )}
        </div>

        {/* ── Mobile burger ── */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="material-symbols-outlined text-[22px]">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {isOpen && (
        <div className="border-t border-slate-200/80 bg-background-light/95 backdrop-blur-md md:hidden">
          <div className="container-custom flex flex-col gap-1 py-4">

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link block py-2.5 ${isActive ? "nav-link-active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Divider */}
            <div className="my-2 h-px bg-slate-100" aria-hidden />

            {/* Language + auth row */}
            <div className="flex items-center justify-between gap-3">
              <LanguageSwitcher />

              <div className="flex flex-1 flex-col gap-2">
                {!isAuthenticated ? (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      className="btn-secondary flex-1 justify-center text-xs"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("navbar.signIn")}
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary flex-1 justify-center text-xs"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("navbar.createAccount")}
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to={user?.role === "admin" ? "/admin" : "/profile"}
                      className="btn-primary flex-1 justify-center text-xs"
                      onClick={() => setIsOpen(false)}
                    >
                      {user?.role === "admin" ? t("navbar.admin") : t("navbar.profile")}
                    </Link>
                    <button
                      type="button"
                      className="btn-secondary flex-1 justify-center text-xs"
                      onClick={() => { logout(); setIsOpen(false); }}
                    >
                      {t("navbar.logOut")}
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;