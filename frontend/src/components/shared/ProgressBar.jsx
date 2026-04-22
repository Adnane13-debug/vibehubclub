/**
 * Generic progress bar. Pass `percent` (0-100) and optional gradient class.
 */
function ProgressBar({ percent, barClass = "bg-primary" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${barClass}`}
        style={{ width: `${Math.min(100, percent)}%` }}
      />
    </div>
  );
}

export default ProgressBar;
