/**
 * Reusable page / section heading with optional subtitle and trailing element.
 */
function SectionHeader({ title, subtitle, trailing, className = "" }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div>
        <h1 className="font-heading text-2xl font-black text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      {trailing}
    </div>
  );
}

export default SectionHeader;
