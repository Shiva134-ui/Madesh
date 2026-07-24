import { useState, useEffect } from 'react';
import { 
  Cpu, Cloud, Globe, Settings, ExternalLink, Zap, Clock, Wrench, 
  Code2, Database, Layers, ShieldCheck, FileSpreadsheet, PlayCircle, 
  Smartphone, CheckCircle2, Monitor, Layout, FileText, Sparkles, 
  Server, Activity, ArrowUpRight, X, Maximize2
} from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

// Real StreamX screenshots
import streamxHomeImg from '../assets/streamx/home.png';
import streamxPlayerImg from '../assets/streamx/player.png';
import streamxAdminImg from '../assets/streamx/admin.png';
import streamxProfileImg from '../assets/streamx/profile.png';

const GithubIcon = ({ size = 16, ...props }) => (
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

// Real StreamX screenshot paths (from /src/assets/streamx/)
const STREAMX_SCREENSHOT_PATHS = {
  home: streamxHomeImg,
  player: streamxPlayerImg,
  admin: streamxAdminImg,
  profile: streamxProfileImg,
  responsive: streamxHomeImg, // responsive uses home screenshot
};

export default function Projects({ activeFilter, onFilterChange }) {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedModalProject(null);
      }
    };
    if (selectedModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedModalProject]);

  // StreamX Specs Data
  const streamxTechs = [
    'HTML5', 'CSS3', 'JavaScript (ES6 Modules)', 'Firebase Auth', 
    'Firestore', 'Cloudinary', 'Plyr.js', 'SheetJS'
  ];

  const streamxFeatures = [
    '✓ Smart Media Player',
    '✓ Admin Dashboard',
    '✓ Dual Watchlist Sync',
    '✓ Real-Time Notifications',
    '✓ Excel / CSV Import',
    '✓ Responsive Design'
  ];

  const streamxEngHighlights = [
    { title: 'Modular Architecture', icon: <Layers size={15} /> },
    { title: 'Zero Framework', icon: <Code2 size={15} /> },
    { title: 'Performance Optimized', icon: <Zap size={15} /> },
    { title: 'Accessibility', icon: <ShieldCheck size={15} /> },
    { title: 'Cloud Integration', icon: <Cloud size={15} /> },
    { title: 'Responsive Design', icon: <Smartphone size={15} /> },
  ];

  const streamxMetrics = [
    { val: '~6,200+', label: 'Lines of Code' },
    { val: '22', label: 'JavaScript Modules' },
    { val: '5', label: 'Application Pages' },
    { val: '8', label: 'CSS Modules' },
    { val: '4', label: 'External Integrations' },
  ];

  const streamxChallenges = [
    {
      title: 'Offline + Cloud Synchronization',
      desc: 'Reconciles local state with Firestore listeners for resilient real-time syncing and instant UI responses.'
    },
    {
      title: 'Multi-source Streaming',
      desc: 'Seamless video player engine powering HLS and MP4 streams with customized Plyr.js controls.'
    },
    {
      title: 'Bulk Content Management',
      desc: 'Fast client-side Excel and CSV parsing using SheetJS for automated batch database cataloging.'
    },
    {
      title: 'Client-side Image Processing',
      desc: 'Dynamic canvas image compression, preview generation, and Cloudinary CDN URL optimization.'
    }
  ];

  // Completed Projects List
  const completedProjects = [
    {
      id: 'streamx',
      title: 'StreamX',
      subtitle: 'Production-Grade Streaming Platform',
      category: 'full-stack',
      isFlagship: true,
      icon: <PlayCircle size={18} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'Production-grade media streaming platform using modular vanilla JavaScript (ES6 Modules), Firebase Auth, Firestore DB, and Cloudinary media CDN with dynamic Plyr.js player.',
      telemetry: '6,200+ Lines of Code • 22 ES6 JS Modules • 5 Web App Pages • Firebase Sync • SheetJS Batch Parser',
      techs: ['HTML5', 'JavaScript', 'Firebase', 'Cloudinary', 'Plyr.js'],
      github: 'https://github.com/Shiva134-ui/StreamX',
      demo: 'https://streamx.madesh.in/',
      status: 'completed'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Website',
      subtitle: 'Developer Showcase & Command Center',
      category: 'full-stack',
      isFlagship: false,
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
      id: 'luvia-luxury',
      title: 'Luvia Luxury',
      subtitle: 'E-Commerce Platform',
      category: 'full-stack',
      isFlagship: false,
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

  const filteredCompletedProjects = activeFilter === 'all'
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

  // Render SVG fallback mockup graphics for screenshots
  const renderScreenshotMockup = (tab) => {
    const imgSrc = STREAMX_SCREENSHOT_PATHS[tab];
    if (imgSrc) {
      return (
        <img 
          src={imgSrc} 
          alt={`StreamX ${tab} view`} 
          className="streamx-preview-img" 
          loading="lazy" 
        />
      );
    }

    return (
      <div className="streamx-mockup-graphic">
        <div className="streamx-mockup-topbar">
          <span className="streamx-mockup-dot" style={{ background: '#ff5f56' }} />
          <span className="streamx-mockup-dot" style={{ background: '#ffbd2e' }} />
          <span className="streamx-mockup-dot" style={{ background: '#27c93f' }} />
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dark)', marginLeft: '12px' }}>
            streamx.madesh.in/{tab}
          </span>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          {tab === 'home' && <Monitor size={44} style={{ color: 'var(--color-cloud-cyan)', opacity: 0.8 }} />}
          {tab === 'player' && <PlayCircle size={44} style={{ color: 'var(--color-cloud-cyan)', opacity: 0.8 }} />}
          {tab === 'admin' && <Layout size={44} style={{ color: 'var(--color-cloud-cyan)', opacity: 0.8 }} />}
          {tab === 'profile' && <ShieldCheck size={44} style={{ color: 'var(--color-cloud-cyan)', opacity: 0.8 }} />}
          {tab === 'responsive' && <Smartphone size={44} style={{ color: 'var(--color-cloud-cyan)', opacity: 0.8 }} />}

          <div style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-bright)' }}>
            StreamX {tab.charAt(0).toUpperCase() + tab.slice(1)} Preview
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '400px', textAlign: 'center' }}>
            {tab === 'home' && 'Modular media catalog with dynamic filtering, search bar, and hero banner slider.'}
            {tab === 'player' && 'Smart media engine powered by Plyr.js, HLS stream fallback, and dual watchlist sync.'}
            {tab === 'admin' && 'Admin control center with SheetJS bulk CSV/Excel import and Cloudinary asset management.'}
            {tab === 'profile' && 'Firebase auth session manager with real-time watchlist state and cloud user settings.'}
            {tab === 'responsive' && 'Adaptive fluid UI tested seamlessly across Desktop, Laptop, Tablet, and Mobile screens.'}
          </p>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dark)', marginTop: '4px' }}>
            [ SCREENSHOT PLACEHOLDER • READY FOR HIGH-RES IMAGE SLOTS ]
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>PROJECT SHOWCASE</span>
          <h2 className="section-title">Projects Portfolio</h2>
          <p className="section-subtitle">
            Real-world production platforms and engineering labs built to demonstrate high-performance web architecture and cloud infrastructure.
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

          <div style={styles.sectionLabel}>
            <span style={styles.sectionLabelText}>✓ COMPLETED</span>
          </div>

          {/* UNIFIED COMPLETED PROJECTS GRID */}
          <div style={styles.grid} className="stagger-container">
            {filteredCompletedProjects.map(project => (
              <div 
                key={project.id} 
                className="glass-panel reveal-up stagger-item project-grid-card" 
                style={styles.card}
                onClick={() => setSelectedModalProject(project)}
              >
                
                {/* Card Header */}
                <div style={styles.cardHeader}>
                  <div style={{...styles.iconContainer, color: project.color, border: '1px solid var(--color-glass-border)'}}>
                    {project.icon}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {project.isFlagship && (
                      <span className="badge badge-ai" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', borderColor: 'var(--color-cloud-cyan)', color: 'var(--color-cloud-cyan)' }}>
                        ★ FLAGSHIP
                      </span>
                    )}
                    <span className="badge badge-ai" style={{ fontSize: '0.68rem', color: project.color === 'var(--color-cloud-cyan)' ? 'var(--color-cloud-cyan)' : undefined }}>
                      {project.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle / Description */}
                <h3 style={styles.cardTitle}>{project.title}</h3>
                {project.subtitle && (
                  <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-cloud-cyan)', marginBottom: '8px' }}>
                    {project.subtitle}
                  </div>
                )}
                <p style={styles.cardDesc}>{project.desc}</p>

                {/* Tech Tags */}
                <div style={styles.techTags}>
                  {project.techs.map(t => (
                    <span key={t} className="badge" style={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={styles.actions} onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="btn-details-trigger"
                    onClick={() => setSelectedModalProject(project)}
                  >
                    <Maximize2 size={13} />
                    <span>{project.isFlagship ? 'View Case Study' : 'View Details'}</span>
                  </button>

                  <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-icon" style={styles.actionBtn} title="View Source Code">
                        <GithubIcon size={16} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-icon" style={styles.actionBtn} title="View Live Demo">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
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

      {/* PROFESSIONAL PROJECT DETAILS MODAL OVERLAY */}
      {selectedModalProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedModalProject(null)}>
          <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="project-modal-header">
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                  {selectedModalProject.isFlagship && (
                    <span className="badge badge-ai" style={{ letterSpacing: '0.08em' }}>
                      ★ FLAGSHIP PROJECT
                    </span>
                  )}
                  <span className="badge" style={{ borderColor: 'var(--color-cloud-cyan)', color: 'var(--color-cloud-cyan)', fontSize: '0.68rem' }}>
                    {selectedModalProject.category.toUpperCase()}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-pure)', margin: 0 }}>
                  {selectedModalProject.title}
                </h2>
                {selectedModalProject.subtitle && (
                  <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)', color: 'var(--color-cloud-cyan)', margin: '4px 0 0' }}>
                    {selectedModalProject.subtitle}
                  </p>
                )}
              </div>
              <button 
                className="project-modal-close-btn"
                onClick={() => setSelectedModalProject(null)}
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="project-modal-body">
              {selectedModalProject.id === 'streamx' ? (
                <div>
                  <p className="streamx-description" style={{ marginBottom: '20px' }}>
                    Engineered a production-grade media streaming platform using modular vanilla JavaScript (ES6 Modules), Firebase Authentication, Firestore DB, and Cloudinary media cloud. Features real-time watchlist synchronization, dynamic Plyr.js media player integration, client-side dynamic image processing, and automated Excel/CSV content batch processing via SheetJS — optimized for high-throughput client-side performance and responsive cross-device usability.
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="streamx-tech-badges" style={{ marginBottom: '24px' }}>
                    {streamxTechs.map(t => (
                      <span key={t} className="streamx-tech-badge">
                        <Code2 size={12} style={{ color: 'var(--color-cloud-cyan)' }} />
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Multi-Screenshot Gallery & Tabs */}
                  <div className="streamx-gallery-container" style={{ marginBottom: '32px' }}>
                    <div className="streamx-gallery-tabs">
                      {[
                        { id: 'home', label: 'Home', icon: <Monitor size={13} /> },
                        { id: 'player', label: 'Video Player', icon: <PlayCircle size={13} /> },
                        { id: 'admin', label: 'Admin Dashboard', icon: <Layout size={13} /> },
                        { id: 'profile', label: 'Profile', icon: <ShieldCheck size={13} /> },
                        { id: 'responsive', label: 'Responsive Layout', icon: <Smartphone size={13} /> },
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`streamx-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        >
                          {tab.icon}
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="streamx-preview-window">
                      {renderScreenshotMockup(activeTab)}
                    </div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="streamx-section-heading">
                    <Activity size={14} />
                    Project Engineering Metrics
                  </div>
                  <div className="streamx-metrics-grid">
                    {streamxMetrics.map(m => (
                      <div key={m.label} className="streamx-metric-card">
                        <div className="streamx-metric-val">{m.val}</div>
                        <div className="streamx-metric-lbl">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Feature Highlights */}
                  <div className="streamx-section-heading">
                    <Sparkles size={14} />
                    Feature Highlights
                  </div>
                  <div className="streamx-features-grid">
                    {streamxFeatures.map(feat => (
                      <div key={feat} className="streamx-feature-chip">
                        <CheckCircle2 size={16} className="streamx-check-icon" />
                        <span>{feat.replace('✓ ', '')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Engineering Highlights */}
                  <div className="streamx-section-heading">
                    <Server size={14} />
                    Engineering Highlights
                  </div>
                  <div className="streamx-eng-grid">
                    {streamxEngHighlights.map(eng => (
                      <div key={eng.title} className="streamx-eng-card">
                        <span style={{ color: 'var(--color-cloud-cyan)' }}>{eng.icon}</span>
                        <span>{eng.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Case Study Breakdown */}
                  <div className="streamx-section-heading">
                    <FileText size={14} />
                    Engineering Challenges Solved
                  </div>
                  <div className="streamx-challenges-grid">
                    {streamxChallenges.map(ch => (
                      <div key={ch.title} className="streamx-challenge-card">
                        <div className="streamx-challenge-title">
                          <Zap size={14} style={{ color: 'var(--color-cloud-cyan)' }} />
                          {ch.title}
                        </div>
                        <p className="streamx-challenge-desc">{ch.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Modal Actions Bar */}
                  <div className="streamx-actions-bar">
                    <a 
                      href="https://github.com/Shiva134-ui/StreamX" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="streamx-btn-primary"
                    >
                      <GithubIcon size={16} />
                      GitHub Repository
                    </a>
                    <a 
                      href="https://streamx.madesh.in/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="streamx-btn-primary"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a 
                      href="#streamx-docs" 
                      className="streamx-btn-secondary"
                      onClick={(e) => { e.preventDefault(); alert('StreamX technical documentation is available in the GitHub repository README.'); }}
                    >
                      <FileText size={16} />
                      Documentation
                    </a>
                  </div>

                </div>
              ) : (
                /* Default Project Modal Content */
                <div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-bright)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {selectedModalProject.desc}
                  </p>

                  <div style={{ ...styles.telemetryBox, marginBottom: '24px', padding: '16px 18px' }}>
                    <div style={{ ...styles.telemetryHeader, marginBottom: '8px' }}>
                      <Zap size={14} style={{ color: 'var(--color-cloud-cyan)' }} />
                      <span style={{ ...styles.telemetryTitle, fontSize: '0.75rem' }}>TECHNICAL NOTES & TELEMETRY</span>
                    </div>
                    <p style={{ ...styles.telemetryText, fontSize: '0.85rem' }}>{selectedModalProject.telemetry}</p>
                  </div>

                  <div className="streamx-section-heading">
                    <Code2 size={14} />
                    Technologies Used
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                    {selectedModalProject.techs.map(t => (
                      <span key={t} className="badge badge-ai" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="streamx-actions-bar">
                    {selectedModalProject.github && (
                      <a 
                        href={selectedModalProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="streamx-btn-primary"
                      >
                        <GithubIcon size={16} />
                        GitHub Repository
                      </a>
                    )}
                    {selectedModalProject.demo && (
                      <a 
                        href={selectedModalProject.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="streamx-btn-primary"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

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
