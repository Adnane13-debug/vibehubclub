/**
 * UpcomingEventCard - Individual card for upcoming events in MemberDashboard.
 */
function UpcomingEventCard({ event }) {
  return (
    <article className="group card-soft flex flex-col overflow-hidden rounded-xl shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={event.image}
        />
        <div className="absolute left-4 top-4">
          <span
            className={`rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur ${event.badgeStyle}`}
          >
            {event.badge}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-primary">
            {event.title}
          </h3>
          <div className="text-right">
            <span className="block text-lg font-bold leading-tight text-primary">
              {event.day}
            </span>
            <span className="block text-xs font-bold uppercase text-slate-500">
              {event.month}
            </span>
          </div>
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-slate-600">
          {event.desc}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {event.time}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {event.place}
          </span>
        </div>
      </div>
    </article>
  );
}

export default UpcomingEventCard;
