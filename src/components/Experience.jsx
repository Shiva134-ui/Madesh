import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Experience() {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const sectionRef = React.useRef(null);
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (section) {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Progress starts when top of section enters viewport (rect.top === windowHeight)
            // Progress finishes when bottom of section is 200px from the bottom of the viewport
            const start = windowHeight;
            const end = 200;
            const totalHeight = rect.height;
            const totalScrollableDistance = totalHeight + start - end;
            
            const scrolled = start - rect.top;
            let progress = scrolled / totalScrollableDistance;
            progress = Math.min(Math.max(progress, 0), 1);
            
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  const timelineData = [
    {
      id: 1,
      role: 'AI/ML & Cloud Explorer',
      company: 'Personal Projects & Dev Labs',
      duration: '2024 - PRESENT',
      color: 'var(--color-ai-magenta)',
      bullets: [
        'Built and deployed containerized AI-powered applications, automating pipelines and model training runs.',
        'Orchestrated self-hosted developer infrastructure, reverse proxies, and secure networking configurations.',
        'Explored serverless ingestion functions and vectorized database index configurations for intelligent search.'
      ]
    },
    {
      id: 2,
      role: 'Full-Stack Developer',
      company: 'Academic Projects & Hackathons',
      duration: '2023 - 2024',
      color: 'var(--color-cyber-purple)',
      bullets: [
        'Designed and developed full-stack web applications with React, Node.js, and multi-tier database systems.',
        'Wrote integration test cases and automated code validation pipelines to ensure application security and robustness.',
        'Collaborated on building software prototypes under tight timelines, solving real-world challenges.'
      ]
    },
    {
      id: 3,
      role: 'Computer Science Student',
      company: 'Engineering Studies (CSE)',
      duration: '2022 - PRESENT',
      color: 'var(--color-cloud-cyan)',
      bullets: [
        'Mastered foundational computer science concepts, distributed systems, database management, and data structures.',
        'Built and programmed command-line utility tools, scripts, and algorithmic solvers for practical coursework.',
        'Continuously improved coding practices through hands-on labs, open-source explorations, and peer learning.'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="section" style={{ backgroundColor: 'var(--bg-deep-space)', position: 'relative' }}>
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-cloud" style={{ marginBottom: '10px' }}>DEVELOPMENT PATHWAYS</span>
          <h2 className="section-title">Development Journey</h2>
          <p style={styles.sectionSubtitle} className="section-subtitle">
            A chronological timeline tracking my computer science education, personal projects, and hands-on developer experiences.
          </p>
        </div>

        <div ref={contentRef} style={styles.timeline} className={`stagger-container ${contentVisible ? 'visible' : ''}`}>
          {/* Central Line */}
          <div style={styles.centralLine} className="centralLine">
            <div 
              style={{
                width: '100%',
                height: `${scrollProgress * 100}%`,
                background: 'linear-gradient(to bottom, var(--color-ai-magenta), var(--color-cyber-purple), var(--color-cloud-cyan))',
                boxShadow: '0 0 10px var(--color-ai-magenta), 0 0 20px var(--color-cyber-purple)',
                transition: 'height 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
          </div>

          {timelineData.map((item, idx) => (
            <div 
              key={item.id} 
              className="timeline-item"
              style={{
                ...styles.timelineItem,
                flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse'
              }}
            >
              {/* Timeline Card */}
              <div className={`glass-panel reveal-${idx % 2 === 0 ? 'left' : 'right'} stagger-item timeline-card`} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.roleGroup}>
                    <h3 style={{...styles.roleTitle, color: item.color}}>{item.role}</h3>
                    <span style={styles.companyName}>{item.company}</span>
                  </div>
                  <div style={{...styles.dateBadge, borderColor: 'var(--color-glass-border)', backgroundColor: 'rgba(255,255,255,0.02)'}}>
                    <Calendar size={12} style={{ color: item.color }} />
                    <span style={{...styles.dateText, color: item.color}}>{item.duration}</span>
                  </div>
                </div>

                <div style={styles.divider} />

                <ul style={styles.bulletList}>
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} style={styles.bulletItem}>
                      <span style={{...styles.bulletPointer, backgroundColor: item.color}} />
                      <p style={styles.bulletText}>{b}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline Node Point */}
              <div style={styles.nodePointContainer} className="reveal-zoom stagger-item timeline-node-container">
                <div 
                  style={{
                    ...styles.nodePoint,
                    borderColor: item.color,
                    boxShadow: `0 0 12px ${item.color}`
                  }}
                >
                  <Briefcase size={12} style={{ color: 'var(--text-bright)' }} />
                </div>
              </div>

              {/* Empty Spacer Column for layout balancing */}
              <div style={styles.spacerCol} className="timeline-spacer-col" />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const styles = {
  timeline: {
    position: 'relative',
    maxWidth: '1000px',
    margin: '40px auto 0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  centralLine: {
    position: 'absolute',
    left: '50%',
    top: '20px',
    bottom: '20px',
    width: '2px',
    backgroundColor: 'rgba(255,255,255,0.12)',
    transform: 'translateX(-50%)',
    zIndex: 1,
    overflow: 'hidden',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 5,
  },
  card: {
    width: '45%',
    padding: '24px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    transition: 'all 0.35s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap',
  },
  roleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  roleTitle: {
    fontSize: '1.2rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
  },
  companyName: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-body)',
  },
  dateBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '20px',
    border: '1px solid transparent',
  },
  dateText: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    letterSpacing: '0.05em',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: '16px 0',
  },
  bulletList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    listStyle: 'none',
  },
  bulletItem: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
  },
  bulletPointer: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    marginTop: '6px',
    flexShrink: 0,
  },
  bulletText: {
    fontSize: '0.86rem',
    color: 'var(--text-muted)',
    lineHeight: 1.45,
  },
  nodePointContainer: {
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodePoint: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid transparent',
    backgroundColor: 'var(--bg-deep-space)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  spacerCol: {
    width: '45%',
  }
};
