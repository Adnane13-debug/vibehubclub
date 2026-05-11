/**
 * CuratorProfileCard - Displays curator details like email and joined date.
 */
function CuratorProfileCard({ email, joined, interests }) {
  return (
    <div className="flex flex-col h-full rounded-3xl bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-bold tracking-tight text-slate-900">
        <span className="material-symbols-outlined text-[20px] text-primary">fingerprint</span>
        Profile Details
      </h3>
      
      <div className="flex-1 space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-100">
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Email Address
            </p>
            <p className="truncate text-sm font-medium text-slate-900 mt-0.5">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-100">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Joined Date
            </p>
            <p className="truncate text-sm font-medium text-slate-900 mt-0.5">{joined}</p>
          </div>
        </div>

        {interests.length > 0 && (
          <div className="pt-2">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200/50 transition-colors hover:bg-slate-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CuratorProfileCard;
