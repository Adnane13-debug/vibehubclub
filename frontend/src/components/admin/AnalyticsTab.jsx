import StatCard from "../shared/StatCard";
import ProgressBar from "../shared/ProgressBar";
import AdminFooter from "./AdminFooter";

const TRAFFIC_BARS = [40, 65, 45, 80, 55, 90, 70];
const CONVERSION_ROWS = [
  ["Visitor → signup", 72],
  ["Signup → member", 54],
  ["Member → event RSVP", 81],
];

/**
 * Analytics tab – stat cards, traffic bar chart, conversion funnels.
 */
function AnalyticsTab({ stats }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-black text-slate-900">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Engagement and growth snapshots (demo data).
        </p>
      </div>

      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Traffic chart */}
        <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md">
          <h3 className="mb-4 font-heading text-lg font-bold">Traffic</h3>
          <div className="flex h-40 items-end gap-2">
            {TRAFFIC_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Last 7 days · page views</p>
        </div>

        {/* Conversion funnel */}
        <div className="card-soft rounded-xl border border-slate-200/80 p-6 shadow-md">
          <h3 className="mb-4 font-heading text-lg font-bold">Conversion</h3>
          <div className="space-y-4">
            {CONVERSION_ROWS.map(([label, pct]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
                  <span>{label}</span>
                  <span>{pct}%</span>
                </div>
                <ProgressBar percent={pct} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}

export default AnalyticsTab;
