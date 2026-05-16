import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// ─── SVG grain overlay — kills sterile feel, adds paper warmth ───────────
function GrainTexture() {
  const { t } = useTranslation();
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]"
      aria-hidden="true"
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// ─── Imperfect hand-drawn double-stroke underline ─────────────────────────
function HandUnderline() {
  return (
    <svg
      viewBox="0 0 340 12"
      fill="none"
      className="absolute -bottom-2 left-0 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Primary stroke — slightly wavy */}
      <path
        d="M2 8.5 C 50 4, 110 9.5, 170 7 S 270 3, 338 7.5"
        stroke="#F59E0B"
        strokeWidth="2.8"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Second ghost pass — makes it feel hand-made */}
      <path
        d="M8 9.8 C 65 6.5, 130 10.5, 195 8 S 285 5.5, 336 9"
        stroke="#F59E0B"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.30"
      />
    </svg>
  );
}

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <>
      <GrainTexture />

      {/*
        bg-[#F8F7F3] — warm off-white, not cold paper-white.
        Gives the page a magazine-print premium feel.
      */}
      <section
        className="relative min-h-[92vh] overflow-hidden bg-[#F8F7F3]"
        aria-labelledby="hero-heading"
      >
        {/* ── Ambient atmosphere blobs ── */}
        <div
          className="pointer-events-none absolute -left-[15%] -top-[10%] h-[520px] w-[520px] rounded-full bg-amber-100/70 blur-[96px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[0%] top-[15%] h-[400px] w-[400px] rounded-full bg-amber-50/90 blur-[80px]"
          aria-hidden="true"
        />

        {/* ── Layout grid ── */}
        <div className="container-custom relative z-10 grid min-h-[92vh] grid-cols-1 items-center gap-0 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px]">

          {/* ══════════════════════════════════
              LEFT — Text column
          ══════════════════════════════════ */}
          <div className="flex flex-col gap-7 pb-16 pt-28 lg:py-28 lg:pr-8">

            {/* ── Eyebrow — typographic, not pill-shaped ── */}
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-px w-8 bg-amber-400"
                aria-hidden="true"
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {t("hero.eyebrow")}
              </span>
            </div>

            {/* ── Heading — asymmetric scale cascade, no italic ──
                Design logic:
                  Line 1: mid-size, airy — "Connect,"
                  Line 2: smaller, recessed color — "Create &" (the & in amber)
                  Line 3: oversized, dominant, underlined — "{t("hero.title3")}"
                  Line 4: light weight brand name — breathing room below
                The size cascade creates rhythm without needing italic.
            ── */}
            <h1
              id="hero-heading"
              className="font-heading text-slate-900"
              style={{ maxWidth: "560px" }}
            >
              <span className="block text-[2.7rem] leading-[1.06] tracking-[-0.015em] md:text-[3.4rem]">
                {t("hero.title1")}
              </span>

              <span className="block text-[2.1rem] leading-[1.12] tracking-[-0.01em] text-slate-500 md:text-[2.55rem]">
                {t("hero.title2")}{" "}
                <span className="font-heading text-amber-400">&amp;</span>
              </span>

              <span className="relative mt-0.5 inline-block text-[3.6rem] leading-[1.0] tracking-[-0.035em] md:text-[4.6rem]">
                {t("hero.title3")}
                <HandUnderline />
              </span>

              <span className="mt-3 block text-[1.25rem] font-medium leading-none tracking-[-0.01em] text-slate-400 md:text-[1.5rem]">
                {t("hero.title4")}
              </span>
            </h1>

            {/* ── Body copy — authentic student voice, no corporate boilerplate ── */}
            <p
              className="text-[0.9375rem] leading-[1.8] text-slate-500"
              style={{ maxWidth: "390px" }}
            >
              {t("hero.subtitle")}
            </p>

            {/* ── Inline stats — typographic, not cards ── */}
            <div className="flex items-baseline gap-7">
              <div>
                <span className="font-heading text-[1.55rem] font-black leading-none text-slate-900">
                  1.2k
                </span>
                <span className="ml-1.5 text-[11px] text-slate-400">
                  members
                </span>
              </div>
              <span
                className="h-3 w-px self-center bg-slate-200"
                aria-hidden="true"
              />
              <div>
                <span className="font-heading text-[1.55rem] font-black leading-none text-slate-900">
                  48
                </span>
                <span className="ml-1.5 text-[11px] text-slate-400">
                  events this year
                </span>
              </div>
              <span
                className="h-3 w-px self-center bg-slate-200"
                aria-hidden="true"
              />
              <div>
                <span className="font-heading text-[1.55rem] font-black leading-none text-amber-500">
                  ↑12%
                </span>
                <span className="ml-1.5 text-[11px] text-slate-400">
                  this semester
                </span>
              </div>
            </div>

            {/* ── CTAs ── */}
            <div className="flex flex-wrap items-center gap-5 pt-1">
              {/* Primary — amber, confident, warm shadow */}
              <Link
                to="/events"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-amber-400 px-7 py-3.5 text-[0.875rem] font-bold text-slate-900 shadow-[0_2px_18px_rgba(245,158,11,0.38)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-amber-500 hover:shadow-[0_6px_28px_rgba(245,158,11,0.48)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                {/* Shine sweep */}
                <span
                  className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"
                  aria-hidden="true"
                />
                <span className="relative">{t("hero.exploreEvents")}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Secondary — pure text link, no box, confident typographic weight */}
              <Link
                to="/register"
                className="group inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-slate-500 transition-colors duration-200 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400"
              >
                {t("hero.joinMember")}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  className="opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-80"
                  aria-hidden="true"
                >
                  <path
                    d="M1.5 6.5h10M7 2.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ══════════════════════════════════
              RIGHT — Image column
              Bleeds top & bottom — intentionally breaks the grid box,
              makes the layout feel art-directed not generated.
          ══════════════════════════════════ */}
          <div className="relative hidden lg:block lg:self-stretch">

            {/* Slight rotation on the frame, not the image — editorial tilt */}
            <div
              className="absolute overflow-hidden rounded-2xl"
              style={{
                top: "0%",
                bottom: "-3%",
                left: "0",
                right: "-4%",
                transform: "rotate(-0.7deg) scale(1.01)",
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASyQpEr7qZGiz-2-ZsHJJZ2DIRY5kmBt9bNWi7WO5OZLQYn1TQL8kTuy8Kcbd1bFAPARinXSqINQOcS7qAm5H4zmwXpPlMGAVmiBetBGNJNSOgggwuLt2-hJDn9WbIhm3nGgwx85rMTsmg2WAsE7aLehOxtcck_odF39SZ8W0HrB75mzz_XHWChiAfUYVyDhRr1MpC-an7chvMBDsEUIxtvGeIEcLGQaqPY4hLe5Sm8jtjvP2xh3nH65qdaYKoVOUw90Ac44ysgZEr"
                alt="VibeHub members collaborating on campus"
                className="h-full w-full object-cover object-[center_12%]"
              />

              {/* Warm amber wash — makes the stock photo feel ownable */}
              <div
                className="absolute inset-0 bg-amber-500/[0.07] mix-blend-multiply"
                aria-hidden="true"
              />

              {/* Bottom gradient — image melts into page bg */}
              <div
                className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F8F7F3]/85 to-transparent"
                aria-hidden="true"
              />

              {/* Left-edge gradient — text bleeds into image softly */}
              <div
                className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8F7F3]/40 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* ── Single social-proof element — purposeful, slightly rotated ──
                One card only. Positioned off the image edge for depth.
                Slight negative rotation = human, not template.
            ── */}
            <div
              className="absolute bottom-16 -left-6 z-10 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/92 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.09)] backdrop-blur-md"
              style={{ transform: "rotate(-1.4deg)" }}
              aria-label={`${t("hero.joinedWeek")}, ${t("hero.membershipOpen")}`}
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2.5" aria-hidden="true">
                {["bg-amber-400", "bg-slate-200", "bg-amber-200"].map(
                  (bg, i) => (
                    <div
                      key={i}
                      className={`h-7 w-7 rounded-full border-2 border-white ${bg}`}
                    />
                  )
                )}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] font-bold text-slate-800">
                  {t("hero.joinedWeek")}
                </span>
                <span className="text-[10px] text-slate-400">
                  {t("hero.membershipOpen")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section bottom fade ── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8F7F3] to-transparent"
          aria-hidden="true"
        />
      </section>
    </>
  );
}