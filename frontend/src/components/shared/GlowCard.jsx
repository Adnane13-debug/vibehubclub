import { useRef, useCallback } from 'react';

/* ── Glow card wrapper ── 
   Tracks the mouse and renders a radial light behind the card content.
   The glow stays only while hovering. */
function GlowCard({ children, className = '' }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
    card.style.setProperty('--glow-opacity', '1');
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--glow-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-opacity': '0',
      }}
    >
      {/* The radial glow light */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: 'var(--glow-opacity)',
          background:
            'radial-gradient(320px circle at var(--glow-x) var(--glow-y), rgba(245,159,10,0.18), transparent 70%)',
        }}
      />
      {/* Card content sits above the glow */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default GlowCard;
