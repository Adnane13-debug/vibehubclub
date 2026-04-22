import { Link } from "react-router-dom";

/**
 * UpgradeCTA - Call to action card for visitors to join the club.
 */
function UpgradeCTA() {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-primary to-primary-hover p-8 text-slate-900 shadow-[0_20px_40px_rgba(245,159,10,0.25)] md:col-span-5">
      <div>
        <h3 className="font-heading text-2xl font-extrabold leading-tight">
          Elevate your curator journey.
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-900/80">
          Unlock exclusive digital assets, private curator channels, and
          early access to the VibeHub ecosystem.
        </p>
      </div>
      <Link
        to="/register"
        className="btn-primary mt-8 w-full justify-center rounded-full py-4 shadow-xl"
      >
        Join the Club
        <span className="material-symbols-outlined">arrow_forward</span>
      </Link>
    </div>
  );
}

export default UpgradeCTA;
