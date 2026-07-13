import { useState, useEffect } from 'react';
import InteractiveParticles from './InteractiveParticles';
import { Terminal, Cpu, Cloud, ChevronDown, Download } from 'lucide-react';

const roles = [
  "DevOps Pipelines",
  "Cloud Infrastructure",
  "Networking Systems",
  "Linux Automation",
  "Scalable Infrastructure"
];

const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

// Helper to play a simple click sound using Web Audio API
const playClick = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.warn('Audio context error', e);
  }
};

export default function Hero({ onExploreProjects, onContactClick, soundEnabled, theme }) {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);

        if (charIndex + 1 === currentRole.length) {
          // Finished typing, wait before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const [isInsideHero, setIsInsideHero] = useState(false);

  // Performance-optimized cursor follower particle (Restricted to Hero section)
  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const handleFollowerMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      
      // Detect if cursor is inside the Hero section bounding viewport
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setIsInsideHero(true);
        const follower = document.getElementById('hero-cursor-follower');
        if (follower) {
          // Direct sub-pixel hardware-accelerated transforms for 60fps/120fps fluid tracking
          follower.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        }
      } else {
        setIsInsideHero(false);
      }
    };

    const handleMouseLeave = () => {
      setIsInsideHero(false);
    };

    window.addEventListener('mousemove', handleFollowerMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleFollowerMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="hero-section visible" style={heroStyles.heroContainer} onMouseEnter={() => setIsInsideHero(true)} onMouseLeave={() => setIsInsideHero(false)}>
      {/* Subtle cursor follower particle ring (Restricted to Hero section only) */}
      <div 
        id="hero-cursor-follower"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          border: '1.5px solid var(--color-ai-magenta)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isInsideHero ? 0.38 : 0,
          transition: 'opacity 0.4s ease, transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)',
          mixBlendMode: 'difference',
        }}
      />

      {/* Custom Interactive 2D Canvas Neural Network Particles */}
      <InteractiveParticles theme={theme} />

      {/* Deep dark gradient overlay to blend 3D canvas smoothly */}
      <div style={heroStyles.gradientOverlay} />
      
      {/* Cyber Grid pattern */}
      <div className="grid-bg" style={{ opacity: 0.15 }} />

      <div className="container hero-content-container" style={heroStyles.contentContainer}>
        
        {/* LEFT COLUMN: SYSTEM TELEMETRY & BIO */}
        <div className="hero-text-column" style={heroStyles.textColumn}>
          {/* Header Badge */}
          <div style={heroStyles.badgeContainer} className="glass-panel">
            <Cpu size={14} style={{ color: 'var(--color-ai-magenta)' }} />
            <span style={heroStyles.badgeDivider}>|</span>
            <Cloud size={14} style={{ color: 'var(--color-cloud-cyan)' }} />
            <span style={heroStyles.badgeText}>CSE STUDENT | DEVOPS & NETWORKING ENTHUSIAST</span>
          </div>

          {/* Hero Headline */}
          <h1 style={heroStyles.mainName}>
            MADESH S
          </h1>

          {/* Subtitle with Typing Animation */}
          <h2 style={heroStyles.typingHeadline}>
            Building Modern{' '}
            <span style={heroStyles.animatedText}>
              {typedText}
              <span style={heroStyles.cursor}>|</span>
            </span>
          </h2>

          {/* Bio paragraph */}
          <p style={heroStyles.description}>
            I am a Computer Science Engineering student passionate about DevOps, Cloud Computing, Networking, Linux, and Automation. My goal is to build scalable infrastructure, automate deployments, and create reliable systems while continuously learning through real-world projects.
            <br /><br />
            I strongly believe in learning by building real-world projects instead of simply completing tutorials. Every project I build deepens my understanding of modern infrastructure and software engineering.
          </p>

          {/* Quick CTA Tech Stack Badges */}
          <div className="hero-tech-icons" style={heroStyles.techIcons}>
            <span className="badge badge-cloud" style={heroStyles.techBadge}>Linux</span>
            <span className="badge badge-ai" style={heroStyles.techBadge}>Python</span>
            <span className="badge badge-cloud" style={heroStyles.techBadge}>Docker</span>
            <span className="badge badge-ai" style={heroStyles.techBadge}>Networking</span>
            <span className="badge badge-cloud" style={heroStyles.techBadge}>Git & GitHub</span>
            <span className="badge badge-ai" style={heroStyles.techBadge}>React</span>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-group" style={heroStyles.ctaGroup}>
            <button 
              className="btn btn-primary" 
              style={heroStyles.ctaBtn}
              onClick={() => {
                if (soundEnabled) playClick();
                onExploreProjects();
              }}
            >
              <Cpu size={18} />
              View Projects
            </button>
            <button 
              className="btn btn-secondary" 
              style={heroStyles.ctaBtn}
              onClick={() => {
                if (soundEnabled) playClick();
                onContactClick();
              }}
            >
              <Terminal size={18} />
              Connect
            </button>
            <button 
              className="btn btn-secondary" 
              style={heroStyles.ctaBtn}
              onClick={() => {
                if (soundEnabled) playClick();
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Madesh_S_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download size={18} />
              Download Resume
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SYSTEM ORBITAL DASHBOARD */}
        <div className="hero-robot-container" style={heroStyles.robotColumn}>
          {/* Ambient Glow */}
          <div className="glow-orb orb-magenta" style={{ width: '220px', height: '220px', filter: 'blur(90px)', opacity: 0.12, position: 'absolute', zIndex: 1 }} />

          {/* Orbital Visualization Widget */}
          <div style={heroStyles.orbitalWrapper}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 280 280"
              style={heroStyles.orbitalSvg}
              aria-hidden="true"
            >
              <defs>
                <filter id="hero-dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <radialGradient id="hero-core-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.055)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0.008)"/>
                </radialGradient>
              </defs>

              {/* Static background rings */}
              <circle cx="140" cy="140" r="132" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
              <circle cx="140" cy="140" r="98"  fill="none" stroke="rgba(255,255,255,0.03)"  strokeWidth="1"/>
              <circle cx="140" cy="140" r="62"  fill="none" stroke="rgba(255,255,255,0.04)"  strokeWidth="1"/>

              {/* Outer spinning dashed ring */}
              <circle
                cx="140" cy="140" r="132"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1.5"
                strokeDasharray="22 16"
                style={{ transformOrigin: '140px 140px', animation: 'heroSpinCW 24s linear infinite' }}
              />
              {/* Middle counter-spinning dashed ring */}
              <circle
                cx="140" cy="140" r="98"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
                strokeDasharray="12 20"
                style={{ transformOrigin: '140px 140px', animation: 'heroSpinCCW 15s linear infinite' }}
              />

              {/* Core glow circle */}
              <circle cx="140" cy="140" r="62" fill="url(#hero-core-grad)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

              {/* Center label */}
              <text x="140" y="134" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="13" fontFamily="Fira Code, monospace" fontWeight="600" letterSpacing="2">MADESH S</text>
              <text x="140" y="153" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontSize="8" fontFamily="Fira Code, monospace" letterSpacing="4">DEVOPS · CLOUD</text>

              {/* Orbiting dot — outer ring, clockwise */}
              <circle cx="140" cy="8" r="5" fill="rgba(255,255,255,0.78)" filter="url(#hero-dot-glow)">
                <animateTransform attributeName="transform" type="rotate" from="0 140 140" to="360 140 140" dur="24s" repeatCount="indefinite"/>
              </circle>
              {/* Trailing dot on outer ring */}
              <circle cx="140" cy="8" r="2.5" fill="rgba(255,255,255,0.28)">
                <animateTransform attributeName="transform" type="rotate" from="160 140 140" to="520 140 140" dur="24s" repeatCount="indefinite"/>
              </circle>
              {/* Orbiting dot — middle ring, counter-clockwise */}
              <circle cx="238" cy="140" r="3.5" fill="rgba(255,255,255,0.58)" filter="url(#hero-dot-glow)">
                <animateTransform attributeName="transform" type="rotate" from="0 140 140" to="-360 140 140" dur="15s" repeatCount="indefinite"/>
              </circle>
            </svg>

            {/* Info Cards */}
            <div style={heroStyles.metricRow}>
              {[
                { label: 'PURSUING', value: 'B.E.',  sub: 'CSE 2023–2027' },
                { label: 'CGPA',     value: '7.5',   sub: 'Current Score'  },
                { label: 'GOAL',     value: 'DevOps', sub: 'Career Focus'  },
              ].map(m => (
                <div key={m.label} className="glass-panel" style={heroStyles.metricCard}>
                  <span style={heroStyles.metricLabel}>{m.label}</span>
                  <span style={{...heroStyles.metricValue, fontSize: m.value.length > 5 ? '1rem' : '1.35rem'}}>{m.value}</span>
                  <span style={heroStyles.metricSub}>{m.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Animated scroll down indicator */}
      <div 
        className="hero-scroll-indicator"
        style={heroStyles.scrollIndicator} 
        onClick={onExploreProjects}
      >
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>SCAN SYSTEMS</span>
        <ChevronDown size={18} style={heroStyles.scrollArrow} />
      </div>
    </section>
  );
}

const heroStyles = {
  heroContainer: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-deep-space)',
    paddingTop: '80px', // header allowance
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, transparent 30%, var(--bg-deep-space) 90%), linear-gradient(180deg, transparent 60%, var(--bg-deep-space) 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  contentContainer: {
    zIndex: 5,
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.9fr',
    gap: '40px',
    alignItems: 'center',
    textAlign: 'left',
    maxWidth: '1200px',
    width: '100%',
    padding: '40px 24px',
    position: 'relative',
  },
  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  robotColumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px',
    position: 'relative',
    height: '100%',
    minHeight: '300px',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  robotWidget: {
    width: '320px',
    height: '380px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    userSelect: 'none',
  },
  badgeContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '30px',
    marginBottom: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(13, 11, 33, 0.6)',
  },
  badgeDivider: {
    color: 'rgba(255, 255, 255, 0.15)',
    fontSize: '0.85rem',
  },
  badgeText: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-bright)',
    letterSpacing: '0.15em',
  },
  mainName: {
    fontSize: '4.5rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    letterSpacing: '-0.03em',
    marginBottom: '16px',
    color: 'var(--text-pure)',
    background: 'linear-gradient(135deg, var(--text-pure), var(--text-muted))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1.1,
  },
  typingHeadline: {
    fontSize: '1.8rem',
    fontFamily: 'var(--font-body)',
    fontWeight: '400',
    color: 'var(--text-bright)',
    marginBottom: '24px',
    minHeight: '2.5rem',
  },
  animatedText: {
    color: 'var(--color-cloud-cyan)',
    fontWeight: '600',
    textShadow: 'var(--glow-cyan)',
  },
  cursor: {
    display: 'inline-block',
    marginLeft: '3px',
    animation: 'pulse 1s steps(2, start) infinite',
    color: 'var(--color-cloud-cyan)',
  },
  description: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.65',
    marginBottom: '32px',
    maxWidth: '680px',
  },
  techIcons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'flex-start',
    marginBottom: '40px',
  },
  techBadge: {
    fontSize: '0.8rem',
    padding: '6px 14px',
    borderRadius: '20px',
  },
  ctaGroup: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ctaBtn: {
    padding: '14px 32px',
    fontSize: '1rem',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    zIndex: 5,
    animation: 'float 3s ease-in-out infinite',
  },
  scrollArrow: {
    color: 'var(--color-cloud-cyan)',
    filter: 'drop-shadow(var(--glow-cyan))',
  },
  orbitalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    position: 'relative',
    zIndex: 3,
    width: '100%',
    maxWidth: '280px',
  },
  orbitalSvg: {
    filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.025))',
    animation: 'heroOrbFloat 6s ease-in-out infinite',
    display: 'block',
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
  metricRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metricCard: {
    padding: '12px 18px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    minWidth: '80px',
    border: '1px solid rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  metricLabel: {
    fontSize: '0.58rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.08em',
  },
  metricValue: {
    fontSize: '1.35rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    color: 'var(--text-pure)',
    lineHeight: 1.1,
  },
  metricSub: {
    fontSize: '0.6rem',
    color: 'var(--text-dark)',
    fontFamily: 'var(--font-body)',
  },
};
