import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Award, Shield, ExternalLink, CheckCircle,
  ChevronRight, Calendar, Hash, Zap, Code2
} from 'lucide-react';
import { getCertificateBySlug, CERT_ISSUERS } from '../data/certificates';
import { PROJECTS } from '../data/projects';

export default function CertificateDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cert = getCertificateBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (cert) {
      document.title = `${cert.title} — Madesh Portfolio`;
    }
    return () => { document.title = 'Madesh Portfolio'; };
  }, [cert]);

  if (!cert) {
    return (
      <div className="pd-not-found">
        <div className="container">
          <h2 style={{ color: 'var(--text-bright)', marginBottom: '12px' }}>Certificate not found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            This certificate doesn't exist or has been removed.
          </p>
          <button className="pd-back-btn" onClick={() => navigate('/certificates')}>
            <ArrowLeft size={15} /> Back to Certificates
          </button>
        </div>
      </div>
    );
  }

  const issuerLabel = CERT_ISSUERS.find(i => i.id === cert.issuerCategory)?.label || cert.issuer;
  const relatedProjects = (cert.relatedProjects || [])
    .map(slug => PROJECTS.find(p => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="pd-page">
      {/* ── HERO ── */}
      <div className="cd-hero">
        <div className="container pd-hero-content">
          {/* Breadcrumb */}
          <nav className="pd-breadcrumb">
            <button className="pd-breadcrumb-btn" onClick={() => navigate('/')}>Home</button>
            <ChevronRight size={13} style={{ color: 'var(--text-dark)' }} />
            <button className="pd-breadcrumb-btn" onClick={() => navigate('/certificates')}>Certificates</button>
            <ChevronRight size={13} style={{ color: 'var(--text-dark)' }} />
            <span style={{ color: 'var(--text-muted)' }}>{cert.title}</span>
          </nav>

          <div className="pd-hero-meta">
            <span className="pd-hero-category">{cert.issuer}</span>
            {cert.verifyUrl && (
              <span className="pd-hero-status" style={{ color: '#27c93f', borderColor: '#27c93f40', backgroundColor: '#27c93f12' }}>
                <CheckCircle size={12} /> Verified
              </span>
            )}
          </div>

          <h1 className="pd-hero-title">{cert.title}</h1>
          <p className="pd-hero-subtitle">{cert.subtitle}</p>

          <div className="pd-hero-actions">
            {cert.verifyUrl && (
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn--primary">
                <Shield size={16} /> Verify Certificate
              </a>
            )}
            <button className="pd-btn pd-btn--ghost" onClick={() => navigate('/certificates')}>
              <ArrowLeft size={15} /> All Certificates
            </button>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="pd-body">
        <div className="container pd-layout">

          {/* ── LEFT — main content ── */}
          <div className="pd-main">

            {/* Certificate Preview */}
            <section className="pd-section">
              <div className="pd-section-heading">
                <Award size={15} /> Certificate Preview
              </div>
              <div className="cd-preview-wrap">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cd-preview-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="cd-preview-placeholder glass-panel" style={{ borderColor: `${cert.color}30` }}>
                    <div className="cd-preview-badge" style={{ borderColor: `${cert.color}40`, background: `${cert.color}08` }}>
                      <Award size={64} style={{ color: cert.color, opacity: 0.8 }} />
                    </div>
                    <h2 className="cd-preview-title">{cert.title}</h2>
                    <p className="cd-preview-issuer" style={{ color: cert.color }}>{cert.issuer}</p>
                    <div className="cd-preview-ribbon" style={{ borderColor: `${cert.color}30` }}>
                      <Shield size={14} style={{ color: cert.color }} />
                      <span>{cert.verifyUrl ? 'Verified Certificate' : 'Certificate of Completion'}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="cd-preview-cred">
                        <Hash size={11} />
                        <span>{cert.credentialId}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Skills Learned */}
            {cert.skills && cert.skills.length > 0 && (
              <section className="pd-section">
                <div className="pd-section-heading">
                  <Zap size={15} /> Skills Learned
                </div>
                <div className="pd-features-grid">
                  {cert.skills.map((skill, i) => (
                    <div key={i} className="pd-feature-item glass-panel">
                      <CheckCircle size={13} className="pd-feature-icon" />
                      <span className="pd-feature-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <section className="pd-section">
                <div className="pd-section-heading">
                  <Code2 size={15} /> Related Projects
                </div>
                <div className="cd-related-projects">
                  {relatedProjects.map(p => (
                    <div
                      key={p.slug}
                      className="cd-related-card glass-panel"
                      onClick={() => navigate(`/projects/${p.slug}`)}
                    >
                      <div>
                        <div className="proj-card-title" style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{p.title}</div>
                        <p className="proj-card-desc" style={{ fontSize: '0.8rem', margin: 0 }}>{p.desc}</p>
                      </div>
                      <ChevronRight size={16} style={{ color: 'var(--text-dark)', flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="pd-sidebar">
            {/* Cert Info */}
            <div className="pd-sidebar-card glass-panel">
              <div className="pd-sidebar-card-title">
                <Award size={14} /> Certificate Info
              </div>
              <div className="pd-info-rows">
                <div className="pd-info-row">
                  <span className="pd-info-lbl">Issuer</span>
                  <span className="pd-info-val">{cert.issuer}</span>
                </div>
                <div className="pd-info-row">
                  <span className="pd-info-lbl">Date Issued</span>
                  <span className="pd-info-val">{cert.issueDate}</span>
                </div>
                {cert.credentialId && (
                  <div className="pd-info-row">
                    <span className="pd-info-lbl">Credential ID</span>
                    <span className="pd-info-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', wordBreak: 'break-all' }}>
                      {cert.credentialId}
                    </span>
                  </div>
                )}
                <div className="pd-info-row">
                  <span className="pd-info-lbl">Verified</span>
                  <span className="pd-info-val" style={{ color: cert.verifyUrl ? '#27c93f' : 'var(--text-dark)' }}>
                    {cert.verifyUrl ? '✓ Yes' : 'No link'}
                  </span>
                </div>
              </div>
            </div>

            {/* Verify button */}
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-btn pd-btn--primary"
                style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
              >
                <Shield size={15} /> Verify on {cert.issuer}
              </a>
            )}

            {/* Skills mini-list */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="pd-sidebar-card glass-panel">
                <div className="pd-sidebar-card-title">
                  <Zap size={14} /> Key Skills
                </div>
                <div className="pd-sidebar-techs">
                  {cert.skills.map(s => (
                    <span key={s} className="pd-sidebar-tech-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
