import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GlowCard from "../../../components/shared/GlowCard";

function EventCard({ event }) {
  const { t } = useTranslation();
  const { id, categorie, titre, date_debut, lieu, description, image } = event;

  const formattedDate = new Date(date_debut).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  // Temporary fake image generation using picsum with seed based on event id
  const displayImage = image || `https://picsum.photos/seed/${id || 'event'}/600/400`;

  return (
    <GlowCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-lg">

      {/* Image area */}
      <div className="relative h-52 w-full overflow-hidden">

        {/* Background image — calm zoom on hover */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
          style={{ backgroundImage: `url("${displayImage}")` }}
          aria-hidden
        />

        {/* Atmospheric overlay — warmth from bottom */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

        {Number(event.featured) === 1 && (
          <div className="absolute left-4 top-3.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-900">
              <span className="material-symbols-outlined text-[12px]">star</span>
              {t("eventsFeatured.label")}
            </span>
          </div>
        )}

        {/* Category chip — inside image, bottom-left */}
        <div className="absolute bottom-3.5 left-4">
          <span className="inline-block rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-900">
            {categorie}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">

        {/* Meta row — date + location, lighter and cleaner */}
        <div className="mb-3 flex items-center gap-3 text-[11px] font-medium text-slate-400">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">calendar_today</span>
            {formattedDate}
          </span>
          <span aria-hidden className="text-slate-200">·</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">location_on</span>
            {lieu}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2.5 text-base font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
          {titre}
        </h3>

        {/* Description */}
        <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

        {/* CTA — text link style, less aggressive than full-width button */}
        <Link
          to={`/events/${id}`}
          className="flex items-center gap-1.5 self-start text-sm font-bold text-slate-900 transition-all duration-200 hover:gap-2.5 hover:text-primary"
        >
          {t("eventCard.viewEvent")}
          <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </GlowCard>
  );
}

export default EventCard;
