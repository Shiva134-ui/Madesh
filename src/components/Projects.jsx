import { Cpu, Cloud, Globe, Settings, ExternalLink, Zap, Clock, Wrench } from 'lucide-react';
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

  // Completed Projects
  const completedProjects = [
    {
      id: 'portfolio',
      title: 'Portfolio Website',
      category: 'full-stack',
      icon: <Globe size={18} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'Designed and developed a modern developer portfolio using React and modern frontend technologies to showcase projects, skills, certifications, and career journey.',
      telemetry: 'Built with React, Vite, and CSS. Features terminal animations, architecture visualizer, smooth scroll reveal effects, and a fully responsive futuristic dark UI.',
      techs: ['React', 'JavaScript', 'CSS', 'Vite'],
      github: 'https://github.com/Shiva134-ui',
      demo: 'https://www.madesh.in',
      status: 'completed'
    },
    {
      id: 'streamx',
      title: 'StreamX',
      category: 'full-stack',
      icon: <Cpu size={18} />,
      color: 'var(--color-cyber-purple)',
      desc: 'Details coming soon — project documentation is being prepared.',
      telemetry: 'Technical details, features, and architecture documentation will be updated here soon.',
      techs: ['Coming Soon'],
      github: null,
      demo: null,
      status: 'completed'
    },
    {
      id: 'luvia-luxury',
      title: 'Luvia Luxury',
      category: 'full-stack',
      icon: <Globe size={18} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'Details coming soon — project documentation is being prepared.',
      telemetry: 'Technical details, features, and architecture documentation will be updated here soon.',
      techs: ['Coming Soon'],
      github: null,
      demo: null,
      status: 'completed'
    }
  ];

  // Currently Building
  const buildingProjects = [
    {
      id: 'network-homelab',
      title: 'Enterprise Network & Data Center Home Lab',
      desc: 'Building a hands-on enterprise-grade networking and data center lab to study routing, switching, VLANs, server management, and real infrastructure concepts.',
      color: 'var(--color-cloud-cyan)',
      icon: <Cloud size={18} />
    },
    {
      id: 'devops-homelab',
      title: 'DevOps Home Lab',
      desc: 'Setting up a self-hosted DevOps environment with CI/CD pipelines, Docker containers, Kubernetes clusters, and monitoring tools to practice infrastructure automation.',
      color: 'var(--color-ai-magenta)',
      icon: <Wrench size={18} />
    },
    {
      id: 'self-hosted-platform',
      title: 'Self-Hosted Developer Platform',
      desc: 'Deploying a self-hosted suite of developer tools including Git hosting, container registry, and project management on personal Linux servers.',
      color: 'var(--color-cyber-purple)',
      icon: <Settings size={18} />
    },
    {
      id: 'cloud-native-devops',
      title: 'Cloud-Native DevOps Platform',
      desc: 'Learning and implementing a cloud-native DevOps platform using AWS or Azure, integrating containerized microservices with automated deployment pipelines.',
      color: 'var(--color-cloud-cyan)',
      icon: <Cloud size={18} />
    },
    {
      id: 'mlops-pipeline',
      title: 'MLOps Pipeline',
      desc: 'Exploring MLOps by building a machine learning pipeline with automated training, versioning, monitoring, and deployment workflows using Python and open-source tools.',
      color: 'var(--color-ai-magenta)',
      icon: <Cpu size={18} />
    }
  ];

  const handleFilterSelection = (filter) => {
    onFilterChange && onFilterChange(filter);
  };

  const filteredProjects = activeFilter === 'all'
    ? completedProjects
    : completedProjects.filter(p => p.category === activeFilter);

  const getFilterLabel = (filter) => {
    switch (filter) {
      case 'all': return 'ALL';
      case 'full-stack': return 'FULL STACK';
      case 'cloud-infra': return 'CLOUD & INFRA';
      default: return filter.toUpperCase();
    }
  };

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>PROJECT SHOWCASE</span>
          <h2 className="section-title">Projects Portfolio</h2>
          <p className="section-subtitle">
            Real-world projects I have built to deepen my understanding of full-stack development, infrastructure, and modern engineering.
          </p>
        </div>

        <div ref={contentRef} className={contentVisible ? 'visible' : ''}>
          {/* TAG FILTER NAVIGATION */}
          <div style={styles.filterBar} className="reveal-zoom projects-filter-bar">
            {['all', 'full-stack', 'cloud-infra'].map(filter => (
              <button
                key={filter}
                onClick={() => handleFilterSelection(filter)}
                style={{
                  ...styles.filterBtn,
                  color: activeFilter === filter ? 'var(--text-pure)' : 'var(--text-dark)',
                  backgroundColor: activeFilter === filter ? 'rgba(255,255,255,0.04)' : 'transparent',
                  borderColor: activeFilter === filter 
                    ? (filter === 'cloud-infra' ? 'var(--color-cloud-cyan)' : 'var(--color-ai-magenta)')
                    : 'transparent'
                }}
              >
                {getFilterLabel(filter)}
              </button>
            ))}
          </div>

          {/* COMPLETED PROJECTS GRID */}
          <div style={styles.sectionLabel}>
            <span style={styles.sectionLabelText}>✓ COMPLETED</span>
          </div>
          <div style={styles.grid} className="stagger-container">
            {filteredProjects.map(project => (
              <div key={project.id} className="glass-panel reveal-up stagger-item" style={styles.card}>
                
                {/* Card Header */}
                <div style={styles.cardHeader}>
                  <div style={{...styles.iconContainer, color: project.color, border: '1px solid var(--color-glass-border)'}}>
                    {project.icon}
                  </div>
                  <span className="badge badge-ai" style={{ fontSize: '0.7rem', color: project.color === 'var(--color-cloud-cyan)' ? 'var(--color-cloud-cyan)' : undefined }}>
                    {project.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <p style={styles.cardDesc}>{project.desc}</p>

                {/* Technical Telemetry Drawer */}
                <div style={styles.telemetryBox}>
                  <div style={styles.telemetryHeader}>
                    <Zap size={12} style={{ color: 'var(--color-cloud-cyan)', filter: 'drop-shadow(var(--glow-cyan))' }} />
                    <span style={styles.telemetryTitle}>TECHNICAL NOTES</span>
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
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-icon" style={styles.actionBtn} title="View Source Code">
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-icon" style={styles.actionBtn} title="View Live Demo">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <span style={styles.comingSoonText}>Links coming soon</span>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* CURRENTLY BUILDING SECTION */}
          {(activeFilter === 'all' || activeFilter === 'cloud-infra') && (
            <div style={{ marginTop: '60px' }}>
              <div style={styles.sectionLabel}>
                <Clock size={14} style={{ color: 'var(--color-cloud-cyan)' }} />
                <span style={{...styles.sectionLabelText, color: 'var(--color-cloud-cyan)'}}>CURRENTLY BUILDING</span>
              </div>
              <p style={styles.buildingSubtitle}>
                These are active projects and learning goals I am currently working on. They represent my roadmap toward becoming a DevOps Engineer.
              </p>
              <div style={styles.buildingGrid} className="stagger-container">
                {buildingProjects.map(project => (
                  <div key={project.id} className="glass-panel reveal-up stagger-item" style={styles.buildingCard}>
                    <div style={styles.cardHeader}>
                      <div style={{...styles.iconContainer, color: project.color, border: '1px solid var(--color-glass-border)'}}>
                        {project.icon}
                      </div>
                      <span style={{...styles.buildingBadge, borderColor: project.color, color: project.color}}>
                        <span style={styles.buildingDot} />
                        IN PROGRESS
                      </span>
                    </div>
                    <h3 style={styles.cardTitle}>{project.title}</h3>
                    <p style={styles.cardDesc}>{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
    marginBottom: '30px',
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
  sectionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    marginTop: '10px',
  },
  sectionLabelText: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: '#27c93f',
    letterSpacing: '0.12em',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '20px',
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
    fontSize: '1.1rem',
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
    alignItems: 'center',
  },
  actionBtn: {
    width: '36px',
    height: '36px',
  },
  comingSoonText: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  buildingSubtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    marginBottom: '24px',
    maxWidth: '700px',
  },
  buildingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  buildingCard: {
    padding: '22px',
    backgroundColor: 'rgba(255,255,255,0.012)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
  },
  buildingBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.62rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    letterSpacing: '0.08em',
    padding: '3px 8px',
    borderRadius: '10px',
    border: '1px solid transparent',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  buildingDot: {
    display: 'inline-block',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};
