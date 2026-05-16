import { useTranslation } from "react-i18next";
function AboutStorySection() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* ══════════════════════════
            LEFT — Text
        ══════════════════════════ */}
        <div className="flex flex-col gap-6">

          {/* Eyebrow — same system as existing badge, cleaner */}
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-primary opacity-60" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              {t("aboutStory.eyebrow")}
            </span>
          </div>

          {/* Heading — clean hierarchy, primary accent on key phrase */}
          <h2 className="font-heading max-w-sm text-4xl leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
            {t("aboutStory.title")}
            <span className="text-primary">{t("aboutStory.titleAccent")}</span>
          </h2>

          {/* Body — authentic student voice, not corporate */}
          <div className="flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-slate-500">
            <p>
              {t("aboutStory.paragraph1")}
            </p>
            <p>
              {t("aboutStory.paragraph2")}
            </p>
          </div>

          {/* Stats — typographic, inline, not cards */}
          <div className="mt-2 flex items-stretch divide-x divide-slate-200 border-t border-slate-100 pt-8">
            {[
              { value: t("aboutStory.stat1Value"), label: t("aboutStory.stat1Label") },
              { value: t("aboutStory.stat2Value"),  label: t("aboutStory.stat2Label") },
              { value: t("aboutStory.stat3Value"),    label: t("aboutStory.stat3Label")   },
            ].map(({ value, label }, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${i === 0 ? "pr-8" : "px-8"}`}
              >
                <span className="font-heading text-3xl font-black leading-none tracking-tight text-slate-900">
                  {value}
                </span>
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════
            RIGHT — Image grid
            Two columns, right col offset
            down by pt-8 — subtle asymmetry,
            no rotations, no drama.
        ══════════════════════════ */}
        <div className="grid grid-cols-2 items-start gap-3">

          {/* Left column */}
          <div className="flex flex-col gap-3">
            <div className="group overflow-hidden rounded-2xl bg-slate-100">
              <div className="aspect-square overflow-hidden">
                <img
                  alt="Students at a sports activity"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Ltr3m2cTbd-jeFFSIZt_qU_XnA_1Mre9d9sxMUyHbEYm02wVQhnd3rJkIlDaoRVemjt5GNuuZd69HfCIY87fvqB6wW_L6f0jInMLa0DmduNAplFQ8Cm0EQ45DzKyjOChS6UU15T8gY_qLyNfZyH7WthqvUabKQ_eehRGeIHZL4tPO8sONa7eMXSuLQ5zFiaJUjvCqRvvz9LJ0WIcyI3nR9pl03nMEo3Yox97kqXGaWSCWHKiMyUvwAR-f3CqmpI1baZaqtjQaIvt"
                />
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl bg-slate-100">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt="Student workshop session"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcvYr9xtYyO6aFjU8-VL0TJxHsFNM1L9I2eu8KzrOQc8R0GxyIdrn5VcwHj6Ibuv9Y33slvvjrLDgxIsLgVUxRidJb2KGuwELPBndMdtEjIpgrCzGEQDQIdj5WnK6dQ2tg1OCFZjrWJUZq24kCeCUdkoZmJxk--hgtg_OQ6mqfgh8ZGAwVVgmNloeBk3gluWc46QLXJc-BMOBuSxHX05pCUE5WhrFIvlOUbbxi9F90rS0Sh0uL-VujVxOxfdmm9TaxHr3SRZ3fOAcQ"
                />
              </div>
            </div>
          </div>

          {/* Right column — offset top */}
          <div className="flex flex-col gap-3 pt-8">
            <div className="group overflow-hidden rounded-2xl bg-slate-100">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  alt="Cultural event on campus"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqK6CY-kQVxWJJGv_eXNO3xcBU2c8VWXctImpXiU3cL6XF8bnLo4zlOGhVOuzhVXYV2VSuK02ol5fVJu7ZC8Xg0T9yxxxIDT3UTupFcQtVqPG3LlqPb8JV8s1Vxxer-WS09rlFEpByLzNgYFr8XviHO_W_Y-vGu4FVEC_mrgwkRO_suUATstO5SbCfYR9oecK9qieeGNFyfD1AlzsAXj8PqJavxdMzlyBOnke-PzOKhrV6WlW1a2fLrYWCAw8W10GXQT3YjO_36TEm"
                />
              </div>
            </div>

            {/* Membership tag — minimal, functional, fits the UI system */}
            <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
              <div>
                <p className="text-xs font-bold text-slate-700">
                  {t("aboutStory.membershipOpen")}
                </p>
                <p className="text-[11px] text-slate-400">
                  {t("aboutStory.joinForFree")} · 2024
                </p>
              </div>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20"
                aria-hidden="true"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="#92400e"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutStorySection;