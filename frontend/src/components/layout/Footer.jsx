function Footer() {
  return (
    <footer className="bg-slate-900 px-6 py-16 text-white lg:px-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-1.5">
              <span className="material-symbols-outlined text-slate-900">
                hub
              </span>
            </div>
            <h2 className="font-heading text-2xl font-black tracking-tight">
              VibeHub
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            The premier student-led organization for well-rounded university
            experiences.
          </p>
        </div>

        <div>
          <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
            Quick Links
          </h5>
          <ul className="flex flex-col gap-4 text-sm text-slate-400">
            <li>
              <a className="transition-colors hover:text-white" href="#">
                About Us
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#">
                Our Activities
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#">
                Upcoming Events
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#">
                Member Benefits
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
            Support
          </h5>
          <ul className="flex flex-col gap-4 text-sm text-slate-400">
            <li>
              <a className="transition-colors hover:text-white" href="#">
                Help Center
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-white" href="#">
                Contact Us
              </a>
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
          <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
            Newsletter
          </h5>
          <p className="mb-4 text-sm text-slate-400">
            Stay updated with our latest vibes.
          </p>
          <div className="flex gap-2">
            <input
              className="w-full rounded-lg border-none bg-slate-800 text-sm"
              placeholder="Your email"
              type="email"
            />
            <button className="rounded-lg bg-primary px-4 py-2 text-slate-900">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
        <p className="text-xs text-slate-500">
          © 2024 VibeHub Club. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a className="text-slate-500 transition-colors hover:text-white" href="#">
            <span className="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a className="text-slate-500 transition-colors hover:text-white" href="#">
            <span className="material-symbols-outlined">share</span>
          </a>
          <a className="text-slate-500 transition-colors hover:text-white" href="#">
            <span className="material-symbols-outlined">alternate_email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;