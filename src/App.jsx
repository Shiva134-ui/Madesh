import { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import BootIntro from './components/BootIntro';
import GitHubStats from './components/GitHubStats';
import ArchitectureVisualizer from './components/ArchitectureVisualizer';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import Terminal from './components/Terminal';
import { Menu, X, Settings as SettingsIcon, Terminal as TerminalIcon, Cpu, Heart, Keyboard } from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('cosmic');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Boot intro — plays once per session
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem('bootIntroSeen') === 'true'
  );
  const handleIntroComplete = () => {
    sessionStorage.setItem('bootIntroSeen', 'true');
    setIntroComplete(true);
  };

  // Terminal & AI Integration States
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalTriggerCmd, setTerminalTriggerCmd] = useState('');
  const [projectFilterTag, setProjectFilterTag] = useState('all');

  // Refs for click-outside detection
  const mobileMenuRef = useRef(null);
  const hamburgerBtnRef = useRef(null);
  const settingsDrawerRef = useRef(null);
  const settingsBtnRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
      if (
        settingsOpen &&
        settingsDrawerRef.current &&
        !settingsDrawerRef.current.contains(e.target) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(e.target)
      ) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen, settingsOpen]);

  // Global keyboard shortcuts
  useEffect(() => {
    const EMAIL = 'sivamadesh.134@gmail.com';
    const GITHUB_URL = 'https://github.com/Shiva134-ui';

    const handler = (e) => {
      const tag = e.target.tagName;
      // Don't fire when typing in inputs/textareas
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      switch (e.key) {
        case 'g': case 'G':
          window.open(GITHUB_URL, '_blank');
          break;
        case 'c': case 'C':
          scrollToSection('contact');
          break;
        case 't': case 'T':
          setTerminalOpen(prev => !prev);
          break;
        case 'e': case 'E':
          navigator.clipboard?.writeText(EMAIL);
          break;
        case '?': case '/':
          setShortcutsOpen(prev => !prev);
          break;
        case 'Escape':
          setShortcutsOpen(false);
          setMobileMenuOpen(false);
          setSettingsOpen(false);
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Track window scroll percentage for header progress bar & set scroll custom property for CSS animations
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const percentage = (window.scrollY / totalScroll) * 100;
            setScrollProgress(percentage);
          }
          document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Performance-optimized hover dynamic spotlight shine, conic border glow, and 3D card tilt
  useEffect(() => {
    let lastTarget = null;

    const handleMouseMove = (e) => {
      const target = e.target.closest('.glass-panel');
      
      if (lastTarget && lastTarget !== target) {
        lastTarget.style.transform = '';
        lastTarget.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      }

      if (target) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left; // mouse x coordinate relative to card
        const y = e.clientY - rect.top;  // mouse y coordinate relative to card

        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);

        const centerX = x - rect.width / 2;
        const centerY = y - rect.height / 2;
        const angle = Math.atan2(centerY, centerX) * (180 / Math.PI) + 90;
        target.style.setProperty('--start', angle);

        // 3D tilt calculation (max 6 degrees rotateX and rotateY)
        const tiltX = (centerY / (rect.height / 2)) * -6;
        const tiltY = (centerX / (rect.width / 2)) * 6;
        
        target.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        target.style.transition = 'transform 0.08s ease-out';
        lastTarget = target;
      } else {
        lastTarget = null;
      }
    };

    const handleMouseLeave = () => {
      if (lastTarget) {
        lastTarget.style.transform = '';
        lastTarget.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        lastTarget = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Apply Theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    if (theme !== 'cosmic') {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Core scroll-reveal will now be managed by individual sections using React states.

  // Audio plays on clicks
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.warn("AudioContext block by client policy.", e);
    }
  };

  const handleInteractiveClick = (action) => {
    playClickSound();
    action();
  };

  const triggerSystemDeployment = (cmd) => {
    setTerminalTriggerCmd(cmd);
    setTerminalOpen(true);
    // Reset trigger command state after transfer
    setTimeout(() => setTerminalTriggerCmd(''), 100);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={appStyles.appWrapper}>
      {/* BOOT INTRO — plays once per session */}
      {!introComplete && <BootIntro onComplete={handleIntroComplete} />}
      
      {/* GLOBAL GLASS HEADER */}
      <header style={appStyles.header}>
        <div style={appStyles.navContainer}>
          {/* Logo */}
          <div style={appStyles.logoGroup} onClick={() => scrollToSection('hero')}>
            <Cpu size={20} style={{ color: 'var(--color-ai-magenta)' }} />
            <span style={appStyles.logoText}>MADESH<span style={{ color: 'var(--color-cloud-cyan)' }}>.IO</span></span>
          </div>

          {/* Desktop Nav */}
          <nav style={appStyles.desktopNav}>
            {['architecture', 'skills', 'projects', 'experience', 'certifications', 'contact'].map(sec => (
              <button 
                key={sec} 
                onClick={() => handleInteractiveClick(() => scrollToSection(sec))} 
                style={appStyles.navLink}
                className="nav-link-btn"
              >
                {sec.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Nav Icons Right */}
          <div style={appStyles.rightGroup}>
            <button 
              onClick={() => handleInteractiveClick(() => setTerminalOpen(!terminalOpen))}
              className="btn-icon"
              title="Open Developer Console"
            >
              <TerminalIcon size={18} />
            </button>
            <button 
              ref={settingsBtnRef}
              onClick={() => handleInteractiveClick(() => setSettingsOpen(!settingsOpen))}
              className="btn-icon"
              title="Global Theme Settings"
            >
              <SettingsIcon size={18} />
            </button>
            <button 
              ref={hamburgerBtnRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon hamburger-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Sleek Progress Indicator (Dynamic Reading Telemetry) */}
        <div 
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            height: '2px',
            width: `${scrollProgress}%`,
            backgroundColor: 'var(--color-ai-magenta)',
            transition: 'width 0.1s ease-out',
            boxShadow: 'var(--glow-magenta)',
            zIndex: 100
          }}
        />
      </header>

      {/* MOBILE NAV SIDEBAR */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} style={appStyles.mobileMenu} className="glass-panel mobile-menu">
          <nav style={appStyles.mobileNavList}>
            {['architecture', 'skills', 'projects', 'experience', 'certifications', 'contact'].map(sec => (
              <button 
                key={sec} 
                onClick={() => handleInteractiveClick(() => scrollToSection(sec))} 
                style={appStyles.mobileNavLink}
              >
                {sec.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* SETTINGS DRAWER */}
      {settingsOpen && (
        <div ref={settingsDrawerRef} style={appStyles.settingsDrawer} className="glass-panel settings-drawer">
          <div style={appStyles.settingsHead}>
            <span style={appStyles.settingsTitle}>SYSTEM SETTINGS</span>
            <button onClick={() => handleInteractiveClick(() => setSettingsOpen(false))} style={appStyles.closeSettingsBtn}>
              <X size={16} />
            </button>
          </div>
          <div style={appStyles.settingsBody}>
            {/* Theme Select */}
            <div style={appStyles.settingGroup}>
              <label style={appStyles.settingLabel}>CHOOSE CORE COLOR THEME</label>
              <div style={appStyles.themeOptionsGrid}>
                {['cosmic', 'cyberpunk', 'emerald'].map(t => (
                  <button
                    key={t}
                    onClick={() => handleInteractiveClick(() => setTheme(t))}
                    style={{
                      ...appStyles.themeBtn,
                      borderColor: theme === t ? 'var(--color-cloud-cyan)' : 'rgba(255,255,255,0.06)',
                      backgroundColor: theme === t ? 'rgba(255,255,255,0.04)' : 'transparent'
                    }}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Sound Toggle */}
            <div style={appStyles.settingGroupToggle}>
              <span style={appStyles.settingLabelInline}>TACTILE CORE AUDIO FEEDBACK</span>
              <input 
                type="checkbox" 
                checked={soundEnabled}
                onChange={(e) => handleInteractiveClick(() => setSoundEnabled(e.target.checked))}
                style={appStyles.toggleCheckbox}
              />
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO SECTIONS SECTIONS */}
      <main style={appStyles.mainContent}>
        
        {/* HERO SECTION */}
        <Hero 
          soundEnabled={soundEnabled}
          theme={theme}
          onExploreProjects={() => scrollToSection('architecture')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* LIVE GITHUB STATS STRIP */}
        <GitHubStats />

        {/* INTERACTIVE PIPELINE ARCHITECTURE */}
        <ArchitectureVisualizer />

        {/* LAYERED SKILLS MATRIX */}
        <Skills />

        {/* FILTERABLE PROJECTS GRID */}
        <Projects 
          activeFilter={projectFilterTag}
          onFilterChange={(tag) => setProjectFilterTag(tag)}
        />

        {/* CHRONOLOGICAL EXPERIENCE TIMELINE */}
        <Experience />

        {/* GLOWING CERTIFICATION BADGES CAROUSEL */}
        <Certifications />

        {/* DYNAMIC CONTACT ROUTER */}
        <Contact />

      </main>

      {/* SECURE FOOTER */}
      <footer style={appStyles.footer}>
        <div className="container" style={appStyles.footerContainer}>
          <span style={appStyles.copyText}>© 2026 MADESH S. ALL SYSTEMS SECURED.</span>
          <div style={appStyles.madeWith}>
            <span>MADE WITH</span>
            <Heart size={12} style={{ color: 'var(--color-ai-magenta)', filter: 'drop-shadow(var(--glow-magenta))' }} />
            <span>FOR CLOUD & AI DEPLOYS</span>
          </div>
        </div>
      </footer>

      {/* PERSONAL AI CONVERSATION ASSISTANT */}
      <AIAssistant 
        onTriggerTerminalCommand={(cmd) => triggerSystemDeployment(cmd)}
        onFilterProjects={(tag) => setProjectFilterTag(tag)}
      />

      {/* RETRO CLI DIAGNOSTIC CONSOLE */}
      <Terminal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)}
        triggerCommand={terminalTriggerCmd}
      />

      {/* KEYBOARD SHORTCUTS HINT BUTTON */}
      <button
        onClick={() => setShortcutsOpen(true)}
        title="Keyboard shortcuts (?)"
        style={appStyles.shortcutsHintBtn}
      >
        <Keyboard size={14} />
        <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>?</span>
      </button>

      {/* KEYBOARD SHORTCUTS MODAL */}
      {shortcutsOpen && (
        <div
          style={appStyles.shortcutsBackdrop}
          onClick={() => setShortcutsOpen(false)}
        >
          <div
            className="glass-panel"
            style={appStyles.shortcutsModal}
            onClick={e => e.stopPropagation()}
          >
            <div style={appStyles.shortcutsHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Keyboard size={16} style={{ color: 'var(--color-cloud-cyan)' }} />
                <span style={appStyles.shortcutsTitle}>KEYBOARD SHORTCUTS</span>
              </div>
              <button onClick={() => setShortcutsOpen(false)} style={appStyles.closeSettingsBtn}>
                <X size={16} />
              </button>
            </div>
            <div style={appStyles.shortcutsBody}>
              {[
                { key: 'G', desc: 'Open GitHub profile' },
                { key: 'C', desc: 'Scroll to Contact' },
                { key: 'T', desc: 'Toggle terminal' },
                { key: 'E', desc: 'Copy email to clipboard' },
                { key: '?', desc: 'Show this panel' },
                { key: 'Esc', desc: 'Close any open panel' },
              ].map(({ key, desc }) => (
                <div key={key} style={appStyles.shortcutRow}>
                  <kbd style={appStyles.kbdKey}>{key}</kbd>
                  <span style={appStyles.shortcutDesc}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={appStyles.shortcutsFooter}>
              Press <kbd style={{...appStyles.kbdKey, fontSize: '0.6rem', padding: '1px 5px'}}>?</kbd> anytime to toggle this panel
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const appStyles = {
  appWrapper: {
    backgroundColor: 'var(--bg-deep-space)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  header: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '80px',
    padding: '0 24px',
    zIndex: 1000,
    backgroundColor: '#000000',
    borderBottom: '1px solid var(--color-glass-border)',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '1rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    letterSpacing: '0.08em',
    color: 'var(--text-bright)',
  },
  desktopNav: {
    display: 'flex',
    gap: '24px',
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  rightGroup: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  hamburgerBtn: {
    display: 'none',
  },
  mobileMenu: {
    position: 'fixed',
    top: '96px',
    left: '24px',
    width: 'calc(100% - 48px)',
    borderRadius: '16px',
    padding: '20px',
    zIndex: 999,
    backgroundColor: 'rgba(10, 8, 25, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  mobileNavList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
  },
  mobileNavLink: {
    background: 'none',
    border: 'none',
    color: 'var(--text-bright)',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    width: '100%',
    padding: '8px',
  },
  settingsDrawer: {
    position: 'fixed',
    top: '96px',
    right: '24px',
    width: '280px',
    borderRadius: '16px',
    padding: '20px',
    backgroundColor: 'rgba(10, 8, 25, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    zIndex: 1001,
  },
  settingsHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '8px',
  },
  settingsTitle: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    letterSpacing: '0.08em',
  },
  closeSettingsBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-dark)',
    cursor: 'pointer',
  },
  settingsBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  settingGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  settingGroupToggle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: '0.62rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  settingLabelInline: {
    fontSize: '0.68rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
  },
  themeOptionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '8px',
  },
  themeBtn: {
    padding: '6px',
    borderRadius: '8px',
    border: '1px solid transparent',
    fontSize: '0.65rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-bright)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  toggleCheckbox: {
    cursor: 'pointer',
    width: '14px',
    height: '14px',
  },
  mainContent: {
    flex: 1,
  },
  footer: {
    padding: '30px 0',
    backgroundColor: 'rgba(7, 5, 20, 0.85)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyText: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  madeWith: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
  },

  // ── Keyboard Shortcuts ───────────────────────────────────────
  shortcutsHintBtn: {
    position: 'fixed',
    bottom: '88px',
    left: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '6px 10px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    zIndex: 990,
    transition: 'all 0.2s ease',
  },
  shortcutsBackdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 9998,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutsModal: {
    width: '340px',
    maxWidth: 'calc(100vw - 40px)',
    padding: '0',
    borderRadius: '16px',
    backgroundColor: 'rgba(10,8,25,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  shortcutsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  shortcutsTitle: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    color: 'var(--text-bright)',
    letterSpacing: '0.1em',
  },
  shortcutsBody: {
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  shortcutRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  kbdKey: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    padding: '3px 8px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderBottom: '2px solid rgba(255,255,255,0.18)',
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    color: 'var(--text-bright)',
    letterSpacing: '0.02em',
    flexShrink: 0,
  },
  shortcutDesc: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-body)',
  },
  shortcutsFooter: {
    padding: '12px 20px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    fontSize: '0.68rem',
    color: 'var(--text-dark)',
    fontFamily: 'var(--font-mono)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};

