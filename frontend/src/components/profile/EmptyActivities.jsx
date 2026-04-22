import { Link } from "react-router-dom";

/**
 * EmptyActivities - Placeholder for empty activity list.
 */
function EmptyActivities() {
  return (
    <div className="card-soft md:col-span-12 rounded-3xl border-2 border-dashed border-slate-200/80 p-12 text-center">
      <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-primary/40">
        <span className="material-symbols-outlined text-[40px]">
          auto_awesome
        </span>
      </div>
      <h3 className="font-heading text-2xl font-bold text-slate-900">
        No activities yet
      </h3>
      <p className="mb-8 text-slate-600">
        Your curations and club interactions will appear here once you start
        exploring the hub.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/events"
          className="rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
        >
          Explore Hub
        </Link>
        <Link
          to="/about"
          className="rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
        >
          View Gallery
        </Link>
      </div>
    </div>
  );
}

export default EmptyActivities;
