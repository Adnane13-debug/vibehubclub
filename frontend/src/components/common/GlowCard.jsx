import { useRef, useCallback } from 'react';

/* ── Glow card wrapper ── 
   Tracks the mouse and renders a radial light behind the card content.
   Children render directly (no inner wrapper) so card layouts stay intact. */
export default function GlowCard({ children, className = '', glowColor = 'rgba(245,159,10,0.18)' }) {
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
      className={`relative overflow-hidden ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-opacity': '0',
      }}
    >
      {/* The radial glow light — absolute, won't affect layout */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-[1] transition-opacity duration-500"
        style={{
          opacity: 'var(--glow-opacity)',
          background:
            `radial-gradient(320px circle at var(--glow-x) var(--glow-y), ${glowColor}, transparent 70%)`,
        }}
      />
      {/* Children render directly — no wrapper div */}
      {children}
    </div>
  );
}
