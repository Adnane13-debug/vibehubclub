import { Link } from "react-router-dom";

/**
 * MemberStatsPanel - Left sidebar stats and MBTI card.
 */
function MemberStatsPanel({ attended, tests, mbti, mbtiBlurb }) {
  return (
    <div className="flex flex-col gap-6 md:col-span-3">
      <div className="card-soft flex flex-col items-center justify-center rounded-xl p-8 text-center shadow-md">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-800">
          <span className="material-symbols-outlined">event_available</span>
        </div>
        <span className="font-heading text-3xl font-bold">{attended}</span>
        <span className="text-sm font-medium text-slate-600">
          Events Attended
        </span>
      </div>
      <div className="card-soft flex flex-col items-center justify-center rounded-xl p-8 text-center shadow-md">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <span className="material-symbols-outlined">quiz</span>
        </div>
        <span className="font-heading text-3xl font-bold">
          {String(tests).padStart(2, "0")}
        </span>
        <span className="text-sm font-medium text-slate-600">
          Tests Taken
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-hover p-8 text-slate-900 shadow-lg group">
        <div className="relative z-10">
          <h3 className="mb-1 font-heading text-lg font-bold opacity-90">
            Last Result
          </h3>
          <div className="mb-4 font-heading text-5xl font-extrabold tracking-tighter">
            {mbti}
          </div>
          <p className="mb-6 text-xs leading-relaxed opacity-90">
            {mbtiBlurb}
          </p>
          <Link
            to="/events"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-900/20 bg-white/20 py-3 text-sm font-bold backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            Retake Test
            <span className="material-symbols-outlined text-sm">refresh</span>
          </Link>
        </div>
        <div className="pointer-events-none absolute -bottom-4 -right-4 rotate-12 opacity-10 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-9xl">psychology</span>
        </div>
      </div>
    </div>
  );
}

export default MemberStatsPanel;
