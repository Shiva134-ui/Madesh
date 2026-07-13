import React from 'react';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
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
      role: 'DevOps Intern',
      company: 'ICANIO Technologies',
      duration: 'Internship',
      color: 'var(--color-ai-magenta)',
      icon: 'work',
      bullets: [
        'Worked as a DevOps Intern and gained exposure to Linux, Git, DevOps workflows, cloud concepts, and infrastructure-related practices.',
        'Improved practical engineering knowledge by working with real-world tools and development environments.',
        'Strengthened foundational understanding of CI/CD pipelines, version control systems, and containerization concepts.'
      ]
    },
    {
      id: 2,
      role: 'Bachelor of Engineering — Computer Science & Engineering',
      company: 'SCAD College of Engineering and Technology, Tamil Nadu',
      duration: '2023 – 2027',
      color: 'var(--color-cloud-cyan)',
      icon: 'education',
      bullets: [
        'Currently pursuing B.E. in Computer Science and Engineering with a CGPA of 7.5.',
        'Building hands-on skills in DevOps, Networking, Cloud Computing, Linux, and Software Development through self-driven projects.',
        'Actively applying classroom knowledge to real engineering challenges and open-source exploration.'
      ]
    },
    {
      id: 3,
      role: 'Higher Secondary Education',
      company: 'Hope Matric Higher Secondary School, Tamil Nadu',
      duration: '11th & 12th Grade',
      color: 'var(--color-cyber-purple)',
      icon: 'education',
      bullets: [
        'Completed 11th and 12th grade at Hope Matric Higher Secondary School in Tamil Nadu.',
        'Developed early interest in technology, computers, and engineering during high school years.'
      ]
    },
    {
      id: 4,
      role: 'Secondary Education',
      company: 'St. Thomas Convent High School, Mumbai',
      duration: 'Secondary School',
      color: 'var(--color-cloud-cyan)',
      icon: 'education',
      bullets: [
        'Completed secondary education at St. Thomas Convent High School, Mumbai.',
        'Primary education at St. Antony School, Mumbai.'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="section" style={{ backgroundColor: 'var(--bg-deep-space)', position: 'relative' }}>
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-cloud" style={{ marginBottom: '10px' }}>EDUCATION & EXPERIENCE</span>
          <h2 className="section-title">Journey & Background</h2>
          <p style={styles.sectionSubtitle} className="section-subtitle">
            A chronological timeline of my education, internship experience, and ongoing journey in computer science and engineering.
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
                  {item.icon === 'work' 
                    ? <Briefcase size={12} style={{ color: 'var(--text-bright)' }} />
                    : <GraduationCap size={12} style={{ color: 'var(--text-bright)' }} />
                  }
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
  sectionSubtitle: {
    maxWidth: '600px',
    margin: '0 auto',
  },
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
    fontSize: '1.1rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    lineHeight: 1.25,
  },
  companyName: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-body)',
    marginTop: '2px',
  },
  dateBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '20px',
    border: '1px solid transparent',
    flexShrink: 0,
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
