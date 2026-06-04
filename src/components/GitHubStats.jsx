import { useState, useEffect, useRef } from 'react';
import { Star, Users, GitFork, Code2, ExternalLink } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

// ── Change this to your GitHub username ──────────────────────────────────────
const GITHUB_USERNAME = 'Shiva134-ui';
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedCounter({ target, duration = 1200, suffix = '' }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || target === null) return;
    startedRef.current = true;
    if (target === 0) return;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  if (target === null) {
    return (
      <span style={{
        display: 'inline-block',
        width: '40px',
        height: '20px',
        borderRadius: '4px',
        background: 'rgba(255,255,255,0.06)',
        animation: 'shimmer 1.5s infinite',
        verticalAlign: 'middle',
      }} />
    );
  }
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function GitHubStats() {
  const [sectionRef, sectionVisible] = useScrollReveal();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (sectionVisible && !triggered) {
      setTriggered(true);
    }
  }, [sectionVisible]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, { signal: controller.signal }),
        ]);

        if (!userRes.ok) throw new Error('GitHub API error');

        const user = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];

        // Sum stars across repos
        const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

        // Find most-used language
        const langMap = {};
        repos.forEach(r => {
          if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
        });
        const topLang = Object.entries(langMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Python';

        setStats({
          repos: user.public_repos || 0,
          followers: user.followers || 0,
          stars: totalStars,
          topLang,
          profileUrl: user.html_url,
          avatarUrl: user.avatar_url,
        });
      } catch (e) {
        if (e.name !== 'AbortError') setError(true);
      }
    }

    fetchStats();
    return () => controller.abort();
  }, []);

  const metrics = [
    {
      label: 'PUBLIC REPOS',
      value: stats?.repos ?? null,
      icon: <Code2 size={18} />,
      color: 'var(--color-cloud-cyan)',
    },
    {
      label: 'TOTAL STARS',
      value: stats?.stars ?? null,
      icon: <Star size={18} />,
      color: 'var(--color-ai-magenta)',
    },
    {
      label: 'FOLLOWERS',
      value: stats?.followers ?? null,
      icon: <Users size={18} />,
      color: 'var(--color-cyber-purple)',
    },
    {
      label: 'TOP LANGUAGE',
      value: stats?.topLang ?? null,
      icon: <Code2 size={18} />,
      color: 'var(--color-cloud-cyan)',
      isText: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg-panel-dark)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '28px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          {/* Left label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dark)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                LIVE GITHUB TELEMETRY
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '1px' }}>
                @{GITHUB_USERNAME}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'center',
          }}>
            {metrics.map((m) => (
              <div
                key={m.label}
                className={`glass-panel ${sectionVisible ? 'reveal-up visible' : 'reveal-up'}`}
                style={{
                  padding: '14px 20px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '130px',
                  border: `1px solid rgba(255,255,255,0.06)`,
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ color: m.color, opacity: 0.8, flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: m.isText ? '1rem' : '1.4rem',
                    fontFamily: m.isText ? 'var(--font-mono)' : 'var(--font-display)',
                    fontWeight: '700',
                    color: error ? 'var(--text-dark)' : 'var(--text-pure)',
                    lineHeight: 1,
                    marginBottom: '3px',
                  }}>
                    {error ? '—' : (
                      m.isText
                        ? (stats?.topLang ?? <span style={{ display: 'inline-block', width: '50px', height: '14px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', animation: 'shimmer 1.5s infinite' }} />)
                        : (triggered ? <AnimatedCounter target={m.value} /> : '—')
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.58rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dark)',
                    letterSpacing: '0.08em',
                  }}>
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href={stats?.profileUrl || `https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              padding: '10px 20px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderRadius: '24px',
            }}
          >
            <ExternalLink size={14} />
            VIEW PROFILE
          </a>
        </div>
      </div>
    </section>
  );
}
