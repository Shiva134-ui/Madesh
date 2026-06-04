import { Award, CheckCircle, ExternalLink, Shield } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Certifications() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const certifications = [
    {
      id: 1,
      title: 'Claude with Google Vertex AI',
      subtitle: 'Developer Course Completion',
      body: 'Anthropic',
      credential: 'Certificate No: u9u2smxzy3sx',
      color: 'var(--color-ai-magenta)',
      domains: [
        'Anthropic Claude Integration',
        'Google Vertex AI Platform',
        'AI Application Architecture'
      ],
      link: 'https://verify.skilljar.com/c/u9u2smxzy3sx'
    }
  ];

  return (
    <section id="certifications" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>VERIFIED SKILLS</span>
          <h2 className="section-title">Verified Credentials</h2>
          <p className="section-subtitle">
            Demonstrated capabilities in deploying and integrating state-of-the-art AI systems.
          </p>
        </div>

        <div ref={contentRef} style={styles.grid} className={`stagger-container ${contentVisible ? 'visible' : ''}`}>
          {certifications.map(cert => (
            <div key={cert.id} className="glass-panel reveal-zoom stagger-item" style={styles.card}>
              {/* Glow Behind */}
              <div 
                style={{
                  ...styles.glowAccent,
                  background: `radial-gradient(circle, ${cert.color}15 0%, transparent 70%)`
                }} 
              />

              {/* Icon & Shield Header */}
              <div style={styles.header}>
                <div style={{...styles.iconBg, color: cert.color, backgroundColor: `${cert.color}10`}}>
                  <Award size={22} />
                </div>
                <div style={styles.verifiedBadge}>
                  <Shield size={12} style={{ color: '#27c93f' }} />
                  <span style={styles.verifiedText}>VERIFIED</span>
                </div>
              </div>

              {/* Content */}
              <div style={styles.content}>
                <h3 style={styles.title}>{cert.title}</h3>
                <span style={{...styles.subtitle, color: cert.color}}>{cert.subtitle}</span>
                <span style={styles.bodyText}>{cert.body}</span>
                <span style={styles.credText}>{cert.credential}</span>
              </div>

              <div style={styles.divider} />

              {/* Cover Domains */}
              <div style={styles.domainsSection}>
                <span style={styles.domainsHeading}>KEY TESTED DOMAINS</span>
                <div style={styles.domainsList}>
                  {cert.domains.map(d => (
                    <div key={d} style={styles.domainItem}>
                      <CheckCircle size={12} style={{ color: cert.color, flexShrink: 0, marginTop: '2px' }} />
                      <span style={styles.domainText}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification CTA */}
              <button 
                className="btn btn-secondary" 
                style={{...styles.verifyBtn, borderColor: `${cert.color}40`, color: cert.color}}
                onClick={() => window.open(cert.link, '_blank')}
              >
                <ExternalLink size={14} />
                Verify Credential
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '20px',
    width: '100%',
  },
  card: {
    padding: '28px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '450px',
    width: '100%',
  },
  glowAccent: {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 5,
  },
  iconBg: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '12px',
    backgroundColor: 'rgba(39, 201, 63, 0.08)',
    border: '1px solid rgba(39, 201, 63, 0.15)',
  },
  verifiedText: {
    fontSize: '0.62rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    color: '#27c93f',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 5,
  },
  title: {
    fontSize: '1.2rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    color: 'var(--text-bright)',
    lineHeight: 1.25,
  },
  subtitle: {
    fontSize: '0.82rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    marginTop: '4px',
    letterSpacing: '0.05em',
  },
  bodyText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginTop: '6px',
  },
  credText: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    marginTop: '4px',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: '20px 0',
    position: 'relative',
    zIndex: 5,
  },
  domainsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
    position: 'relative',
    zIndex: 5,
    marginBottom: '24px',
  },
  domainsHeading: {
    fontSize: '0.68rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  domainsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  domainItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
  },
  domainText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: 1.45,
  },
  verifyBtn: {
    width: '100%',
    padding: '10px',
    fontSize: '0.82rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    position: 'relative',
    zIndex: 5,
  }
};
