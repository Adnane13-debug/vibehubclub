import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950/98 py-14 text-white">
      <div className="container-custom grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/90 shadow-md shadow-primary/40">
              <span className="material-symbols-outlined text-slate-900">
                hub
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-xl font-black tracking-tight">
                VibeHub
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                University Club
              </span>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            The premier student-led organization for well-rounded university
            experiences.
          </p>
        </div>

        <div>
          <h5 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Quick Links
          </h5>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li>
              <Link className="transition-colors hover:text-white" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/events"
              >
                Our Activities
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/events"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/contact"
              >
                Member Benefits
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Support
          </h5>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li>
              <Link className="transition-colors hover:text-white" to="/contact">
                Help Center
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" to="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Newsletter
          </h5>
          <p className="mb-4 text-sm text-slate-400">
            Stay updated with our latest vibes.
          </p>
          <form
            className="flex gap-2"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter subscription"
          >
            <input
              className="w-full rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Your email"
              type="email"
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-slate-900 shadow-md shadow-primary/40 transition-transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </div>

      <div className="container-custom mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 md:flex-row md:text-[11px]">
        <p>
          © 2024 VibeHub Club. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            className="text-slate-500 transition-colors hover:text-white"
            href="#"
            aria-label="View our community"
          >
            <span className="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a
            className="text-slate-500 transition-colors hover:text-white"
            href="#"
            aria-label="Share"
          >
            <span className="material-symbols-outlined">share</span>
          </a>
          <a
            className="text-slate-500 transition-colors hover:text-white"
            href="#"
            aria-label="Email us"
          >
            <span className="material-symbols-outlined">alternate_email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;