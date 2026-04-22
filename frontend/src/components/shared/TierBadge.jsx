/**
 * Coloured tier pill used in member lists.
 */
function TierBadge({ tier, className = "" }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${className}`}
    >
      {tier}
    </span>
  );
}

export default TierBadge;
