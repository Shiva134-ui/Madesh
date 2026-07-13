import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Terminal({ isOpen, onClose, triggerCommand }) {
  const [history, setHistory] = useState([
    { text: 'MADESH.IN PORTFOLIO TERMINAL v1.0.0', type: 'system' },
    { text: 'Initializing portfolio session...', type: 'system' },
    { text: 'CONNECTION ESTABLISHED — READY', type: 'system' },
    { text: "Type 'help' to see available commands.", type: 'system' }
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
          { text: 'Available Commands:', type: 'system' },
          { text: '  skills       - View my current tech skills and learning stack.', type: 'info' },
          { text: '  projects     - List my completed and in-progress projects.', type: 'info' },
          { text: '  certs        - Show my verified certifications.', type: 'info' },
          { text: '  about        - Display personal info and career objective.', type: 'info' },
          { text: '  sudo deploy  - Run a DevOps deployment simulation.', type: 'warning' },
          { text: '  clear        - Clear terminal history.', type: 'info' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: '--- SKILLS & LEARNING STACK ---', type: 'system' },
          { text: '  [LANGUAGES]   Python, JavaScript, Java, HTML/CSS, Go (learning)', type: 'info' },
          { text: '  [WEB]         React, Node.js, Firebase, MySQL, MongoDB (learning)', type: 'info' },
          { text: '  [NETWORKING]  TCP/IP, OSI Model, DNS, HTTP/S, NAT, PAT, Routing', type: 'info' },
          { text: '  [LINUX]       Ubuntu, CLI commands, Shell scripting basics', type: 'info' },
          { text: '  [DEVOPS]      Docker, GitHub Actions, AWS, Kubernetes (all learning)', type: 'info' },
          { text: '  [VERSION CTRL] Git, GitHub', type: 'info' }
        );
        break;
      case 'projects':
        newHistory.push(
          { text: '--- PROJECTS ---', type: 'system' },
          { text: '  ✔ Portfolio Website    (React, Vite, CSS) — madesh.in', type: 'success' },
          { text: '  ✔ Janvi Boutique       (HTML, CSS, JS, Firebase) — E-commerce site', type: 'success' },
          { text: '  ✔ StreamX              (Details coming soon)', type: 'info' },
          { text: '  ✔ Luvia Luxury         (Details coming soon)', type: 'info' },
          { text: '  ⟳ Enterprise Network & Data Center Home Lab [IN PROGRESS]', type: 'warning' },
          { text: '  ⟳ DevOps Home Lab                           [IN PROGRESS]', type: 'warning' },
          { text: '  ⟳ Cloud-Native DevOps Platform              [IN PROGRESS]', type: 'warning' }
        );
        break;
      case 'certs':
        newHistory.push(
          { text: '--- CERTIFICATIONS ---', type: 'system' },
          { text: '  ✔ Claude with Google Vertex AI — Anthropic', type: 'success' },
          { text: '  ✔ C++ Programming — GreyLearn', type: 'success' },
          { text: '  ✔ Advanced Excel — GreyLearn', type: 'success' },
          { text: '  ⟳ AWS Certification — Target: In Progress', type: 'info' }
        );
        break;
      case 'about':
        newHistory.push(
          { text: '--- ABOUT MADESH S. NADAR ---', type: 'system' },
          { text: '  Name:     Madesh S. Nadar', type: 'info' },
          { text: '  Role:     Aspiring DevOps Engineer | CSE Student', type: 'info' },
          { text: '  College:  SCAD College of Engineering & Technology', type: 'info' },
          { text: '  CGPA:     7.5 | Batch: 2023–2027', type: 'info' },
          { text: '  Location: Cheranmahadevi, Tamil Nadu, India', type: 'info' },
          { text: '  Email:    sivamadesh.134@gmail.com', type: 'info' },
          { text: '  GitHub:   github.com/Shiva134-ui', type: 'info' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;
      case 'sudo deploy':
        newHistory.push(
          { text: '⚠ INITIATING DEVOPS DEPLOYMENT SIMULATION ⚠', type: 'warning' },
          { text: '🐳 Building Docker container image...', type: 'system' },
          { text: '⚙  Running GitHub Actions CI/CD pipeline...', type: 'system' },
          { text: '☁  Pushing to cloud registry...', type: 'system' },
          { text: '🚀 Deploying to environment...', type: 'system' },
          { text: '✅ DEPLOYMENT SIMULATION COMPLETE!', type: 'success' }
        );
        
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
