import { useState, useEffect, useCallback } from 'react';

const BOOT_LINES = [
  { text: 'MADESH.IN OS v1.0.0 — Portfolio initializing...', delay: 0,    color: 'var(--text-muted)' },
  { text: '> Loading developer profile...............', delay: 300,  color: 'var(--text-muted)' },
  { text: '  ✓ Linux & Ubuntu CLI            [ONLINE]', delay: 650,  color: '#27c93f' },
  { text: '  ✓ Python & JavaScript           [ONLINE]', delay: 950,  color: '#27c93f' },
  { text: '  ✓ Git & GitHub                  [ONLINE]', delay: 1200, color: '#27c93f' },
  { text: '> Mounting networking stack...', delay: 1500, color: 'var(--text-muted)' },
  { text: '  ✓ TCP/IP & OSI Model            [LOADED]', delay: 1750, color: '#27c93f' },
  { text: '  ✓ DNS & HTTP/HTTPS              [LOADED]', delay: 2000, color: '#27c93f' },
  { text: '> Bootstrapping DevOps learning environment...', delay: 2250, color: 'var(--text-muted)' },
  { text: '  ✓ Docker & GitHub Actions       [LEARNING]', delay: 2500, color: 'hsl(45,100%,60%)' },
  { text: '', delay: 2700, color: 'transparent' },
  { text: '════════════════════════════════════════', delay: 2800, color: 'rgba(255,255,255,0.12)' },
  { text: '  Welcome. Systems ready, Madesh.', delay: 3000, color: 'var(--text-pure)', bold: true },
  { text: '════════════════════════════════════════', delay: 3200, color: 'rgba(255,255,255,0.12)' },
];

const TOTAL_DURATION = 3800; // ms before auto-exit starts

export default function BootIntro({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const exit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onComplete(), 700);
  }, [exiting, onComplete]);

  // Reveal lines one by one
  useEffect(() => {
    if (skipped) return;
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [skipped]);

  // Animate progress bar
  useEffect(() => {
    if (skipped) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = Math.max(0, now - start);
      const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(exit, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [skipped, exit]);

  // Skip on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSkip = () => {
    setSkipped(true);
    setProgress(100);
    setVisibleLines(BOOT_LINES.map((_, i) => i));
    setTimeout(exit, 300);
  };

  const filledBlocks = Math.max(0, Math.min(28, Math.round((progress / 100) * 28)));
  const bar = '█'.repeat(filledBlocks) + '░'.repeat(28 - filledBlocks);

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Fira Code", monospace',
        padding: '40px 24px',
        cursor: 'pointer',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
      }}
    >
      {/* Scanline overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{
        width: '100%',
        maxWidth: '640px',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', marginBottom: '6px' }}>
            MADESH.IN PORTFOLIO OS — v1.0.0
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.1em' }}>
            Copyright © 2026 Madesh S — All Rights Reserved
          </div>
        </div>

        {/* Boot Lines */}
        <div style={{ minHeight: '280px' }}>
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: '0.78rem',
                color: line.color,
                fontWeight: line.bold ? '700' : '400',
                lineHeight: '1.8',
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                whiteSpace: 'pre',
              }}
            >
              {line.text || '\u00A0'}
            </div>
          ))}

          {/* Blinking cursor on last visible line */}
          {!exiting && (
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              backgroundColor: 'var(--color-ai-magenta, #fff)',
              marginLeft: '2px',
              animation: 'bootCursorBlink 0.8s steps(2, start) infinite',
              verticalAlign: 'middle',
            }} />
          )}
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              SYSTEM INITIALIZATION
            </span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{
            fontSize: '0.72rem',
            color: progress >= 100 ? '#27c93f' : 'rgba(255,255,255,0.5)',
            letterSpacing: '0.02em',
            transition: 'color 0.5s ease',
          }}>
            [{bar}]
          </div>
        </div>

        {/* Skip hint */}
        <div style={{
          marginTop: '28px',
          fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.15em',
          textAlign: 'right',
        }}>
          PRESS ESC OR CLICK TO SKIP
        </div>
      </div>
    </div>
  );
}
