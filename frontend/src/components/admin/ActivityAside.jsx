/**
 * Recent activity timeline shown in the Overview sidebar.
 */
function ActivityAside() {
  return (
    <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md">
      <h3 className="mb-6 font-heading text-sm font-extrabold tracking-tight">
        Recent Activity
      </h3>
      <div className="relative space-y-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-slate-100">
        <div className="relative flex gap-4">
          <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
            <span className="material-symbols-outlined text-[12px] text-white">
              person_add
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold">New member joined</p>
            <p className="text-[11px] text-slate-400">Sarah Jenkins joined the club</p>
          </div>
        </div>
        <div className="relative flex gap-4">
          <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 ring-4 ring-white">
            <span className="material-symbols-outlined text-[12px] text-white">
              payments
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold">Payment received</p>
            <p className="text-[11px] text-slate-400">
              Annual subscription for Pro Plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityAside;
