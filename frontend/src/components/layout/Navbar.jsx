import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background-light/80 px-6 py-4 backdrop-blur-md lg:px-20">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-1.5">
            <span className="material-symbols-outlined text-slate-900">hub</span>
          </div>
          <h2 className="font-heading text-2xl font-black tracking-tight text-slate-900">
            VibeHub
          </h2>
        </div>

        <nav className="hidden items-center gap-10 md:flex">
          <Link
            className="text-sm font-semibold transition-colors hover:text-primary"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-semibold transition-colors hover:text-primary"
            to="/about"
          >
            About
          </Link>
          <Link
            className="text-sm font-semibold transition-colors hover:text-primary"
            to="/events"
          >
            Events
          </Link>
          <Link
            className="text-sm font-semibold transition-colors hover:text-primary"
            to="/contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/register"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-primary/80"
          >
            Join Club
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;