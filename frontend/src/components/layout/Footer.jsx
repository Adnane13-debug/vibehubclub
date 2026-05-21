import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-950/98 py-14 text-white">
      <div className="container-custom grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-1 flex flex-col gap-6">
          <Link
            to="/"
            className="group flex w-fit items-center gap-3"
            aria-label="VibeHub Club home"
          >
            <img
              src="/logo vibe hub.svg"
              alt=""
              className="h-15 w-auto animate-floating-logo-slow drop-shadow-[0_0_12px_#f59f0a] transition-all duration-300 group-hover:drop-shadow-[0_0_24px_#f59f0a]"
            />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-xl font-black tracking-tight">
                VibeHub
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                {t("footer.universityClub")}
              </span>
            </div>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            {t("footer.subtitle")}
          </p>
        </div>

        <div>
          <h5 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t("footer.quickLinks")}
          </h5>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li>
              <Link className="transition-colors hover:text-white" to="/about">
                {t("footer.aboutUs")}
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/events"
              >
                {t("footer.ourActivities")}
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/events"
              >
                {t("footer.upcomingEvents")}
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/contact"
              >
                {t("footer.memberBenefits")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t("footer.support")}
          </h5>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li>
              <Link className="transition-colors hover:text-white" to="/contact">
                {t("footer.helpCenter")}
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-white" to="/contact">
                {t("footer.contactUs")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t("footer.stayConnected")}
          </h5>
          <p className="mb-4 text-sm text-slate-400">
            {t("footer.reachOut")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-slate-900 shadow-md shadow-primary/40 transition-transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            {t("footer.getInTouch")}
          </Link>
        </div>
      </div>

      <div className="container-custom mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 md:flex-row md:text-[11px]">
        <p>{t("footer.rights")}</p>
        <div className="flex gap-4">
          <Link
            className="text-slate-500 transition-colors hover:text-white"
            to="/about"
            aria-label="View our community"
          >
            <span className="material-symbols-outlined">social_leaderboard</span>
          </Link>
          <Link
            className="text-slate-500 transition-colors hover:text-white"
            to="/events"
            aria-label="Browse events"
          >
            <span className="material-symbols-outlined">share</span>
          </Link>
          <Link
            className="text-slate-500 transition-colors hover:text-white"
            to="/contact"
            aria-label="Email us"
          >
            <span className="material-symbols-outlined">alternate_email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
