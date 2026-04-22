/**
 * CuratorProfileCard - Displays curator details like email and joined date.
 */
function CuratorProfileCard({ email, joined, interests }) {
  return (
    <div className="card-soft md:col-span-7 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-lg">
      <h3 className="mb-6 flex items-center gap-2 font-heading text-xl font-bold text-slate-900">
        <span className="material-symbols-outlined text-primary">fingerprint</span>
        Curator Profile
      </h3>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-primary">
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Email Address
            </p>
            <p className="font-medium text-slate-900">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-primary">
            <span className="material-symbols-outlined">calendar_today</span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Joined Date
            </p>
            <p className="font-medium text-slate-900">{joined}</p>
          </div>
        </div>
        {interests.length > 0 && (
          <div className="pt-2">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-500">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-slate-900"
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
