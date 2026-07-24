import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, X, ExternalLink, SlidersHorizontal,
  ArrowLeft, Clock, CheckCircle2, Zap, Filter
} from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'featured', label: 'Featured' },
  { id: 'az', label: 'A → Z' },
];

const PAGE_SIZE = 12;

// Gradient thumbnail placeholder for projects without real thumbnails
const PlaceholderThumb = ({ title, category }) => {
  const gradients = {
    'full-stack': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'devops': 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
    'cloud': 'linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #103060 100%)',
    'networking': 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #2a0a0a 100%)',
    'frontend': 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a4e 100%)',
    'backend': 'linear-gradient(135deg, #0a1a0a 0%, #0d2d0d 50%, #0a2a1a 100%)',
    'default': 'linear-gradient(135deg, #111111 0%, #1c1c1c 50%, #111111 100%)',
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

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Projects — Madesh Portfolio';
    return () => { document.title = 'Madesh Portfolio'; };
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, activeCategory, activeSort]);

  const filtered = useMemo(() => {
    let list = [...PROJECTS];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.techs.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Sort
    switch (activeSort) {
      case 'newest': list.sort((a, b) => b.year - a.year); break;
      case 'oldest': list.sort((a, b) => a.year - b.year); break;
      case 'featured': list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      case 'az': list.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return list;
  }, [search, activeCategory, activeSort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearSearch = useCallback(() => setSearch(''), []);

  return (
    <div className="proj-page">
      {/* ── PAGE HEADER ── */}
      <div className="proj-page-hero">
        <div className="container">
          <button className="proj-back-btn" onClick={() => navigate('/', { replace: false })}>
            <ArrowLeft size={15} />
            Back to Portfolio
          </button>
          <div className="proj-page-hero-content">
            <span className="badge badge-ai" style={{ marginBottom: '12px' }}>PROJECT SHOWCASE</span>
            <h1 className="proj-page-title">All Projects</h1>
            <p className="proj-page-subtitle">
              Every build, experiment, and production system — from streaming platforms to DevOps labs.
            </p>
          </div>

          {/* Stats row */}
          <div className="proj-stats-row">
            <div className="proj-stat">
              <span className="proj-stat-val">{PROJECTS.length}</span>
              <span className="proj-stat-lbl">Total Projects</span>
            </div>
            <div className="proj-stat-divider" />
            <div className="proj-stat">
              <span className="proj-stat-val">{PROJECTS.filter(p => p.status === 'completed').length}</span>
              <span className="proj-stat-lbl">Completed</span>
            </div>
            <div className="proj-stat-divider" />
            <div className="proj-stat">
              <span className="proj-stat-val">{PROJECTS.filter(p => p.status === 'in-progress').length}</span>
              <span className="proj-stat-lbl">In Progress</span>
            </div>
            <div className="proj-stat-divider" />
            <div className="proj-stat">
              <span className="proj-stat-val">{PROJECTS.filter(p => p.featured).length}</span>
              <span className="proj-stat-lbl">Featured</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div className="proj-controls-bar">
        <div className="container">
          <div className="proj-controls-row">
            {/* Search */}
            <div className="proj-search-wrap">
              <Search size={16} className="proj-search-icon" />
              <input
                type="text"
                className="proj-search-input"
                placeholder="Search projects, technologies..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="proj-search-clear" onClick={clearSearch}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="proj-sort-wrap">
              <SlidersHorizontal size={14} style={{ color: 'var(--text-dark)' }} />
              <select
                className="proj-sort-select"
                value={activeSort}
                onChange={e => setActiveSort(e.target.value)}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Mobile filter toggle */}
            <button
              className="proj-filter-toggle-btn"
              onClick={() => setShowFilters(v => !v)}
            >
              <Filter size={14} />
              Filters
              {activeCategory !== 'all' && <span className="proj-filter-badge">1</span>}
            </button>
          </div>

          {/* Category pills */}
          <div className={`proj-category-pills ${showFilters ? 'proj-category-pills--open' : ''}`}>
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`proj-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="proj-results-meta">
            <span className="proj-results-count">
              {filtered.length === 0
                ? 'No projects found'
                : `${filtered.length} project${filtered.length !== 1 ? 's' : ''} found`}
            </span>
            {(search || activeCategory !== 'all') && (
              <button
                className="proj-clear-all-btn"
                onClick={() => { setSearch(''); setActiveCategory('all'); }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="proj-grid-section">
        <div className="container">
          {paged.length === 0 ? (
            <div className="proj-empty-state">
              <Search size={48} className="proj-empty-icon" />
              <h3 className="proj-empty-title">No projects found</h3>
              <p className="proj-empty-desc">Try adjusting your search or clearing the filters.</p>
              <button className="proj-clear-all-btn" style={{ marginTop: '16px' }}
                onClick={() => { setSearch(''); setActiveCategory('all'); }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="proj-cards-grid">
              {paged.map(project => (
                <ProjectCard key={project.slug} project={project} navigate={navigate} />
              ))}
            </div>
          )}

          {/* ── PAGINATION ── */}
          {totalPages > 1 && (
            <div className="proj-pagination">
              <button
                className="proj-page-btn proj-page-btn--prev"
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <div className="proj-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`proj-page-num ${n === page ? 'active' : ''}`}
                    onClick={() => { setPage(n); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                className="proj-page-btn proj-page-btn--next"
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, navigate }) {
  const statusColor = project.status === 'completed' ? '#27c93f' : '#ffbd2e';
  const statusLabel = project.status === 'completed' ? 'Completed' : 'In Progress';

  return (
    <div
      className="proj-card glass-panel"
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      {/* Thumbnail */}
      <div className="proj-card-thumb-wrap">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="proj-card-thumb"
            loading="lazy"
          />
        ) : (
          <PlaceholderThumb title={project.title} category={project.category} />
        )}
        {/* Badges overlay */}
        <div className="proj-card-thumb-badges">
          {project.featured && (
            <span className="proj-thumb-badge proj-thumb-badge--featured">★ Featured</span>
          )}
          <span className="proj-thumb-badge" style={{ color: statusColor, borderColor: `${statusColor}40`, backgroundColor: `${statusColor}15` }}>
            {project.status === 'completed'
              ? <CheckCircle2 size={10} />
              : <Clock size={10} />}
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="proj-card-body">
        <div className="proj-card-category">
          {PROJECT_CATEGORIES.find(c => c.id === project.category)?.label || project.category}
          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-dark)' }}>{project.year}</span>
        </div>
        <h3 className="proj-card-title">{project.title}</h3>
        <p className="proj-card-desc">{project.desc}</p>

        {/* Tech stack */}
        <div className="proj-card-techs">
          {project.techs.slice(0, 4).map(t => (
            <span key={t} className="proj-card-tech-tag">{t}</span>
          ))}
          {project.techs.length > 4 && (
            <span className="proj-card-tech-tag proj-card-tech-more">+{project.techs.length - 4}</span>
          )}
        </div>

        {/* Actions */}
        <div className="proj-card-actions" onClick={e => e.stopPropagation()}>
          <button className="proj-card-details-btn" onClick={() => navigate(`/projects/${project.slug}`)}>
            <Zap size={12} /> View Details
          </button>
          <div className="proj-card-icon-btns">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-card-icon-btn" title="GitHub">
                <GithubIcon size={15} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-card-icon-btn" title="Live Demo">
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
