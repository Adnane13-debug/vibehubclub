import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FEATURED_BG_IMAGE =
  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQUibfn6WeZlf_XPzrochXs3zTuOLNovEDqaxSbt9lQM_mFRXx0uwEjJtrLcEZ3yM-W2gUVqCS3_n7e9RF_jh67gUE8B6DKsn3tCJbbhsIJFfH4vV8gCod6jRXeJz6gDJUNhfFHQYxPrzU1bfiCUBm-nzEftjxPX2Xyfq5djDrjE-JP71PI-Msp2sNjW5g4yxyrXQqi96yCHGbgI6Yx7FhiQWWum7gVWg46Xr7dmZDxunHlh3t7pc-rvfYeVYd6qzKp8OM6oTHYYVu")';

function categoryIcon(categorie) {
  const key = String(categorie || "").toLowerCase();
  if (key.includes("sport")) return "sports";
  if (key.includes("gaming") || key.includes("game")) return "sports_esports";
  if (key.includes("culture") || key.includes("ciné")) return "palette";
  if (key.includes("business") || key.includes("startup")) return "business_center";
  if (key.includes("tech")) return "code";
  return "event";
}

function formatEventDate(dateStr, locale) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function EventsFeaturedSection({ event, apiFailed = false }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith("fr") ? "fr-FR" : "en-US";

  const fromApi = Boolean(event && !apiFailed);

  const title = fromApi ? event.titre : t("eventsFeatured.title");
  const description = fromApi
    ? event.description
    : t("eventsFeatured.description");
  const categoryLabel = fromApi ? event.categorie : t("eventsFeatured.sportChip");
  const dateLabel = fromApi
    ? formatEventDate(event.date_debut, locale)
    : t("eventsFeatured.date");

  const participationCount = fromApi ? Number(event.participation_count ?? 0) : 0;
  const registeredLabel =
    participationCount > 0
      ? t("eventsFeatured.registeredCount", { count: participationCount })
      : t("eventsFeatured.registered");

  const detailPath = fromApi && event.id ? `/events/${event.id}` : "/events";

  if (!fromApi && apiFailed) {
    return null;
  }

  return (
    <div className="relative mt-20 overflow-hidden rounded-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative grid grid-cols-1 gap-0 md:grid-cols-5">
        <div className="group relative h-72 overflow-hidden rounded-t-2xl md:col-span-3 md:h-auto md:rounded-l-2xl md:rounded-tr-none">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
            style={{ backgroundImage: FEATURED_BG_IMAGE }}
            aria-hidden
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900">
              <span className="material-symbols-outlined text-[12px]">
                {categoryIcon(event?.categorie)}
              </span>
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-5 rounded-b-2xl bg-[#221c10] px-7 py-9 md:col-span-2 md:rounded-r-2xl md:rounded-bl-none">
          <div className="flex items-center gap-2">
            <span className="h-px w-5 rounded-full bg-primary/50" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              {t("eventsFeatured.label")}
            </span>
          </div>

          <h2 className="text-2xl font-black leading-snug tracking-tight text-white">
            {title}
          </h2>

          <p className="text-sm leading-relaxed text-slate-300">{description}</p>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-[13px] text-primary">
                calendar_today
              </span>
              {dateLabel}
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-[13px] text-primary">group</span>
              {registeredLabel}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to={detailPath}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-md active:scale-[0.98]"
            >
              {t("eventsFeatured.registerNow")}
            </Link>
            <Link
              to={detailPath}
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
