import { useState, useEffect } from 'react';
import { Cpu, Cloud, Database, ShieldAlert, CheckCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Skills() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('ai');
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
    ai: {
      title: 'Artificial Intelligence & Machine Learning',
      icon: <Cpu size={20} />,
      color: 'var(--color-ai-magenta)',
      desc: 'Expertise in training, optimizing, and deploying deep neural networks, custom transformers, and LLM-powered RAG systems.',
      skills: [
        { name: 'PyTorch / TensorFlow', level: 92 },
        { name: 'SageMaker / ML Pipelines', level: 88 },
        { name: 'LLMs (GPT, Gemini, Llama) & RAG', level: 85 },
        { name: 'NLP & Computer Vision', level: 80 },
        { name: 'Scikit-Learn / Classical ML', level: 90 }
      ],
      methodologies: [
        'Distributed Training (DataParallel)',
        'Model Quantization & Pruning',
        'Parameter-Efficient Fine-Tuning (LoRA)',
        'Semantic Embeddings & Indexing'
      ]
    },
    cloud: {
      title: 'Cloud Infrastructure & Architecture',
      icon: <Cloud size={20} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'Orchestrating highly secure, auto-scaling, and redundant multi-region architectures with comprehensive Infrastructure as Code.',
      skills: [
        { name: 'AWS (VPC, IAM, ECS, Lambda, S3)', level: 94 },
        { name: 'Terraform (IaC)', level: 90 },
        { name: 'Docker Containers', level: 95 },
        { name: 'Kubernetes (EKS)', level: 82 },
        { name: 'Google Cloud Platform (GCP)', level: 75 }
      ],
      methodologies: [
        'Multi-AZ Redundancy Configurations',
        'Serverless Orchestration Layers',
        'Identity & Access Management Policy Specs',
        'Dynamic Infrastructure States (Terraform Cloud)'
      ]
    },
    data: {
      title: 'Data Systems & Vector Databases',
      icon: <Database size={20} />,
      color: 'var(--color-cyber-purple)',
      desc: 'Designing low-latency vector indexing clusters and high-volume event streaming architectures for large-scale data ingestion.',
      skills: [
        { name: 'Pinecone Vector DB', level: 88 },
        { name: 'PostgreSQL / pgvector', level: 85 },
        { name: 'Redis Cache', level: 90 },
        { name: 'Apache Spark', level: 80 },
        { name: 'Apache Kafka / Stream Ingestion', level: 78 }
      ],
      methodologies: [
        'Cosine Similarity Metric Index Optimizations',
        'High-Throughput Partition Configurations',
        'Multi-Tier Database Caching Scales',
        'Dynamic ETL Partition Pipelines'
      ]
    },
    devops: {
      title: 'DevOps & MLOps Operations',
      icon: <ShieldAlert size={20} />,
      color: 'var(--color-cloud-cyan)',
      desc: 'Structuring automated integration, deployment pipelines, telemetry dashboards, and ML tracking servers for rapid model lifecycles.',
      skills: [
        { name: 'GitHub Actions (CI/CD)', level: 92 },
        { name: 'MLflow / Telemetry Tracking', level: 85 },
        { name: 'FastAPI / Python Microservices', level: 90 },
        { name: 'Prometheus & Grafana Alert Systems', level: 80 },
        { name: 'Data Drift & Validation Testing', level: 82 }
      ],
      methodologies: [
        'Containerized Automated Deployment Runs',
        'Continuous Model Monitoring Scripts',
        'Telemetry Logging Standards (S3/CloudWatch)',
        'Blue-Green Model Routing Sequences'
      ]
    }
  };

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'var(--bg-deep-space)', position: 'relative' }}>
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>TECHNICAL INVENTORY</span>
          <h2 className="section-title">Professional Skill Matrix</h2>
          <p className="section-subtitle">
            A comprehensive mapping of my engineering competencies, categorized across core AI, cloud architecture, and operations.
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
                  <span style={styles.navSub}>{skillData[key].skills.length} core systems analyzed</span>
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
                <h4 style={styles.colHeading}>COMPETENCY PROGRESS TELEMETRY</h4>
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
                <h4 style={styles.colHeading}>PRODUCTION ARCHITECTURAL METHODOLOGIES</h4>
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
