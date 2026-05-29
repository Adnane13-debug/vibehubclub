import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GlowCard from "../../../components/shared/GlowCard";

function AboutCtaSection() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-[1px]">
        {/* Soft border via gradient wrapper */}
        <GlowCard className="rounded-3xl bg-gradient-to-br from-white/80 via-primary/[0.04] to-white/60 px-10 py-10 md:px-20 md:py-14 backdrop-blur-sm">

          {/* Subtle ambient glow — top right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
          />
          {/* Subtle ambient glow — bottom left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-primary/8 blur-2xl"
          />

          <div className="relative z-10">
            {/* Eyebrow label */}
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary/80">
              Students first
            </span>

            <h2 className="mb-3 text-3xl font-black leading-tight tracking-tight md:text-[2.6rem]">
              Your people are already here.
            </h2>

            <p className="mx-auto mb-7 max-w-md text-base leading-relaxed text-slate-500">
              Hundreds of students found their crew, their projects, and their
              confidence through this platform. Your story starts the same way — just show up.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Primary CTA — dominant */}
              <Link
                to="/apply"
                className="group relative w-full overflow-hidden rounded-xl bg-primary px-9 py-3.5 text-sm font-bold text-background-dark shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-105 active:scale-[0.98] sm:w-auto"
              >
                <span className="relative z-10">{t("aboutCta.getStarted")}</span>
              </Link>

              {/* Secondary CTA — calm, subordinate */}
              <Link
                to="/contact"
                className="w-full rounded-xl px-9 py-3.5 text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-primary sm:w-auto"
              >
                {t("aboutCta.talkToUs")} →
              </Link>
            </div>

            {/* Social proof whisper */}
            <p className="mt-5 text-xs text-slate-400">
              No credit card. No pressure. Just your campus, better.
            </p>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}

export default AboutCtaSection;