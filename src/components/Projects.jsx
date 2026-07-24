import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink, ArrowRight, CheckCircle2, Clock,
  Zap, ChevronRight, PlayCircle, Globe, Cloud, Wrench, Settings, Cpu
} from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { getFeaturedProjects, PROJECT_CATEGORIES } from '../data/projects';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Category icon map for visual variety
const CATEGORY_ICONS = {
  'full-stack': <Globe size={18} />,
  'cloud': <Cloud size={18} />,
  'devops': <Wrench size={18} />,
  'networking': <Cpu size={18} />,
  'tools': <Settings size={18} />,
  'default': <PlayCircle size={18} />,
};

// Gradient placeholder for projects without a thumbnail
const PlaceholderThumb = ({ title, category }) => {
  const gradients = {
    'full-stack': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'devops': 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
    'cloud': 'linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #103060 100%)',
    'networking': 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #2a0a0a 100%)',
    'default': 'linear-gradient(135deg, #111111 0%, #1c1c1c 100%)',
  };
  const bg = gradients[category] || gradients.default;
  const initials = title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="proj-card-thumb-placeholder" style={{ background: bg }}>
      <span className="proj-card-thumb-initials">{initials}</span>
      <div className="proj-card-thumb-grid" />
    </div>
  );
};

export default function Projects() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();

  const featuredProjects = getFeaturedProjects(6);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <div className="container">

        {/* Section Header */}
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>PROJECT SHOWCASE</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of production platforms and engineering projects. Built to demonstrate
            high-performance architecture, cloud infrastructure, and real-world problem solving.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div ref={contentRef} style={styles.grid} className={`stagger-container ${contentVisible ? 'visible' : ''}`}>
          {featuredProjects.map(project => {
            const statusColor = project.status === 'completed' ? '#27c93f' : '#ffbd2e';
            const catIcon = CATEGORY_ICONS[project.category] || CATEGORY_ICONS.default;
            const catLabel = PROJECT_CATEGORIES.find(c => c.id === project.category)?.label || project.category;

            return (
              <div
                key={project.slug}
                className="glass-panel reveal-up stagger-item project-grid-card"
                style={styles.card}
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                {/* Thumbnail */}
                <div className="proj-card-thumb-wrap" style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden', marginBottom: '16px', margin: '-24px -24px 16px -24px' }}>
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ height: '160px' }}>
                      <PlaceholderThumb title={project.title} category={project.category} />
                    </div>
                  )}
                </div>

                {/* Card Header */}
                <div style={styles.cardHeader}>
                  <div style={{ ...styles.iconContainer, color: 'var(--color-cloud-cyan)', border: '1px solid var(--color-glass-border)' }}>
                    {catIcon}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {project.featured && (
                      <span className="badge badge-ai" style={{ fontSize: '0.63rem', letterSpacing: '0.08em', borderColor: 'var(--color-cloud-cyan)', color: 'var(--color-cloud-cyan)' }}>
                        ★ FEATURED
                      </span>
                    )}
                    <span className="badge badge-ai" style={{ fontSize: '0.66rem', color: statusColor }}>
                      {project.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>

                {/* Title & Category */}
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--color-cloud-cyan)', marginBottom: '8px' }}>
                  {catLabel}
                </div>
                <p style={styles.cardDesc}>{project.desc}</p>

                {/* Tech Tags */}
                <div style={styles.techTags}>
                  {project.techs.slice(0, 4).map(t => (
                    <span key={t} className="badge" style={styles.techTag}>{t}</span>
                  ))}
                  {project.techs.length > 4 && (
                    <span className="badge" style={{ ...styles.techTag, color: 'var(--text-dark)' }}>+{project.techs.length - 4}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={styles.actions} onClick={e => e.stopPropagation()}>
                  <button
                    className="btn-details-trigger"
                    onClick={() => navigate(`/projects/${project.slug}`)}
                  >
                    <Zap size={12} />
                    <span>View Details</span>
                  </button>
                  <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="btn-icon" style={styles.actionBtn} title="GitHub">
                        <GithubIcon size={16} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="btn-icon" style={styles.actionBtn} title="Live Demo">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div style={styles.viewAllWrap}>
          <button
            className="proj-view-all-btn"
            onClick={() => navigate('/projects')}
          >
            View All Projects
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
    marginBottom: '40px',
  },
  card: {
    padding: '24px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  iconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    color: 'var(--text-bright)',
    marginBottom: '6px',
  },
  cardDesc: {
    fontSize: '0.86rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    marginBottom: '14px',
    flex: 1,
  },
  techTags: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '18px',
  },
  techTag: {
    fontSize: '0.68rem',
    padding: '3px 8px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.05)',
    color: 'var(--text-dark)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginTop: 'auto',
  },
  actionBtn: {
    width: '34px',
    height: '34px',
  },
  viewAllWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8px',
  },
};
