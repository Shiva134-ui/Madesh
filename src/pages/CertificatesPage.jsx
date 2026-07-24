import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, X, ArrowLeft, Award, Shield, ExternalLink,
  SlidersHorizontal, Filter, CheckCircle, ImageIcon
} from 'lucide-react';
import { CERTIFICATES, CERT_ISSUERS } from '../data/certificates';

const PAGE_SIZE = 12;

// Gradient placeholder for certs without images
const CertPlaceholder = ({ title, issuer, color }) => {
  const initials = issuer.slice(0, 2).toUpperCase();
  return (
    <div className="cert-card-thumb-placeholder" style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.95) 100%)` }}>
      <div className="cert-placeholder-icon" style={{ borderColor: `${color}40`, backgroundColor: `${color}10` }}>
        <Award size={32} style={{ color }} />
      </div>
      <span className="cert-placeholder-issuer" style={{ color }}>{initials}</span>
      <div className="cert-placeholder-lines">
        <div className="cert-placeholder-line cert-placeholder-line--long" />
        <div className="cert-placeholder-line cert-placeholder-line--short" />
      </div>
    </div>
  );
};

export default function CertificatesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeIssuer, setActiveIssuer] = useState('all');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Certificates — Madesh Portfolio';
    return () => { document.title = 'Madesh Portfolio'; };
  }, []);

  useEffect(() => { setPage(1); }, [search, activeIssuer]);

  const filtered = useMemo(() => {
    let list = [...CERTIFICATES];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.skills?.some(s => s.toLowerCase().includes(q))
      );
    }
    if (activeIssuer !== 'all') {
      list = list.filter(c => c.issuerCategory === activeIssuer);
    }
    return list;
  }, [search, activeIssuer]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const clearSearch = useCallback(() => setSearch(''), []);

  return (
    <div className="cert-page">
      {/* ── PAGE HEADER ── */}
      <div className="cert-page-hero">
        <div className="container">
          <button className="proj-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={15} /> Back to Portfolio
          </button>
          <div className="cert-page-hero-content">
            <span className="badge badge-ai" style={{ marginBottom: '12px' }}>VERIFIED SKILLS</span>
            <h1 className="proj-page-title">All Certificates</h1>
            <p className="proj-page-subtitle">
              Verified credentials, course completions, and professional certifications.
            </p>
          </div>

          {/* Stats */}
          <div className="proj-stats-row">
            <div className="proj-stat">
              <span className="proj-stat-val">{CERTIFICATES.length}</span>
              <span className="proj-stat-lbl">Total Certificates</span>
            </div>
            <div className="proj-stat-divider" />
            <div className="proj-stat">
              <span className="proj-stat-val">{[...new Set(CERTIFICATES.map(c => c.issuer))].length}</span>
              <span className="proj-stat-lbl">Unique Issuers</span>
            </div>
            <div className="proj-stat-divider" />
            <div className="proj-stat">
              <span className="proj-stat-val">{CERTIFICATES.filter(c => c.verifyUrl).length}</span>
              <span className="proj-stat-lbl">Verifiable</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div className="proj-controls-bar">
        <div className="container">
          <div className="proj-controls-row">
            <div className="proj-search-wrap">
              <Search size={16} className="proj-search-icon" />
              <input
                type="text"
                className="proj-search-input"
                placeholder="Search certificates, issuers, skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="proj-search-clear" onClick={clearSearch}><X size={14} /></button>
              )}
            </div>
            <button
              className="proj-filter-toggle-btn"
              onClick={() => setShowFilters(v => !v)}
            >
              <Filter size={14} /> Issuers
              {activeIssuer !== 'all' && <span className="proj-filter-badge">1</span>}
            </button>
          </div>

          {/* Issuer pills */}
          <div className={`proj-category-pills ${showFilters ? 'proj-category-pills--open' : ''}`}>
            {CERT_ISSUERS.map(iss => (
              <button
                key={iss.id}
                className={`proj-cat-pill ${activeIssuer === iss.id ? 'active' : ''}`}
                onClick={() => setActiveIssuer(iss.id)}
              >
                {iss.label}
              </button>
            ))}
          </div>

          <div className="proj-results-meta">
            <span className="proj-results-count">
              {filtered.length === 0 ? 'No certificates found'
                : `${filtered.length} certificate${filtered.length !== 1 ? 's' : ''} found`}
            </span>
            {(search || activeIssuer !== 'all') && (
              <button className="proj-clear-all-btn"
                onClick={() => { setSearch(''); setActiveIssuer('all'); }}>
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CERTS GRID ── */}
      <div className="proj-grid-section">
        <div className="container">
          {paged.length === 0 ? (
            <div className="proj-empty-state">
              <Award size={48} className="proj-empty-icon" />
              <h3 className="proj-empty-title">No certificates found</h3>
              <p className="proj-empty-desc">Try adjusting your search or clearing the filters.</p>
              <button className="proj-clear-all-btn" style={{ marginTop: '16px' }}
                onClick={() => { setSearch(''); setActiveIssuer('all'); }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="proj-cards-grid">
              {paged.map(cert => (
                <CertCard key={cert.slug} cert={cert} navigate={navigate} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="proj-pagination">
              <button
                className="proj-page-btn proj-page-btn--prev"
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={page === 1}
              >← Prev</button>
              <div className="proj-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`proj-page-num ${n === page ? 'active' : ''}`}
                    onClick={() => { setPage(n); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  >{n}</button>
                ))}
              </div>
              <button
                className="proj-page-btn proj-page-btn--next"
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={page === totalPages}
              >Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert, navigate }) {
  return (
    <div
      className="cert-card glass-panel"
      onClick={() => navigate(`/certificates/${cert.slug}`)}
    >
      {/* Thumbnail */}
      <div className="cert-card-thumb-wrap">
        {cert.image ? (
          <img src={cert.image} alt={cert.title} className="cert-card-thumb" loading="lazy" />
        ) : (
          <CertPlaceholder title={cert.title} issuer={cert.issuer} color={cert.color} />
        )}
        <div className="cert-card-thumb-badges">
          {cert.verifyUrl && (
            <span className="proj-thumb-badge" style={{ color: '#27c93f', borderColor: '#27c93f40', backgroundColor: '#27c93f15' }}>
              <CheckCircle size={10} /> Verified
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="proj-card-body">
        <div className="proj-card-category">
          {cert.issuer}
          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-dark)' }}>{cert.issueDate}</span>
        </div>
        <h3 className="proj-card-title">{cert.title}</h3>
        <p className="proj-card-desc" style={{ fontSize: '0.82rem' }}>{cert.subtitle}</p>

        {/* Skills preview */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="proj-card-techs">
            {cert.skills.slice(0, 3).map(s => (
              <span key={s} className="proj-card-tech-tag">{s}</span>
            ))}
            {cert.skills.length > 3 && (
              <span className="proj-card-tech-tag proj-card-tech-more">+{cert.skills.length - 3}</span>
            )}
          </div>
        )}

        {cert.credentialId && (
          <div className="cert-card-cred-id">
            <Shield size={10} /> {cert.credentialId}
          </div>
        )}

        {/* Actions */}
        <div className="proj-card-actions" onClick={e => e.stopPropagation()}>
          <button className="proj-card-details-btn" onClick={() => navigate(`/certificates/${cert.slug}`)}>
            <Award size={12} /> View Details
          </button>
          {cert.verifyUrl && (
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="proj-card-icon-btn" title="Verify Certificate">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
