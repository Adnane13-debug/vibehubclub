import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 backdrop-blur-xl">
      <div className="container-custom flex items-center justify-between py-4">
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
              University Club
            </span>
          </div>
        </Link>

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

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="btn-secondary h-10 px-5 text-xs font-semibold"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="btn-primary h-10 px-5 text-xs font-bold"
          >
            Join Club
          </Link>
        </div>

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

      {isOpen && (
        <div className="border-t border-slate-200/80 bg-background-light/95 backdrop-blur-md md:hidden">
          <div className="container-custom flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link block py-2 ${isActive ? "nav-link-active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                className="btn-secondary w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="btn-primary w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                Join Club
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
