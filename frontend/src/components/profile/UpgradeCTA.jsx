import { useTranslation } from "react-i18next";

/**
 * UpgradeCTA - Informational card for visitors whose membership application was approved.
 * Shows a static message — admin will upgrade their role to 'membre' later.
 */
function UpgradeCTA() {
  const { t } = useTranslation();

  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_16px_40px_rgb(0,0,0,0.2)]">
      {/* Subtle Background Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[80px] transition-all duration-700 group-hover:bg-primary/30" />
      
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400 ring-1 ring-inset ring-green-500/25 backdrop-blur-md">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          {t("upgradeCta.badge", "Visiteur Account Active")}
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {t("upgradeCta.title", "Awaiting Membership Upgrade")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {t("upgradeCta.body", "Your application has been approved and your account is active. A club admin will upgrade your access to full membership soon.")}
        </p>
      </div>
      
      <div className="relative z-10 mt-8">
        <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur-md">
          <span className="material-symbols-outlined text-[18px] text-green-400">verified</span>
          {t("upgradeCta.status", "Account active — upgrade pending")}
        </div>
      </div>
    </div>
  );
}

export default UpgradeCTA;
