import { useState } from 'react';
import { User, Cpu, Database, Server, Settings, Zap, ArrowRight, Activity } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ArchitectureVisualizer() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const [selectedNode, setSelectedNode] = useState('gateway');
  const [isSimulating, setIsSimulating] = useState(false);

  const nodes = {
    client: {
      id: 'client',
      title: '1. Client Interface',
      icon: <User size={24} />,
      color: 'hsl(183, 100%, 50%)',
      techs: ['React', 'WebSocket', 'GraphQL'],
      role: 'Captures and streams user prompts or high-frequency data inputs (images, audio, transactional logs) with secure JWT handshakes.',
      highlight: 'Built real-time streaming sockets supporting 5,000+ concurrent connections with auto-reconnection protocols.'
    },
    gateway: {
      id: 'gateway',
      title: '2. API Gateway & Load Balancer',
      icon: <Server size={24} />,
      color: 'hsl(265, 85%, 60%)',
      techs: ['AWS API Gateway', 'FastAPI', 'NGINX'],
      role: 'Acts as the entrypoint. Handles SSL termination, rate-limiting, CORS, and redirects incoming requests to microservice instances.',
      highlight: 'Configured automated rate-limiting and DDoS shield protection reducing unauthorized server scans by 98%.'
    },
    lambda: {
      id: 'lambda',
      title: '3. Serverless Compute Layer',
      icon: <Settings size={24} />,
      color: 'hsl(183, 100%, 50%)',
      techs: ['AWS Lambda', 'ECS Fargate', 'Docker'],
      role: 'Lightweight preprocessing: tokenizes inputs, generates embeddings via sentence-transformers, and triggers orchestration routines.',
      highlight: 'Reduced API latency by 45% by moving embedding creation to serverless Edge runtimes and caching vector signatures.'
    },
    vector: {
      id: 'vector',
      title: '4. Vector DB (RAG Context)',
      icon: <Database size={24} />,
      color: 'hsl(328, 100%, 55%)',
      techs: ['Pinecone', 'pgvector', 'Redis'],
      role: 'Performs ultra-fast cosine similarity search across millions of embedded documents to inject relevant context into the LLM prompt (Retrieval-Augmented Generation).',
      highlight: 'Designed a hybrid metadata-filtering database cluster searching 500k documents with sub-10ms query execution times.'
    },
    sagemaker: {
      id: 'sagemaker',
      title: '5. SageMaker Inference Pipeline',
      icon: <Cpu size={24} />,
      color: 'hsl(328, 100%, 55%)',
      techs: ['AWS SageMaker', 'PyTorch', 'TensorRT'],
      role: 'Executes high-performance deep learning model predictions. Incorporates model compilation and auto-scaling GPU workers.',
      highlight: 'Orchestrated PyTorch Transformer hosting with TensorRT compilation, achieving 3x throughput improvement and 50% cost reductions.'
    },
    mlflow: {
      id: 'mlflow',
      title: '6. Observability & Logging',
      icon: <Activity size={24} />,
      color: 'hsl(265, 85%, 60%)',
      techs: ['MLflow', 'AWS S3', 'Prometheus'],
      role: 'Logs model inputs, outputs, telemetry metrics, and prediction confidence intervals. Tracks data drift and registers model lineage.',
      highlight: 'Implemented automated Prometheus dashboards tracking prediction drift and triggering automated retraining loops via Airflow.'
    }
  };

  const simulateDataFlow = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let sequence = ['client', 'gateway', 'lambda', 'vector', 'sagemaker', 'mlflow'];
    let index = 0;
    
    const runNext = () => {
      if (index < sequence.length) {
        setSelectedNode(sequence[index]);
        index++;
        setTimeout(runNext, 900);
      } else {
        setIsSimulating(false);
      }
    };
    runNext();
  };

  return (
    <section id="architecture" className="section" style={{ backgroundColor: 'var(--bg-panel-dark)', position: 'relative' }}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-cloud" style={{ marginBottom: '10px' }}>SYSTEM INFRASTRUCTURE</span>
          <h2 className="section-title">Interactive MLOps & Cloud Architecture</h2>
          <p className="section-subtitle">
            Recruiters: Click on any architectural node to see detailed telemetry, technology stacks, and how data moves through my systems.
          </p>
        </div>

        <div ref={contentRef} style={styles.gridContainer} className={`architecture-grid ${contentVisible ? 'visible' : ''}`}>
          {/* LEFT COLUMN: ARCHITECTURE CANVAS */}
          <div className="glass-panel reveal-left" style={styles.canvasContainer}>
            <div style={styles.canvasHeader} className="architecture-canvas-header">
              <div style={styles.dotContainer} className="architecture-canvas-dots">
                <span style={{...styles.windowDot, backgroundColor: '#ff5f56'}} />
                <span style={{...styles.windowDot, backgroundColor: '#ffbd2e'}} />
                <span style={{...styles.windowDot, backgroundColor: '#27c93f'}} />
              </div>
              <span style={styles.canvasTitle} className="architecture-canvas-title">mlops_pipeline_v3.2.svg</span>
              <button 
                onClick={simulateDataFlow} 
                disabled={isSimulating}
                className="btn btn-secondary architecture-simulate-btn" 
                style={styles.simulateBtn}
              >
                <Zap size={14} style={{ color: isSimulating ? 'var(--color-ai-magenta)' : 'inherit' }} />
                {isSimulating ? 'SIMULATING...' : 'RUN PIPELINE SIMULATION'}
              </button>
            </div>

            {/* PIPELINE GRID MAP WRAPPER FOR MOBILE RESPONSIVENESS */}
            <div className="architecture-canvas-scroll" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ ...styles.mapGrid, minWidth: '460px' }} className="architecture-map-grid">
                
                {/* Row 1: Client -> Gateway */}
                <div style={styles.row}>
                  <div 
                    onClick={() => setSelectedNode('client')}
                    className={`architecture-node ${selectedNode === 'client' ? 'active-node active-cyan' : ''}`}
                    style={{
                      ...styles.node,
                      borderColor: selectedNode === 'client' ? 'var(--color-cloud-cyan)' : 'var(--color-glass-border)',
                      boxShadow: selectedNode === 'client' ? 'var(--glow-cyan)' : 'none'
                    }}
                  >
                    <div style={{...styles.iconContainer, color: 'var(--color-cloud-cyan)'}}>
                      {nodes.client.icon}
                    </div>
                    <span style={styles.nodeTitle}>Client App</span>
                  </div>

                  <div style={styles.connection}>
                    <div className={`data-packet ${isSimulating ? 'animating' : ''}`} style={styles.packet} />
                    <ArrowRight size={20} style={{ color: 'rgba(255,255,255,0.15)' }} />
                  </div>

                  <div 
                    onClick={() => setSelectedNode('gateway')}
                    className={`architecture-node ${selectedNode === 'gateway' ? 'active-node active-purple' : ''}`}
                    style={{
                      ...styles.node,
                      borderColor: selectedNode === 'gateway' ? 'var(--color-cyber-purple)' : 'var(--color-glass-border)',
                      boxShadow: selectedNode === 'gateway' ? 'var(--glow-purple)' : 'none'
                    }}
                  >
                    <div style={{...styles.iconContainer, color: 'var(--color-cyber-purple)'}}>
                      {nodes.gateway.icon}
                    </div>
                    <span style={styles.nodeTitle}>API Gateway</span>
                  </div>
                </div>

                {/* Connector Down */}
                <div style={styles.verticalConnector}>
                  <div style={{ width: '2px', height: '30px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                </div>

                {/* Row 2: Serverless Processing -> Vector DB */}
                <div style={styles.row}>
                  <div 
                    onClick={() => setSelectedNode('lambda')}
                    className={`architecture-node ${selectedNode === 'lambda' ? 'active-node active-cyan' : ''}`}
                    style={{
                      ...styles.node,
                      borderColor: selectedNode === 'lambda' ? 'var(--color-cloud-cyan)' : 'var(--color-glass-border)',
                      boxShadow: selectedNode === 'lambda' ? 'var(--glow-cyan)' : 'none'
                    }}
                  >
                    <div style={{...styles.iconContainer, color: 'var(--color-cloud-cyan)'}}>
                      {nodes.lambda.icon}
                    </div>
                    <span style={styles.nodeTitle}>Preprocessing</span>
                  </div>

                  <div style={styles.connection}>
                    <div className={`data-packet ${isSimulating ? 'animating' : ''}`} style={styles.packet} />
                    <ArrowRight size={20} style={{ color: 'rgba(255,255,255,0.15)' }} />
                  </div>

                  <div 
                    onClick={() => setSelectedNode('vector')}
                    className={`architecture-node ${selectedNode === 'vector' ? 'active-node active-magenta' : ''}`}
                    style={{
                      ...styles.node,
                      borderColor: selectedNode === 'vector' ? 'var(--color-ai-magenta)' : 'var(--color-glass-border)',
                      boxShadow: selectedNode === 'vector' ? 'var(--glow-magenta)' : 'none'
                    }}
                  >
                    <div style={{...styles.iconContainer, color: 'var(--color-ai-magenta)'}}>
                      {nodes.vector.icon}
                    </div>
                    <span style={styles.nodeTitle}>Vector DB (RAG)</span>
                  </div>
                </div>

                {/* Connector Down */}
                <div style={styles.verticalConnector}>
                  <div style={{ width: '2px', height: '30px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                </div>

                {/* Row 3: ML Inference Server -> Observability Logging */}
                <div style={styles.row}>
                  <div 
                    onClick={() => setSelectedNode('sagemaker')}
                    className={`architecture-node ${selectedNode === 'sagemaker' ? 'active-node active-magenta' : ''}`}
                    style={{
                      ...styles.node,
                      borderColor: selectedNode === 'sagemaker' ? 'var(--color-ai-magenta)' : 'var(--color-glass-border)',
                      boxShadow: selectedNode === 'sagemaker' ? 'var(--glow-magenta)' : 'none'
                    }}
                  >
                    <div style={{...styles.iconContainer, color: 'var(--color-ai-magenta)'}}>
                      {nodes.sagemaker.icon}
                    </div>
                    <span style={styles.nodeTitle}>SageMaker Model</span>
                  </div>

                  <div style={styles.connection}>
                    <div className={`data-packet ${isSimulating ? 'animating' : ''}`} style={styles.packet} />
                    <ArrowRight size={20} style={{ color: 'rgba(255,255,255,0.15)' }} />
                  </div>

                  <div 
                    onClick={() => setSelectedNode('mlflow')}
                    className={`architecture-node ${selectedNode === 'mlflow' ? 'active-node active-purple' : ''}`}
                    style={{
                      ...styles.node,
                      borderColor: selectedNode === 'mlflow' ? 'var(--color-cyber-purple)' : 'var(--color-glass-border)',
                      boxShadow: selectedNode === 'mlflow' ? 'var(--glow-purple)' : 'none'
                    }}
                  >
                    <div style={{...styles.iconContainer, color: 'var(--color-cyber-purple)'}}>
                      {nodes.mlflow.icon}
                    </div>
                    <span style={styles.nodeTitle}>Observability</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TELEMETRY PANEL */}
          <div style={styles.telemetryContainer} className="reveal-right">
            <div className="glass-panel" style={styles.telemetryCard}>
              <div style={styles.telemetryHeader}>
                <div style={styles.pulseContainer}>
                  <span style={styles.pulseDot} />
                  <span style={styles.pulseRing} />
                </div>
                <span style={styles.telemetryTitle}>TELEMETRY ANALYSIS CARD</span>
              </div>

              <div style={styles.telemetryBody}>
                <h3 style={{...styles.componentTitle, color: nodes[selectedNode].color}}>
                  {nodes[selectedNode].title}
                </h3>
                
                <div style={styles.techList}>
                  {nodes[selectedNode].techs.map(t => (
                    <span 
                      key={t} 
                      className={`badge ${nodes[selectedNode].color.includes('183') ? 'badge-cloud' : 'badge-ai'}`}
                      style={{ fontSize: '0.75rem' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={styles.divider} />

                <div style={styles.metricSection}>
                  <h4 style={styles.sectionHeading}>COMPONENT FUNCTIONAL ROLE</h4>
                  <p style={styles.bodyText}>{nodes[selectedNode].role}</p>
                </div>

                <div style={styles.divider} />

                <div style={styles.metricSection}>
                  <h4 style={styles.sectionHeading}>MADESH'S DEPLOYMENT VALUE</h4>
                  <div style={styles.highlightBox}>
                    <Zap size={14} style={styles.highlightIcon} />
                    <p style={styles.highlightText}>{nodes[selectedNode].highlight}</p>
                  </div>
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
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '30px',
    alignItems: 'start',
    marginTop: '20px',
  },
  canvasContainer: {
    padding: '0px',
    borderRadius: '16px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  canvasHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    backgroundColor: 'rgba(7, 5, 20, 0.65)',
  },
  dotContainer: {
    display: 'flex',
    gap: '6px',
  },
  windowDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  canvasTitle: {
    fontSize: '0.8rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
  },
  simulateBtn: {
    fontSize: '0.75rem',
    padding: '6px 14px',
    borderRadius: '15px',
  },
  mapGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    gap: '15px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '500px',
  },
  node: {
    width: '150px',
    height: '90px',
    borderRadius: '12px',
    border: '1px solid var(--color-glass-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    userSelect: 'none',
  },
  iconContainer: {
    transition: 'transform 0.3s ease',
  },
  nodeTitle: {
    fontSize: '0.8rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '500',
    color: 'var(--text-bright)',
  },
  connection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '2px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    margin: '0 10px',
    position: 'relative',
  },
  packet: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-cloud-cyan)',
    boxShadow: 'var(--glow-cyan)',
    position: 'absolute',
    left: '0%',
    display: 'none',
  },
  verticalConnector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
  },
  telemetryContainer: {
    height: '100%',
  },
  telemetryCard: {
    padding: '24px',
    height: '100%',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
  },
  telemetryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '12px',
  },
  pulseContainer: {
    position: 'relative',
    width: '10px',
    height: '10px',
  },
  pulseDot: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#27c93f',
    left: '1px',
    top: '1px',
  },
  pulseRing: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: '2px solid #27c93f',
    animation: 'pulse-cyan 1.5s infinite',
    left: 0,
    top: 0,
  },
  telemetryTitle: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    letterSpacing: '0.1em',
  },
  telemetryBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  componentTitle: {
    fontSize: '1.4rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    marginBottom: '10px',
  },
  techList: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: '16px 0',
  },
  metricSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sectionHeading: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  bodyText: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  highlightBox: {
    display: 'flex',
    gap: '10px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.04)',
    alignItems: 'flex-start',
    marginTop: '4px',
  },
  highlightIcon: {
    color: 'var(--color-cloud-cyan)',
    filter: 'drop-shadow(var(--glow-cyan))',
    marginTop: '2px',
  },
  highlightText: {
    fontSize: '0.85rem',
    color: 'var(--text-bright)',
    lineHeight: 1.45,
  }
};
