import { useEffect, useRef, useCallback } from 'react';

/**
 * GlowCursor — Custom cursor with the original dot+ring style
 * and optimized smooth/fast motion.
 */
export default function GlowCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const auraRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const mode = useRef('light');
  const frameCount = useRef(0);
  const hovering = useRef(false);

  const applyMode = useCallback((m) => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const aura = auraRef.current;
    if (!dot || !ring || !aura || m === mode.current) return;
    mode.current = m;

    if (m === 'dark') {
      dot.style.background = 'rgba(245, 159, 10, 0.9)';
      dot.style.boxShadow = '0 0 20px 6px rgba(245, 159, 10, 0.35), 0 0 60px 15px rgba(245, 159, 10, 0.12)';
      ring.style.borderColor = 'rgba(245, 159, 10, 0.25)';
      ring.style.boxShadow = '0 0 30px 8px rgba(245, 159, 10, 0.06)';
      aura.style.background = 'radial-gradient(circle, rgba(245,159,10,0.10) 0%, rgba(245,159,10,0.03) 50%, transparent 70%)';
    } else {
      dot.style.background = 'rgba(30, 25, 18, 0.75)';
      dot.style.boxShadow = '0 0 20px 6px rgba(30, 25, 18, 0.15), 0 0 60px 15px rgba(30, 25, 18, 0.06)';
      ring.style.borderColor = 'rgba(30, 25, 18, 0.12)';
      ring.style.boxShadow = '0 0 30px 8px rgba(30, 25, 18, 0.03)';
      aura.style.background = 'radial-gradient(circle, rgba(30,25,18,0.06) 0%, rgba(30,25,18,0.02) 50%, transparent 70%)';
    }
  }, []);

  const sample = useCallback((x, y) => {
    try {
      const el = document.elementFromPoint(x, y);
      if (!el) return;
      const bg = window.getComputedStyle(el).backgroundColor;
      const m = bg.match(/\d+/g);
      if (!m) return;
      const lum = (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
      applyMode(lum < 0.45 ? 'dark' : 'light');
    } catch {}
  }, [applyMode]);

  const animate = useCallback(() => {
    // Fast lerp for snappy feel
    pos.current.x += (mouse.current.x - pos.current.x) * 0.25;
    pos.current.y += (mouse.current.y - pos.current.y) * 0.25;
    ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.14;
    ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.14;
    // Aura — slowest, creates trailing neon haze
    auraPos.current.x += (mouse.current.x - auraPos.current.x) * 0.08;
    auraPos.current.y += (mouse.current.y - auraPos.current.y) * 0.08;

    if (dotRef.current) {
      dotRef.current.style.transform =
        `translate3d(${pos.current.x}px,${pos.current.y}px,0) translate(-50%,-50%)`;
    }
    if (ringRef.current) {
      const s = hovering.current ? 1.6 : 1;
      ringRef.current.style.transform =
        `translate3d(${ringPos.current.x}px,${ringPos.current.y}px,0) translate(-50%,-50%) scale(${s})`;
    }
    if (auraRef.current) {
      auraRef.current.style.transform =
        `translate3d(${auraPos.current.x}px,${auraPos.current.y}px,0) translate(-50%,-50%)`;
    }

    // Sample every 12 frames
    if (++frameCount.current % 12 === 0) {
      sample(mouse.current.x, mouse.current.y);
    }

    raf.current = requestAnimationFrame(animate);
  }, [sample]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onOver = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select,label,[data-cursor-hover]')) {
        hovering.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '0.5';
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a,button,[role="button"],input,textarea,select,label,[data-cursor-hover]')) {
        hovering.current = false;
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };

    const onLeave = () => {
      mouse.current.x = -100;
      mouse.current.y = -100;
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    applyMode('light');
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [animate, applyMode]);

  return (
    <>
      {/* Aura — soft neon haze, slowest layer */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className="glow-cursor-aura"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99997,
          willChange: 'transform',
          opacity: 0.7,
          transition: 'background 0.5s, opacity 0.4s',
          animation: 'cursorBreath 3s ease-in-out infinite',
        }}
      />

      {/* Outer ring — soft halo */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="glow-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '1.5px solid rgba(30, 25, 18, 0.12)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1), border-color 0.4s, box-shadow 0.4s',
        }}
      />

      {/* Inner dot — solid glowing core */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="glow-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'background 0.4s, box-shadow 0.4s, opacity 0.3s',
        }}
      />
    </>
  );
}
