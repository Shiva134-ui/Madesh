import { Cpu, Cloud, Settings, ExternalLink, Zap } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const Github = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


export default function Projects({ activeFilter, onFilterChange }) {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const projects = [
    {
      id: 'ai-classifier',
      title: 'AI Object Detection & Classification',
      category: 'ai-ml',
      icon: <Cpu size={18} />,
      color: 'var(--color-ai-magenta)',
      desc: 'A deep learning application leveraging PyTorch and YOLO models to classify and detect objects from image inputs in real time.',
      telemetry: 'Optimizes inference runtimes and image loading sequences to achieve processing latency under 45ms per frame on standard hardware.',
      techs: ['PyTorch', 'YOLO v8', 'OpenCV', 'FastAPI', 'Python'],
      github: 'https://github.com/Shiva134-ui',
      demo: '#'
    },
    {
      id: 'fullstack-dashboard',
      title: 'Full-Stack Dev-Analytics Dashboard',
      category: 'full-stack',
      icon: <Settings size={18} />,
      color: 'var(--color-cyber-purple)',
      desc: 'A modern, responsive web dashboard that aggregates system metrics, repository updates, and telemetry logs into a unified view.',
      telemetry: 'Built with React for UI, backed by a Node.js/Express API with custom caching and charts, securing user sessions via JWT.',
      techs: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite'],
      github: 'https://github.com/Shiva134-ui',
      demo: '#'
    },
    {
      id: 'serverless-pipeline',
      title: 'Serverless Cloud Data Pipeline',
      category: 'cloud-infra',
      icon: <Cloud size={18} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'A scalable cloud ingestion pipeline designed to ingest, process, and archive streaming telemetry metrics automatically.',
      telemetry: 'Uses AWS Lambda functions triggered by S3 data uploads, storing processed document states in DynamoDB with automated alerts.',
      techs: ['AWS Lambda', 'DynamoDB', 'S3 Buckets', 'Python', 'Terraform'],
      github: 'https://github.com/Shiva134-ui',
      demo: '#'
    },
    {
      id: 'selfhosted-homelab',
      title: 'Self-Hosted Private Cloud & Homelab',
      category: 'cloud-infra',
      icon: <Cloud size={18} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'A secure, containerized private cloud infrastructure self-hosted on local hardware with automated deployment workflows.',
      telemetry: 'Uses Docker Compose to manage home-cloud containers, Nginx reverse proxy for SSL routing, and local network DNS configs.',
      techs: ['Docker', 'Docker Compose', 'Nginx', 'Linux OS', 'GitHub Actions'],
      github: 'https://github.com/Shiva134-ui',
      demo: '#'
    }
  ];

  const handleFilterSelection = (filter) => {
    onFilterChange && onFilterChange(filter);
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const getFilterLabel = (filter) => {
    switch (filter) {
      case 'all': return 'ALL';
      case 'ai-ml': return 'AI & ML';
      case 'cloud-infra': return 'CLOUD & INFRA';
      case 'full-stack': return 'FULL STACK';
      default: return filter.toUpperCase();
    }
  };

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>PROJECT SHOWCASE</span>
          <h2 className="section-title">Systems Portfolio</h2>
          <p className="section-subtitle">
            A showcase of applications and systems combining custom AI classifiers, full-stack backends, and self-hosted environments.
          </p>
        </div>

        <div ref={contentRef} className={contentVisible ? 'visible' : ''}>
          {/* TAG FILTER NAVIGATION */}
          <div style={styles.filterBar} className="reveal-zoom projects-filter-bar">
            {['all', 'ai-ml', 'cloud-infra', 'full-stack'].map(filter => (
              <button
                key={filter}
                onClick={() => handleFilterSelection(filter)}
                style={{
                  ...styles.filterBtn,
                  color: activeFilter === filter ? 'var(--text-pure)' : 'var(--text-dark)',
                  backgroundColor: activeFilter === filter ? 'rgba(255,255,255,0.04)' : 'transparent',
                  borderColor: activeFilter === filter 
                    ? (filter === 'ai-ml' ? 'var(--color-ai-magenta)' : filter === 'cloud-infra' ? 'var(--color-cloud-cyan)' : 'var(--color-cyber-purple)')
                    : 'transparent'
                }}
              >
                {getFilterLabel(filter)}
              </button>
            ))}
          </div>

          {/* PROJECTS GRID */}
          <div style={styles.grid} className="stagger-container">
            {filteredProjects.map(project => (
              <div key={project.id} className="glass-panel reveal-up stagger-item" style={styles.card}>
                
                {/* Card Header */}
                <div style={styles.cardHeader}>
                  <div style={{...styles.iconContainer, color: project.color, border: '1px solid var(--color-glass-border)'}}>
                    {project.icon}
                  </div>
                  <span className={`badge ${project.category === 'cloud-infra' ? 'badge-cloud' : 'badge-ai'}`} style={{ fontSize: '0.7rem' }}>
                    {project.category.toUpperCase().replace('-', ' ')}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <p style={styles.cardDesc}>{project.desc}</p>

                {/* Technical Telemetry Drawer (Unique Value) */}
                <div style={styles.telemetryBox}>
                  <div style={styles.telemetryHeader}>
                    <Zap size={12} style={{ color: 'var(--color-cloud-cyan)', filter: 'drop-shadow(var(--glow-cyan))' }} />
                    <span style={styles.telemetryTitle}>ARCHITECTURAL TELEMETRY</span>
                  </div>
                  <p style={styles.telemetryText}>{project.telemetry}</p>
                </div>

                {/* Tech Tags */}
                <div style={styles.techTags}>
                  {project.techs.map(t => (
                    <span key={t} className="badge" style={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={styles.actions}>
                  <a href={project.github} className="btn-icon" style={styles.actionBtn} title="View Source Code">
                    <Github size={16} />
                  </a>
                  <a href={project.demo} className="btn-icon" style={styles.actionBtn} title="View Live Telemetry Dashboard">
                    <ExternalLink size={16} />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    border: '1px solid transparent',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.08em',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '30px',
    marginTop: '20px',
  },
  card: {
    padding: '24px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
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
    fontSize: '1.25rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    color: 'var(--text-bright)',
    marginBottom: '10px',
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    marginBottom: '16px',
    flex: 1,
  },
  telemetryBox: {
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.03)',
    borderRadius: '8px',
    padding: '12px 14px',
    marginBottom: '16px',
  },
  telemetryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '6px',
  },
  telemetryTitle: {
    fontSize: '0.68rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  telemetryText: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: 1.45,
  },
  techTags: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  techTag: {
    fontSize: '0.7rem',
    padding: '3px 8px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.05)',
    color: 'var(--text-dark)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  actionBtn: {
    width: '36px',
    height: '36px',
  }
};
