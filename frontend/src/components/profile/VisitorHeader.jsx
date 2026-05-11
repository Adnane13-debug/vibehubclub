/**
 * VisitorHeader - Top section of the visitor profile (Compact & Minimal).
 */
function VisitorHeader({ avatar, displayName, bio, onEdit }) {
  return (
    <section className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        
        {/* Avatar with subtle animated glow */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 to-amber-200/30 opacity-50 blur-lg animate-pulse" />
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white bg-slate-50 shadow-md sm:h-28 sm:w-28">
            <img alt={displayName} className="h-full w-full object-cover" src={avatar} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl truncate">
                  {displayName}
                </h1>
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-700 ring-1 ring-inset ring-amber-600/20">
                  Visiteur
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 line-clamp-2 max-w-2xl">
                {bio}
              </p>
            </div>
            
            {/* Edit Button integrated into Header */}
            <button 
              onClick={onEdit}
              className="group flex flex-shrink-0 items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200/60 transition-all hover:bg-slate-100 hover:text-slate-900"
            >
              <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-slate-600">edit</span>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisitorHeader;
