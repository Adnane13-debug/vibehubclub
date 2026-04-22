import { Link } from "react-router-dom";

/**
 * Admin console footer with logo and quick-links.
 */
function AdminFooter() {
  return (
    <footer className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo vibe hub.svg"
            alt=""
            className="h-8 w-auto opacity-90"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">VibeHub Club</p>
            <p className="text-xs text-slate-500">Admin console · © 2024</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
          >
            Public site
          </Link>
          <Link
            to="/contact"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
          >
            Support
          </Link>
          <Link
            to="/events"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-primary"
          >
            Events
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default AdminFooter;
