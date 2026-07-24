import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle, ExternalLink, Shield, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { getFeaturedCertificates } from '../data/certificates';

// Gradient placeholder for certs without images
const CertPlaceholder = ({ title, issuer, color }) => (
  <div style={{
    height: '140px',
    background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.95) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      width: '56px', height: '56px', borderRadius: '50%',
      border: `2px solid ${color}40`,
      backgroundColor: `${color}10`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Award size={28} style={{ color }} />
    </div>
    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color, letterSpacing: '0.08em' }}>
      {issuer.toUpperCase()}
    </span>
  </div>
);

export default function Certifications() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();

  const featuredCerts = getFeaturedCertificates(6);

  return (
    <section id="certifications" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <div className="container">

        {/* Section Header */}
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>VERIFIED SKILLS</span>
          <h2 className="section-title">Verified Credentials</h2>
          <p className="section-subtitle">
            Completed certifications and courses that have strengthened my technical knowledge and skills.
          </p>
        </div>

        {/* Cert Cards Grid */}
        <div
          ref={contentRef}
          className={`stagger-container ${contentVisible ? 'visible' : ''}`}
          style={styles.grid}
        >
          {featuredCerts.map(cert => (
            <div
              key={cert.slug}
              className="glass-panel reveal-zoom stagger-item"
              style={styles.card}
              onClick={() => navigate(`/certificates/${cert.slug}`)}
            >
              {/* Glow accent */}
              <div style={{
                position: 'absolute', top: '-50px', right: '-50px',
                width: '150px', height: '150px', borderRadius: '50%',
                background: `radial-gradient(circle, ${cert.color}15 0%, transparent 70%)`,
                zIndex: 1, pointerEvents: 'none',
              }} />

              {/* Thumbnail */}
              <div style={{ margin: '-28px -28px 18px -28px', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <CertPlaceholder title={cert.title} issuer={cert.issuer} color={cert.color} />
                )}
              </div>

              {/* Header */}
              <div style={styles.header}>
                <div style={{ ...styles.iconBg, color: cert.color, backgroundColor: `${cert.color}10` }}>
                  <Award size={20} />
                </div>
                {cert.verifyUrl && (
                  <div style={styles.verifiedBadge}>
                    <Shield size={11} style={{ color: '#27c93f' }} />
                    <span style={styles.verifiedText}>VERIFIED</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 5 }}>
                <h3 style={styles.title}>{cert.title}</h3>
                <span style={{ ...styles.subtitle, color: cert.color }}>{cert.subtitle}</span>
                <div style={styles.bodyText}>{cert.issuer}</div>
                <div style={styles.credText}>{cert.issueDate}</div>
              </div>

              <div style={styles.divider} />

              {/* Skills preview */}
              {cert.skills && cert.skills.length > 0 && (
                <div style={styles.domainsSection}>
                  <span style={styles.domainsHeading}>KEY SKILLS</span>
                  <div style={styles.domainsList}>
                    {cert.skills.slice(0, 3).map(s => (
                      <div key={s} style={styles.domainItem}>
                        <CheckCircle size={11} style={{ color: cert.color, flexShrink: 0, marginTop: '3px' }} />
                        <span style={styles.domainText}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={styles.btnGroup} onClick={e => e.stopPropagation()}>
                {cert.verifyUrl && (
                  <button
                    className="btn btn-secondary"
                    style={{ ...styles.actionBtn, borderColor: `${cert.color}40`, color: cert.color }}
                    onClick={() => window.open(cert.verifyUrl, '_blank')}
                  >
                    <ExternalLink size={13} /> Verify Online
                  </button>
                )}
                <button
                  className="btn btn-secondary"
                  style={{ ...styles.actionBtn, borderColor: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}
                  onClick={() => navigate(`/certificates/${cert.slug}`)}
                >
                  <Award size={13} /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button
            className="proj-view-all-btn"
            onClick={() => navigate('/certificates')}
          >
            View All Certificates
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '20px',
  },
  card: {
    padding: '28px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    position: 'relative',
    zIndex: 5,
  },
  iconBg: {
    width: '40px', height: '40px', borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  verifiedBadge: {
    display: 'flex', alignItems: 'center', gap: '4px',
    padding: '4px 10px', borderRadius: '12px',
    backgroundColor: 'rgba(39, 201, 63, 0.08)',
    border: '1px solid rgba(39, 201, 63, 0.15)',
  },
  verifiedText: {
    fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
    fontWeight: '600', color: '#27c93f',
  },
  title: {
    fontSize: '1.05rem', fontFamily: 'var(--font-display)',
    fontWeight: '700', color: 'var(--text-bright)', lineHeight: 1.25,
  },
  subtitle: {
    fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
    fontWeight: '600', marginTop: '4px', display: 'block', letterSpacing: '0.04em',
  },
  bodyText: {
    fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px',
  },
  credText: {
    fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)', marginTop: '4px',
  },
  divider: {
    height: '1px', backgroundColor: 'rgba(255,255,255,0.05)',
    margin: '16px 0', position: 'relative', zIndex: 5,
  },
  domainsSection: {
    display: 'flex', flexDirection: 'column', gap: '8px',
    flex: 1, position: 'relative', zIndex: 5, marginBottom: '20px',
  },
  domainsHeading: {
    fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)', letterSpacing: '0.06em',
  },
  domainsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  domainItem: { display: 'flex', gap: '8px', alignItems: 'flex-start' },
  domainText: { fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 },
  btnGroup: { display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 5 },
  actionBtn: {
    width: '100%', padding: '9px', fontSize: '0.8rem', borderRadius: '10px',
    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer',
  },
};
