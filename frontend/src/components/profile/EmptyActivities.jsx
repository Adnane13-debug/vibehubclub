import { Link } from "react-router-dom";

/**
 * EmptyActivities - Placeholder for empty activity list.
 */
function EmptyActivities() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-8 sm:p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100">
      
      {/* Minimal Icon Graphic */}
      <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-slate-100 rotate-3 transition-transform hover:rotate-6" />
        <div className="absolute inset-0 rounded-2xl bg-slate-50 -rotate-3 ring-1 ring-inset ring-slate-200/50" />
        <span className="material-symbols-outlined relative z-10 text-[28px] text-slate-400">
          explore
        </span>
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight text-slate-900">
        Your journey starts here
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
        As a visitor, you have limited access to the community. Explore upcoming events or discover the gallery to see what VibeHub has to offer.
      </p>
      
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
        >
          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
          Explore Events
        </Link>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          View Gallery
        </Link>
      </div>
    </div>
  );
}

export default EmptyActivities;
