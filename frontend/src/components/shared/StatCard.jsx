/**
 * Reusable stat card – icon, value, delta badge.
 */
function StatCard({ label, value, delta, icon }) {
  return (
    <div className="card-soft flex flex-col gap-4 rounded-xl border border-slate-200/80 p-6 shadow-md">
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
          {delta}
          {delta.startsWith("+") && (
            <span className="material-symbols-outlined text-xs">trending_up</span>
          )}
        </span>
      </div>
      <div>
        <p className="mb-1 text-sm font-medium text-slate-500">{label}</p>
        <h3 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default StatCard;
