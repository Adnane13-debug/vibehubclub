import { useTranslation } from "react-i18next";
import { useRef, useCallback } from 'react';

import GlowCard from '../../../components/shared/GlowCard';

function AboutMissionSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-primary/5 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Section intro — connects to the page flow ── */}
        <div className="mb-12 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-primary opacity-60" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              {t("aboutMission.eyebrow")}
            </span>
          </div>
          <h2 className="font-heading max-w-xs text-3xl font-bold leading-tight tracking-tight text-slate-900">
            {t("aboutMission.title")}
          </h2>
        </div>

        {/* ── Cards ── */}
        <div className="grid gap-5 md:grid-cols-3">

          {/* Mission */}
          <GlowCard className="rounded-2xl border border-white/60 bg-white p-8 transition-shadow duration-300 hover:shadow-lg">
            {/* Icon — smaller, lighter, less dominant */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 2C5.5 2 3 5 3 8c0 2 1 3.5 2.5 4.5L9 16l3.5-3.5C14 11.5 15 10 15 8c0-3-2.5-6-6-6Z" stroke="#92400e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="8" r="1.5" fill="#92400e"/>
              </svg>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <h3 className="text-base font-bold text-slate-900">{t("aboutMission.missionTitle")}</h3>
              <p className="text-[0.9rem] leading-relaxed text-slate-500">
                {t("aboutMission.missionText")}
              </p>
            </div>
          </GlowCard>

          {/* Vision — slightly tinted bg, subtle differentiation */}
          <GlowCard className="rounded-2xl border border-primary/10 bg-primary/[0.07] p-8 transition-shadow duration-300 hover:shadow-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="3" stroke="#92400e" strokeWidth="1.6"/>
                <path d="M2 9c0-1.5 3.1-5 7-5s7 3.5 7 5-3.1 5-7 5-7-3.5-7-5Z" stroke="#92400e" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <h3 className="text-base font-bold text-slate-900">{t("aboutMission.visionTitle")}</h3>
              <p className="text-[0.9rem] leading-relaxed text-slate-500">
                {t("aboutMission.visionText")}
              </p>
            </div>
          </GlowCard>

          {/* Values — tags instead of bullet list */}
          <GlowCard className="rounded-2xl border border-white/60 bg-white p-8 transition-shadow duration-300 hover:shadow-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 2l1.8 3.8L15 6.8l-3 2.9.7 4.1L9 11.8l-3.7 2 .7-4.1L3 6.8l4.2-.9L9 2Z" stroke="#92400e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <h3 className="text-base font-bold text-slate-900">{t("aboutMission.valuesTitle")}</h3>
              {/* Tag-style values — cleaner than bullet list */}
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const vals = t("aboutMission.values", { returnObjects: true }) || ["Inclusion", "Creativity", "Resilience", "Community"];
                  const validVals = Array.isArray(vals) ? vals : ["Inclusion", "Creativity", "Resilience", "Community"];
                  return validVals.map((v) => (
                  <span
                    key={v}
                    className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {v}
                  </span>
                ))})()}
              </div>
              <p className="text-[0.9rem] leading-relaxed text-slate-500">
                {t("aboutMission.valuesText")}
              </p>
            </div>
          </GlowCard>

        </div>
      </div>
    </section>
  );
}

export default AboutMissionSection;