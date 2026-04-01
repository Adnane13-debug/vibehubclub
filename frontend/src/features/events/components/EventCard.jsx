import { Link } from "react-router-dom";

function EventCard({ event }) {
  const { id, category, title, date, location, description, image } = event;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute left-4 top-4 z-10 rounded bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900">
          {category}
        </div>
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
          {title}
        </h3>
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-[16px]">
            calendar_today
          </span>
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span className="material-symbols-outlined text-[16px]">
            location_on
          </span>
          <span>{location}</span>
        </div>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
        <Link
          to={`/events/${id}`}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-slate-900 transition-colors hover:bg-primary/90"
        >
          Participate{" "}
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
