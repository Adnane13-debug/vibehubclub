import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function EventsFeaturedSection() {
  const { t } = useTranslation();

  return (
    <div className="relative mt-20 overflow-hidden rounded-2xl">

      {/* Warm ambient glow behind the whole block */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative grid grid-cols-1 gap-0 md:grid-cols-5">

        {/* ── IMAGE SIDE (3 cols) ─────────────────────────── */}
        <div className="group relative h-72 overflow-hidden rounded-t-2xl md:col-span-3 md:h-auto md:rounded-l-2xl md:rounded-tr-none">

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQUibfn6WeZlf_XPzrochXs3zTuOLNovEDqaxSbt9lQM_mFRXx0uwEjJtrLcEZ3yM-W2gUVqCS3_n7e9RF_jh67gUE8B6DKsn3tCJbbhsIJFfH4vV8gCod6jRXeJz6gDJUNhfFHQYxPrzU1bfiCUBm-nzEftjxPX2Xyfq5djDrjE-JP71PI-Msp2sNjW5g4yxyrXQqi96yCHGbgI6Yx7FhiQWWum7gVWg46Xr7dmZDxunHlh3t7pc-rvfYeVYd6qzKp8OM6oTHYYVu")',
            }}
            aria-hidden
          />

          {/* Atmospheric overlay */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Floating category chip — bottom left */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900">
              <span className="material-symbols-outlined text-[12px]">sports</span>
              {t("eventsFeatured.sportChip")}
            </span>
          </div>
        </div>

        {/* ── CONTENT SIDE (2 cols) ──────────────────────── */}
        <div className="relative flex flex-col justify-center gap-5 rounded-b-2xl bg-[#221c10] px-7 py-9 md:col-span-2 md:rounded-r-2xl md:rounded-bl-none">

          {/* Featured label */}
          <div className="flex items-center gap-2">
            <span className="h-px w-5 rounded-full bg-primary/50" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              {t("eventsFeatured.label")}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black leading-snug tracking-tight text-white">
            {t("eventsFeatured.title")}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-300">
            {t("eventsFeatured.description")}
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 shadow-sm border border-white/5">
              <span className="material-symbols-outlined text-[13px] text-primary">calendar_today</span>
              {t("eventsFeatured.date")}
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 shadow-sm border border-white/5">
              <span className="material-symbols-outlined text-[13px] text-primary">group</span>
              {t("eventsFeatured.registered")}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/events/featured-championship"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98]"
            >
              {t("eventsFeatured.registerNow")}
            </Link>
            <Link
              to="/events/featured-championship"
              className="rounded-xl border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:-translate-y-px hover:border-white/20 hover:text-white hover:shadow-sm active:scale-[0.98]"
            >
              {t("eventsFeatured.learnMore")}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventsFeaturedSection; 