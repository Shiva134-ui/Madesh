import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Terminal({ isOpen, onClose, triggerCommand }) {
  const [history, setHistory] = useState([
    { text: 'MADESH OPERATIONAL SYSTEMS v4.2.1', type: 'system' },
    { text: 'Establishing secure connection...', type: 'system' },
    { text: 'ESTABLISHING AWS SECURE ROUTING... DONE', type: 'system' },
    { text: "Type 'help' to review available terminal actions.", type: 'system' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Scroll to bottom on new console output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleExecuteCommand = (cmdText) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `madesh@portfolio:~$ ${cmdText}`, type: 'user' }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'Available System Operations:', type: 'system' },
          { text: '  skills       - Telemetry scan of core ML, Cloud, and engineering skills.', type: 'info' },
          { text: '  projects     - Scan full list of deployed cloud & AI projects.', type: 'info' },
          { text: '  certs        - Scan professional certifications & qualifications.', type: 'info' },
          { text: '  sudo deploy  - Run production MLOps pipeline container deployment.', type: 'warning' },
          { text: '  clear        - Flush terminal buffer history.', type: 'info' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: '--- CORE CAPABILITIES ANALYSIS ---', type: 'system' },
          { text: '  [AI/ML]      PyTorch, TensorFlow, SageMaker Pipelines, NLP/RAG, LLMs', type: 'info' },
          { text: '  [CLOUD]      AWS (VPC, ECS, Lambda, IAM), GCP, Infrastructure-as-Code (Terraform)', type: 'info' },
          { text: '  [DATA]       Pinecone, Redis, PostgreSQL, Snowflake, Apache Spark', type: 'info' },
          { text: '  [DEVOPS]     Docker, Kubernetes, GitHub Actions (CI/CD), MLflow', type: 'info' }
        );
        break;
      case 'projects':
        newHistory.push(
          { text: '--- PRODUCTION SYSTEMS SCAN ---', type: 'system' },
          { text: '  1. Real-time Video MLOps Pipeline (AWS, ECS, Terraform, PyTorch, Docker)', type: 'info' },
          { text: '  2. RAG AI Cloud Monitor Agent (FastAPI, LangChain, Pinecone, GCP)', type: 'info' },
          { text: '  3. High-throughput Serverless Data Collector (AWS Lambda, Kinesis, S3)', type: 'info' },
          { text: '  4. Distributed Deep Learning Trainer (Kubernetes, AWS Spot Instances)', type: 'info' }
        );
        break;
      case 'certs':
        newHistory.push(
          { text: '--- ACQUIRED PROFESSIONAL QUALIFICATIONS ---', type: 'system' },
          { text: '  ✔ AWS Certified Solutions Architect - Associate', type: 'success' },
          { text: '  ✔ AWS Certified Machine Learning - Specialty', type: 'success' },
          { text: '  ✔ Google Cloud Professional Cloud Architect (Candidate)', type: 'info' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;
      case 'sudo deploy':
        newHistory.push(
          { text: '⚠ WARNING: INITIATING PRODUCTION DEPLOYMENT SEQUENCE ⚠', type: 'warning' },
          { text: '🚀 Allocating AWS EC2 Auto-Scaling compute nodes...', type: 'system' },
          { text: '🐳 Containerizing PyTorch model inference with Docker...', type: 'system' },
          { text: '⚡ Injecting pinecone vector contexts & cache...', type: 'system' },
          { text: '⚙ Compiling TensorRT model engine... 3x performance increase verified.', type: 'system' },
          { text: '🔥 DEPLOYMENT SUCCESSFUL! API GATEWAY ROUTE SECURED.', type: 'success' }
        );
        
        // Trigger explosive confetti celebration!
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#888888', '#cccccc', '#333333']
          });
        }, 800);
        break;
      default:
        newHistory.push({ text: `bash: command not found: ${cmdText}. Type 'help' for options.`, type: 'error' });
    }

    setHistory(newHistory);
    setInputValue('');
  };

  // Support external triggers (e.g. from chatbot)
  useEffect(() => {
    if (triggerCommand) {
      setTimeout(() => handleExecuteCommand(triggerCommand), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerCommand]);

  if (!isOpen) return null;

  return (
    <div style={styles.terminalDrawer} className="terminal-drawer">
      {/* Console Header Bar */}
      <div style={styles.header}>
        <div style={styles.leftGroup}>
          <TerminalIcon size={16} style={{ color: 'var(--color-cloud-cyan)' }} />
          <span style={styles.title} className="terminal-title">
            <span className="title-long">SYSTEM DIAGNOSTICS OPERATION CONSOLE</span>
            <span className="title-short">SYSTEM CONSOLE</span>
          </span>
        </div>
        <button onClick={onClose} style={styles.closeBtn}>
          <X size={18} />
        </button>
      </div>

      {/* Console Output Screen */}
      <div style={styles.screen}>
        <div style={styles.outputBox}>
          {history.map((line, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.line,
                color: 
                  line.type === 'user' ? 'var(--text-bright)' :
                  line.type === 'error' ? '#ff5f56' :
                  line.type === 'warning' ? '#ffbd2e' :
                  line.type === 'success' ? '#27c93f' :
                  line.type === 'info' ? 'var(--color-cloud-cyan)' :
                  'var(--text-muted)'
              }}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt */}
        <div style={styles.promptLine}>
          <ChevronRight size={16} style={styles.promptArrow} />
          <span style={styles.promptPath}>madesh@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExecuteCommand(inputValue)}
            style={styles.inputField}
            placeholder="Type 'help'..."
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  terminalDrawer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '280px',
    backgroundColor: 'var(--bg-deep-space)',
    borderTop: '1px solid var(--color-glass-border)',
    boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9990,
    animation: 'slideUp 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'var(--bg-panel-dark)',
  },
  leftGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  title: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    letterSpacing: '0.08em',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    padding: '4px',
    transition: 'color 0.2s',
  },
  screen: {
    flex: 1,
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  outputBox: {
    flex: 1,
    overflowY: 'auto',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '10px',
  },
  line: {
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
  },
  promptLine: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    borderTop: '1px solid rgba(255,255,255,0.03)',
    paddingTop: '8px',
  },
  promptArrow: {
    color: 'var(--color-ai-magenta)',
    marginRight: '4px',
  },
  promptPath: {
    color: '#27c93f',
    marginRight: '8px',
  },
  inputField: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-bright)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
  }
};
