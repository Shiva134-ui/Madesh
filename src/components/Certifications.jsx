import { useState } from 'react';
import { Award, CheckCircle, ExternalLink, Shield, X, ImageIcon } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Certifications() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState('');

  const certifications = [
    {
      id: 1,
      title: 'Claude with Google Vertex AI',
      subtitle: 'Developer Course Completion',
      body: 'Anthropic',
      credential: 'Certificate No: u9u2smxzy3sx',
      color: 'var(--color-ai-magenta)',
      domains: [
        'Anthropic Claude API Integration',
        'Google Vertex AI Platform',
        'AI Application Architecture'
      ],
      link: 'https://verify.skilljar.com/c/u9u2smxzy3sx',
      image: null
    },
    {
      id: 2,
      title: 'C++ Programming',
      subtitle: 'Course Completion Certificate',
      body: 'GreyLearn',
      credential: 'Issued by GreyLearn · 08 July 2026',
      color: 'var(--color-cloud-cyan)',
      domains: [
        'C++ Syntax & Object-Oriented Programming',
        'Memory Management & Pointers',
        'Data Structures in C++'
      ],
      link: null,
      image: '/certs/cert-cpp.png'
    },
    {
      id: 3,
      title: 'Advanced Excel',
      subtitle: 'Course Completion Certificate',
      body: 'GreyLearn',
      credential: 'Issued by GreyLearn · 08 July 2026',
      color: 'var(--color-cyber-purple)',
      domains: [
        'Advanced Formulas & Functions',
        'Data Analysis & Pivot Tables',
        'Spreadsheet Automation'
      ],
      link: null,
      image: '/certs/cert-excel.png'
    }
  ];

  const openLightbox = (image, title) => {
    setLightboxImage(image);
    setLightboxTitle(title);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle('');
  };

  return (
    <>
      <section id="certifications" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
        <div className="grid-bg" style={{ opacity: 0.08 }} />
        <div className="container">
          
          <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
            <span className="badge badge-ai" style={{ marginBottom: '10px' }}>VERIFIED SKILLS</span>
            <h2 className="section-title">Verified Credentials</h2>
            <p className="section-subtitle">
              Completed certifications and courses that have strengthened my technical knowledge and skills.
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

                {/* Action Buttons */}
                <div style={styles.btnGroup}>
                  {cert.link && (
                    <button 
                      className="btn btn-secondary" 
                      style={{...styles.actionBtn, borderColor: `${cert.color}40`, color: cert.color}}
                      onClick={() => window.open(cert.link, '_blank')}
                    >
                      <ExternalLink size={14} />
                      Verify Online
                    </button>
                  )}
                  {cert.image && (
                    <button 
                      className="btn btn-secondary" 
                      style={{...styles.actionBtn, borderColor: `${cert.color}40`, color: cert.color}}
                      onClick={() => openLightbox(cert.image, cert.title)}
                    >
                      <ImageIcon size={14} />
                      View Certificate
                    </button>
                  )}
                  {!cert.link && !cert.image && (
                    <div style={styles.issuedLabel}>
                      Certificate Issued
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CERTIFICATE IMAGE LIGHTBOX */}
      {lightboxImage && (
        <div
          style={styles.lightboxBackdrop}
          onClick={closeLightbox}
        >
          <div style={styles.lightboxContainer} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={styles.lightboxHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={16} style={{ color: 'var(--color-cloud-cyan)' }} />
                <span style={styles.lightboxTitle}>{lightboxTitle}</span>
              </div>
              <button onClick={closeLightbox} style={styles.lightboxClose}>
                <X size={18} />
              </button>
            </div>

            {/* Certificate Image */}
            <div style={styles.lightboxImageWrap}>
              <img
                src={lightboxImage}
                alt={lightboxTitle}
                style={styles.lightboxImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback if image not found */}
              <div style={styles.lightboxFallback}>
                <ImageIcon size={40} style={{ color: 'var(--text-dark)', marginBottom: '12px' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
                  Certificate image not found.<br />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                    Please add the image to <code>public/certs/</code>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '20px',
    width: '100%',
    flexWrap: 'wrap',
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
    maxWidth: '380px',
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
    fontSize: '1.15rem',
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
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'relative',
    zIndex: 5,
  },
  actionBtn: {
    width: '100%',
    padding: '10px',
    fontSize: '0.82rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  issuedLabel: {
    width: '100%',
    padding: '10px',
    fontSize: '0.82rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    border: '1px solid rgba(255,255,255,0.05)',
    color: 'var(--text-dark)',
  },

  // Lightbox
  lightboxBackdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  lightboxContainer: {
    backgroundColor: 'rgba(10,8,25,0.98)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
  },
  lightboxHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexShrink: 0,
  },
  lightboxTitle: {
    fontSize: '0.85rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    color: 'var(--text-bright)',
    letterSpacing: '0.05em',
  },
  lightboxClose: {
    background: 'none',
    border: 'none',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '6px',
    transition: 'color 0.2s',
  },
  lightboxImageWrap: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    minHeight: '300px',
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '70vh',
    borderRadius: '8px',
    objectFit: 'contain',
    boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
  },
  lightboxFallback: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
  },
};
