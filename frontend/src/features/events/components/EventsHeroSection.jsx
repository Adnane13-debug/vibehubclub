import { useTranslation } from "react-i18next";
function EventsHeroSection() {
  const { t } = useTranslation();
  return (
    <div className="relative mb-12 overflow-hidden">

      {/* Subtle warm ambient glow — top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-2xl">

        {/* Eyebrow */}
        <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary/80">
          <span
            aria-hidden
            className="inline-block h-px w-5 bg-primary/50 rounded-full"
          />
          {t("eventsHero.eyebrow")}
        </span>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
          {t("eventsHero.title1")}
          <br />
          <span className="text-primary">{t("eventsHero.title2")}</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-lg text-base leading-relaxed text-slate-500">
          {t("eventsHero.subtitle")}
        </p>
      </div>
    </div>
  );
}

export default EventsHeroSection;