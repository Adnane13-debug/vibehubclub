import ProgressBar from "../shared/ProgressBar";

/**
 * MemberHeader - Displays welcome message and XP progress.
 */
function MemberHeader({ first, tier, xp, xpGoal, pct }) {
  return (
    <header className="mb-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-heading text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome back, {first}
          </h1>
          <p className="max-w-md text-slate-600">
            Your creative energy is at its peak this week. Check your upcoming
            curator meets.
          </p>
        </div>
        <div className="card-soft w-full rounded-xl p-6 shadow-md md:w-80">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-heading text-sm font-bold uppercase tracking-wider text-primary">
              {tier}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {xp} / {xpGoal} XP to Gold
            </span>
          </div>
          <ProgressBar percent={pct} barClass="bg-gradient-to-r from-primary to-amber-600" />
        </div>
      </div>
    </header>
  );
}

export default MemberHeader;
