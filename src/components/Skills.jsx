import { useState, useEffect } from 'react';
import { Cpu, Cloud, Database, ShieldAlert, CheckCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Skills() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('programming');
  const [animateWidths, setAnimateWidths] = useState(false);

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setAnimateWidths(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimateWidths(true), 80);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const skillData = {
    programming: {
      title: 'Programming & Web Development',
      icon: <Cpu size={20} />,
      color: 'var(--color-ai-magenta)',
      desc: 'Building full-stack applications with modern web technologies and general-purpose programming languages for backend automation and scripting.',
      skills: [
        { name: 'Python', level: 72 },
        { name: 'JavaScript', level: 70 },
        { name: 'HTML & CSS', level: 80 },
        { name: 'Java', level: 60 },
        { name: 'React', level: 65 },
        { name: 'Node.js', level: 58 },
      ],
      methodologies: [
        'Component-based UI with React',
        'REST API development with Node.js',
        'Python scripting for automation',
        'Firebase backend integration',
        'Git-based version control workflows'
      ]
    },
    networking: {
      title: 'Networking & Linux',
      icon: <Cloud size={20} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'Understanding core networking fundamentals including TCP/IP stack, DNS resolution, IP addressing, routing, and packet communication principles.',
      skills: [
        { name: 'TCP/IP & OSI Model', level: 68 },
        { name: 'DNS & HTTP/HTTPS', level: 65 },
        { name: 'IP Addressing & NAT/PAT', level: 62 },
        { name: 'Ubuntu Linux (CLI)', level: 60 },
        { name: 'Routers & Port Forwarding', level: 58 },
      ],
      methodologies: [
        'IP Addressing & Subnetting Concepts',
        'Port Forwarding & NAT Configuration',
        'Packet flow & retransmission (ACK/Timeout)',
        'DNS resolution & domain configuration',
        'Linux command-line server management'
      ]
    },
    data: {
      title: 'Databases & Version Control',
      icon: <Database size={20} />,
      color: 'var(--color-cyber-purple)',
      desc: 'Working with relational and NoSQL databases for application backends, and managing code collaboration workflows using Git and GitHub.',
      skills: [
        { name: 'MySQL', level: 60 },
        { name: 'Firebase', level: 65 },
        { name: 'Git', level: 72 },
        { name: 'GitHub', level: 72 },
        { name: 'MongoDB (Learning)', level: 35 },
      ],
      methodologies: [
        'Relational database design with MySQL',
        'Firebase real-time backend integration',
        'Git branching & collaborative workflows',
        'GitHub repository and project management',
        'MongoDB document model (currently learning)'
      ]
    },
    devops: {
      title: 'DevOps & Cloud (Learning)',
      icon: <ShieldAlert size={20} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'Actively learning and building foundational skills in DevOps, cloud infrastructure, and container-based deployment workflows through hands-on projects.',
      skills: [
        { name: 'Docker (Learning)', level: 42 },
        { name: 'AWS (Learning)', level: 38 },
        { name: 'Kubernetes (Learning)', level: 28 },
        { name: 'GitHub Actions (Learning)', level: 40 },
        { name: 'Azure (Learning)', level: 25 },
      ],
      methodologies: [
        'Container-based deployments with Docker',
        'CI/CD pipeline setup with GitHub Actions',
        'AWS fundamentals (EC2, S3, IAM basics)',
        'Kubernetes orchestration concepts',
        'Infrastructure as Code (Terraform — exploring)'
      ]
    }
  };

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'var(--bg-deep-space)', position: 'relative' }}>
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>TECHNICAL INVENTORY</span>
          <h2 className="section-title">Skills & Learning Progress</h2>
          <p className="section-subtitle">
            An honest breakdown of my current skills, tools I am actively learning, and the technologies I am building towards.
          </p>
        </div>

        <div ref={contentRef} style={styles.skillsWrapper} className={`skills-wrapper ${contentVisible ? 'visible' : ''}`}>
          {/* CATEGORY NAV BUTTONS */}
          <div style={styles.navColumn} className="stagger-container skills-nav-column">
            {Object.keys(skillData).map(key => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className="glass-panel reveal-left stagger-item skills-nav-card"
                style={{
                  ...styles.navCard,
                  borderColor: activeCategory === key ? skillData[key].color : 'var(--color-glass-border)',
                  boxShadow: activeCategory === key ? `0 0 15px ${skillData[key].color}25` : 'none',
                  backgroundColor: activeCategory === key ? 'rgba(255,255,255,0.03)' : 'var(--bg-glass-card)'
                }}
              >
                <div style={{
                  ...styles.navIcon, 
                  color: activeCategory === key ? skillData[key].color : 'var(--text-dark)'
                }}>
                  {skillData[key].icon}
                </div>
                <div style={styles.navTextContainer}>
                  <span style={styles.navTitle}>{skillData[key].title.split(' & ')[0]}</span>
                  <span style={styles.navSub}>{skillData[key].skills.length} skills tracked</span>
                </div>
              </button>
            ))}
          </div>

          {/* ACTIVE CATEGORY VIEW */}
          <div className="glass-panel reveal-right skills-view-card" style={styles.viewCard}>
            <div style={styles.viewHeader}>
              <h3 style={{...styles.viewTitle, color: skillData[activeCategory].color}}>
                {skillData[activeCategory].title}
              </h3>
              <p style={styles.viewDesc}>{skillData[activeCategory].desc}</p>
            </div>

            <div style={styles.divider} />

            {/* SKILLS METERS GRID */}
            <div style={styles.skillsGrid} className="skills-grid">
              <div style={styles.metersCol}>
              <h4 style={styles.colHeading}>SKILLS & LEARNING PROGRESS</h4>
                {skillData[activeCategory].skills.map(s => (
                  <div key={s.name} style={styles.meterContainer}>
                    <div style={styles.meterLabels}>
                      <span style={styles.skillName}>{s.name}</span>
                      <span style={{...styles.skillLevel, color: skillData[activeCategory].color}}>{s.level}%</span>
                    </div>
                    <div style={styles.progressBarBg}>
                      <div 
                        style={{
                          ...styles.progressBarFill, 
                          width: animateWidths ? `${s.level}%` : '0%',
                          background: `linear-gradient(90deg, ${skillData[activeCategory].color}, var(--color-cyber-purple))`,
                          boxShadow: `0 0 10px ${skillData[activeCategory].color}30`
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* METHODOLOGIES COLUMN */}
              <div style={styles.methodsCol}>
              <h4 style={styles.colHeading}>FOCUS AREAS & PRACTICES</h4>
                <div style={styles.methodsList}>
                  {skillData[activeCategory].methodologies.map(m => (
                    <div key={m} style={styles.methodItem}>
                      <CheckCircle size={14} style={{ color: skillData[activeCategory].color, flexShrink: 0, marginTop: '2px' }} />
                      <span style={styles.methodText}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  skillsWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.2fr',
    gap: '30px',
    alignItems: 'start',
    marginTop: '20px',
  },
  navColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  navCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    borderRadius: '12px',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
    border: '1px solid var(--color-glass-border)',
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    flexShrink: 0,
    transition: 'color 0.2s',
  },
  navTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  navTitle: {
    fontSize: '0.92rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    color: 'var(--text-bright)',
  },
  navSub: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    marginTop: '2px',
  },
  viewCard: {
    padding: '30px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
  },
  viewHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  viewTitle: {
    fontSize: '1.6rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
  },
  viewDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: '20px 0',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '30px',
    alignItems: 'start',
  },
  metersCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  colHeading: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.08em',
    marginBottom: '8px',
  },
  meterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  meterLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
  },
  skillName: {
    color: 'var(--text-bright)',
    fontWeight: '500',
  },
  skillLevel: {
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
  },
  progressBarBg: {
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  methodsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  methodsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.02)',
    padding: '20px',
    borderRadius: '12px',
  },
  methodItem: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
  },
  methodText: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
  }
};
