import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, CheckCircle2, Clock, Zap,
  Code2, Layers, Activity, Lightbulb, AlertTriangle, Monitor,
  PlayCircle, Layout, ShieldCheck, ChevronRight
} from 'lucide-react';
import { getProjectBySlug, PROJECT_CATEGORIES } from '../data/projects';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (project) {
      document.title = `${project.title} — Madesh Portfolio`;
      if (project.screenshots?.length > 0) {
        setActiveTab(project.screenshots[0].id);
      }
    }
    return () => { document.title = 'Madesh Portfolio'; };
  }, [project]);

  if (!project) {
    return (
      <div className="pd-not-found">
        <div className="container">
          <h2 style={{ color: 'var(--text-bright)', marginBottom: '12px' }}>Project not found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            The project you're looking for doesn't exist or has been removed.
          </p>
          <button className="pd-back-btn" onClick={() => navigate('/projects')}>
            <ArrowLeft size={15} /> Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const categoryLabel = PROJECT_CATEGORIES.find(c => c.id === project.category)?.label || project.category;
  const statusColor = project.status === 'completed' ? '#27c93f' : '#ffbd2e';

  return (
    <div className="pd-page">
      {/* ── HERO ── */}
      <div className="pd-hero">
        {project.thumbnail && (
          <div className="pd-hero-bg">
            <img src={project.thumbnail} alt="" className="pd-hero-bg-img" loading="lazy" />
            <div className="pd-hero-bg-overlay" />
          </div>
        )}
        <div className="container pd-hero-content">
          {/* Breadcrumb */}
          <nav className="pd-breadcrumb">
            <button className="pd-breadcrumb-btn" onClick={() => navigate('/')}>Home</button>
            <ChevronRight size={13} style={{ color: 'var(--text-dark)' }} />
            <button className="pd-breadcrumb-btn" onClick={() => navigate('/projects')}>Projects</button>
            <ChevronRight size={13} style={{ color: 'var(--text-dark)' }} />
            <span style={{ color: 'var(--text-muted)' }}>{project.title}</span>
          </nav>

          <div className="pd-hero-meta">
            <span className="pd-hero-category">{categoryLabel}</span>
            <span className="pd-hero-status" style={{ color: statusColor, borderColor: `${statusColor}40`, backgroundColor: `${statusColor}12` }}>
              {project.status === 'completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
            <span className="pd-hero-year">{project.year}</span>
          </div>

          <h1 className="pd-hero-title">{project.title}</h1>
          <p className="pd-hero-subtitle">{project.subtitle}</p>

          {/* Action buttons */}
          <div className="pd-hero-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn--primary">
                <GithubIcon size={16} /> GitHub Repository
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn--primary">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            <button className="pd-btn pd-btn--ghost" onClick={() => navigate('/projects')}>
              <ArrowLeft size={15} /> All Projects
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="pd-body">
        <div className="container pd-layout">

          {/* ── LEFT — main content ── */}
          <div className="pd-main">

            {/* Overview */}
            <section className="pd-section">
              <div className="pd-section-heading">
                <Layers size={15} />
                Project Overview
              </div>
              <p className="pd-section-text">{project.overview}</p>
            </section>

            {/* Screenshots gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <section className="pd-section">
                <div className="pd-section-heading">
                  <Monitor size={15} />
                  Screenshots
                </div>
                <div className="pd-screenshot-tabs">
                  {project.screenshots.map(s => (
                    <button
                      key={s.id}
                      className={`pd-tab-btn ${activeTab === s.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className="pd-screenshot-window">
                  <div className="pd-screenshot-topbar">
                    <span className="pd-dot" style={{ background: '#ff5f56' }} />
                    <span className="pd-dot" style={{ background: '#ffbd2e' }} />
                    <span className="pd-dot" style={{ background: '#27c93f' }} />
                    <span className="pd-topbar-url">
                      {project.demo ? project.demo.replace('https://', '') : project.slug}
                      /{activeTab}
                    </span>
                  </div>
                  {project.screenshots.map(s => (
                    activeTab === s.id && s.image && (
                      <img
                        key={s.id}
                        src={s.image}
                        alt={`${project.title} ${s.label}`}
                        className="pd-screenshot-img"
                        loading="lazy"
                      />
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section className="pd-section">
                <div className="pd-section-heading">
                  <CheckCircle2 size={15} />
                  Key Features
                </div>
                <div className="pd-features-grid">
                  {project.features.map((f, i) => (
                    <div key={i} className="pd-feature-item glass-panel">
                      <Zap size={13} className="pd-feature-icon" />
                      <span className="pd-feature-text">{f}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Architecture */}
            {project.architecture && (
              <section className="pd-section">
                <div className="pd-section-heading">
                  <Layers size={15} />
                  Architecture
                </div>
                <div className="pd-architecture-block glass-panel">
                  <Code2 size={14} className="pd-arch-icon" />
                  <p className="pd-section-text" style={{ margin: 0 }}>{project.architecture}</p>
                </div>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section className="pd-section">
                <div className="pd-section-heading">
                  <AlertTriangle size={15} />
                  Challenges Faced
                </div>
                <div className="pd-challenges-list">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="pd-challenge-card glass-panel">
                      <h4 className="pd-challenge-title">{c.title}</h4>
                      <p className="pd-challenge-desc">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Future Improvements */}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <section className="pd-section">
                <div className="pd-section-heading">
                  <Lightbulb size={15} />
                  Future Improvements
                </div>
                <ul className="pd-future-list">
                  {project.futureImprovements.map((f, i) => (
                    <li key={i} className="pd-future-item">
                      <ChevronRight size={13} style={{ color: 'var(--color-cloud-cyan)', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* ── RIGHT — sidebar ── */}
          <aside className="pd-sidebar">
            {/* Tech Stack card */}
            <div className="pd-sidebar-card glass-panel">
              <div className="pd-sidebar-card-title">
                <Code2 size={14} /> Tech Stack
              </div>
              <div className="pd-sidebar-techs">
                {project.techs.map(t => (
                  <span key={t} className="pd-sidebar-tech-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Metrics card */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="pd-sidebar-card glass-panel">
                <div className="pd-sidebar-card-title">
                  <Activity size={14} /> Engineering Metrics
                </div>
                <div className="pd-metrics-list">
                  {project.metrics.map(m => (
                    <div key={m.label} className="pd-metric-row">
                      <span className="pd-metric-val">{m.val}</span>
                      <span className="pd-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links card */}
            {(project.github || project.demo) && (
              <div className="pd-sidebar-card glass-panel">
                <div className="pd-sidebar-card-title">
                  <ExternalLink size={14} /> Links
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="pd-link-item">
                      <GithubIcon size={14} />
                      <span>GitHub Repository</span>
                      <ExternalLink size={11} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pd-link-item">
                      <Monitor size={14} />
                      <span>Live Demo</span>
                      <ExternalLink size={11} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Project info card */}
            <div className="pd-sidebar-card glass-panel">
              <div className="pd-sidebar-card-title">
                <Layout size={14} /> Project Info
              </div>
              <div className="pd-info-rows">
                <div className="pd-info-row">
                  <span className="pd-info-lbl">Category</span>
                  <span className="pd-info-val">{categoryLabel}</span>
                </div>
                <div className="pd-info-row">
                  <span className="pd-info-lbl">Year</span>
                  <span className="pd-info-val">{project.year}</span>
                </div>
                <div className="pd-info-row">
                  <span className="pd-info-lbl">Status</span>
                  <span className="pd-info-val" style={{ color: statusColor }}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                {project.featured && (
                  <div className="pd-info-row">
                    <span className="pd-info-lbl">Featured</span>
                    <span className="pd-info-val" style={{ color: 'var(--color-cloud-cyan)' }}>★ Yes</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
