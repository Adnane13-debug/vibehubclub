import { useTranslation } from "react-i18next";

function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="container-custom section-padding">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* ── IMAGE COMPOSITION ────────────────────────────── */}
        <div className="relative">

          {/* Ambient glow — bottom left */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
          />

          {/* Dominant image — full width, taller */}
          <div
            className="group relative z-10 overflow-hidden rounded-2xl"
            style={{ aspectRatio: '4/3' }}
          >
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
              style={{
                backgroundImage:
                  "url('/about_main.png')",
              }}
              aria-hidden
            />
            {/* Subtle bottom fade */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Secondary image — offset bottom-right, smaller */}
          <div
            className="group absolute -bottom-6 -right-4 z-20 w-2/5 overflow-hidden rounded-xl shadow-lg md:-right-8"
          >
            <div
              className="aspect-square w-full bg-cover bg-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
              style={{
                backgroundImage:
                  "url('/about_secondary.png')",
              }}
              aria-hidden
            />
          </div>
        </div>

        {/* ── TEXT CONTENT ─────────────────────────────────── */}
        <div className="flex flex-col gap-6 pb-8 lg:pb-0">

          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary/80">
            <span aria-hidden className="inline-block h-px w-5 rounded-full bg-primary/50" />
            {t("about.eyebrow")}
          </span>

          {/* Title */}
          <h2 className="section-title max-w-sm leading-[1.1] tracking-tight">
            {t("about.title")}
          </h2>

          {/* Body copy */}
          <div className="flex flex-col gap-4">
            <p className="max-w-[48ch] text-base leading-[1.85] text-muted">
              {t("about.paragraph1")}
            </p>
            <p className="max-w-[48ch] text-base leading-[1.85] text-muted">
              {t("about.paragraph2")}
            </p>
          </div>

          {/* Stats row — small human detail */}
          <div className="mt-2 flex flex-wrap gap-6 border-t border-slate-100 pt-6 dark:border-white/[0.06]">
            <div>
              <p className="text-2xl font-black text-primary">{t("about.stat1Value")}</p>
              <p className="text-xs font-medium text-slate-400">{t("about.stat1Label")}</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">{t("about.stat2Value")}</p>
              <p className="text-xs font-medium text-slate-400">{t("about.stat2Label")}</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">{t("about.stat3Value")}</p>
              <p className="text-xs font-medium text-slate-400">{t("about.stat3Label")}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;