import { Link } from "react-router-dom";

function EventsFeaturedSection() {
  return (
    <div className="mt-20 rounded-2xl border border-primary/20 bg-primary/10 p-8 @container">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div
          className="h-64 w-full rounded-xl bg-cover bg-center bg-no-repeat shadow-lg md:w-1/2"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQUibfn6WeZlf_XPzrochXs3zTuOLNovEDqaxSbt9lQM_mFRXx0uwEjJtrLcEZ3yM-W2gUVqCS3_n7e9RF_jh67gUE8B6DKsn3tCJbbhsIJFfH4vV8gCod6jRXeJz6gDJUNhfFHQYxPrzU1bfiCUBm-nzEftjxPX2Xyfq5djDrjE-JP71PI-Msp2sNjW5g4yxyrXQqi96yCHGbgI6Yx7FhiQWWum7gVWg46Xr7dmZDxunHlh3t7pc-rvfYeVYd6qzKp8OM6oTHYYVu")',
          }}
          aria-hidden
        />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
            <span className="material-symbols-outlined text-[18px]">star</span>
            Featured Event
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
            Inter-University Athletics Championship
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
            The biggest sports event of the year is coming. Represent VibeHub
            Club in the regional qualifiers across 15 different disciplines.
            Special training sessions start next week.
          </p>
          <div className="flex items-center gap-6 font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                event
              </span>
              Feb 20-25
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                groups
              </span>
              500+ Registered
            </div>
          </div>
          <div className="mt-2 flex gap-4">
            <Link
              to="/events/featured-championship"
              className="flex h-12 min-w-[140px] items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-slate-900 shadow-md transition-transform hover:scale-105"
            >
              Register Now
            </Link>
            <Link
              to="/events/featured-championship"
              className="flex h-12 min-w-[140px] items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsFeaturedSection;
