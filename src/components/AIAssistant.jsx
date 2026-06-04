import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, User, Zap } from 'lucide-react';

export default function AIAssistant({ onTriggerTerminalCommand, onFilterProjects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Greetings! I'm Madesh's AI Assistant. Ask me anything about his AI/ML research, cloud orchestrations, certifications, or projects. You can also select a quick-action scan below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const panelRef = useRef(null);
  const floatingBtnRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleRobotMouseMove = (e) => {
      const el = document.getElementById('robot-assistant-btn');
      if (!el) return;

      const restingCenterX = window.innerWidth - 24 - 28;
      const restingCenterY = window.innerHeight - 24 - 28;
      
      const dx = e.clientX - restingCenterX;
      const dy = e.clientY - restingCenterY;
      const dist = Math.hypot(dx, dy);
      
      const maxOffset = 3.5;
      const angle = Math.atan2(dy, dx);
      const moveDist = Math.min(dist * 0.015, maxOffset);
      
      setEyeOffset({
        x: Math.cos(angle) * moveDist,
        y: Math.sin(angle) * moveDist
      });

      const triggerRadius = 120;
      if (dist < triggerRadius && !isOpen) {
        const pullForce = (1 - dist / triggerRadius) * 18;
        const pullX = Math.cos(angle) * pullForce;
        const pullY = Math.sin(angle) * pullForce;
        
        el.style.transition = 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)';
        el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.08)`;
        el.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.15)';
      } else {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transform = '';
        el.style.boxShadow = isOpen ? 'none' : 'var(--glow-magenta)';
      }
    };

    window.addEventListener('mousemove', handleRobotMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleRobotMouseMove);
    };
  }, [isOpen]);

  // Close panel when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        floatingBtnRef.current &&
        !floatingBtnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const localKnowledge = {
    intro: "Madesh S is a Computer Science and Engineering student with a strong interest in Artificial Intelligence, Machine Learning, Cloud Computing, and Full Stack Development. He enjoys building intelligent applications, developing practical software solutions, and exploring emerging technologies that solve real-world problems.",
    pytorch: "Madesh works with AI/ML tools including PyTorch and TensorFlow:\n\n• Deep Learning: Building neural architectures and data pipelines.\n• Model Training: Fine-tuning models and implementing machine learning algorithms.\n• Projects: Creating AI-powered search, classification, and automation applications.",
    sagemaker: "Madesh develops practical software and cloud workflows:\n\n• Full-Stack Web Development: Creating responsive user interfaces and backend API routes.\n• Self-Hosted Infrastructure: Configuring home servers, reverse proxies, and self-hosted dev environments.\n• Pipeline Automation: Setting up testing, validation, and container builds.",
    aws: "Madesh configures cloud systems and automation tools:\n\n• Cloud Platforms: Orchestrating VPCs, container services, and storage instances on AWS.\n• Infrastructure as Code: Working with tools like Terraform to script infrastructure setups.\n• Containers: Deploying applications using Docker containers.",
    experience: "Madesh's development journey and project history includes:\n\n• AI-powered Applications: Developing intelligence tools, neural network scripts, and model fine-tuning workflows.\n• Full-Stack Projects: Designing web dashboards, API servers, and responsive portfolios.\n• Cloud & Self-Hosting: Configuring containerized apps, deploying to cloud zones, and automating deployment pipelines.\n• CSE Studies: Building a strong foundation in computer science and engineering at university.",
    certifications: "Madesh holds premier verified industry certifications:\n\n• AWS Certified Solutions Architect – Associate\n• AWS Certified Machine Learning – Specialty\n• GCP Professional Cloud Architect (In-progress)",
    contact: "You can reach Madesh S directly:\n\n• Email: sivamadesh.134@gmail.com\n• Phone: +91 89284 05063\n• Location: Tirunelveli, Tamil Nadu, India\n• LinkedIn/GitHub: Accessible via his contact section.",
    hiring: "Yes! Madesh is preparing for future opportunities in technology and innovation, and is open to internships, junior developer, MLOps, or cloud engineering roles. Feel free to contact him directly!",
    deploy: "Initiating secure system deployment simulation. This will open the interactive developer console and trigger the deployment routines...",
    default: "I'm Madesh's autonomous assistant. Ask me about his computer science studies, AI/ML models, cloud configurations, full-stack projects, or run 'sudo deploy' to view the terminal!"
  };

  const getBotResponse = (text) => {
    const clean = text.toLowerCase().trim();
    
    if (clean.includes('who is') || clean.includes('about madesh') || clean.includes('background') || clean.includes('intro') || clean.includes('profile')) {
      return { text: localKnowledge.intro };
    }
    if (clean.includes('pytorch') || clean.includes('torch') || clean.includes('deep learning') || clean.includes('model') || clean.includes('nlp')) {
      return { text: localKnowledge.pytorch, filter: 'ai-ml' };
    }
    if (clean.includes('sagemaker') || clean.includes('pipeline') || clean.includes('mlops') || clean.includes('inference')) {
      return { text: localKnowledge.sagemaker, filter: 'mlops' };
    }
    if (clean.includes('aws') || clean.includes('cloud') || clean.includes('terraform') || clean.includes('infra') || clean.includes('gcp') || clean.includes('kubernetes')) {
      return { text: localKnowledge.aws, filter: 'cloud-infra' };
    }
    if (clean.includes('experience') || clean.includes('work') || clean.includes('career') || clean.includes('job') || clean.includes('history')) {
      return { text: localKnowledge.experience };
    }
    if (clean.includes('certification') || clean.includes('cert') || clean.includes('credential')) {
      return { text: localKnowledge.certifications };
    }
    if (clean.includes('contact') || clean.includes('email') || clean.includes('phone') || clean.includes('reach') || clean.includes('call') || clean.includes('location')) {
      return { text: localKnowledge.contact };
    }
    if (clean.includes('hire') || clean.includes('open to') || clean.includes('opportunity') || clean.includes('recruit')) {
      return { text: localKnowledge.hiring };
    }
    if (clean.includes('simulate') || clean.includes('sudo') || clean.includes('deploy') || clean.includes('terminal') || clean.includes('run')) {
      return { text: localKnowledge.deploy, deploy: true };
    }
    
    return { text: localKnowledge.default };
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      const responseObj = getBotResponse(text);
      const fullText = responseObj.text;
      
      if (responseObj.filter) {
        onFilterProjects && onFilterProjects(responseObj.filter);
      }
      
      if (responseObj.deploy) {
        setTimeout(() => {
          setIsOpen(false);
          onTriggerTerminalCommand && onTriggerTerminalCommand('sudo deploy');
        }, 1800);
      }

      const botMsgId = Date.now() + 1;
      const botMsg = {
        id: botMsgId,
        sender: 'bot',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);

      const words = fullText.split(' ');
      let currentWordIndex = 0;
      let currentText = '';

      typingIntervalRef.current = setInterval(() => {
        if (currentWordIndex < words.length) {
          currentText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
          setMessages(prev => 
            prev.map(m => m.id === botMsgId ? { ...m, text: currentText } : m)
          );
          currentWordIndex++;
        } else {
          clearInterval(typingIntervalRef.current);
        }
      }, 35);
    }, 800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  return (
    <>
      <button 
        id="robot-assistant-btn"
        ref={floatingBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...styles.floatingBtn,
          boxShadow: isOpen ? 'none' : 'var(--glow-magenta)',
          transform: isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1)'
        }}
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ transition: 'transform 0.2s' }}>
            <circle cx="18" cy="18" r="13" fill="var(--bg-panel-dark)" stroke="var(--color-glass-border)" strokeWidth="1.5" />
            <rect x="9" y="12" width="18" height="8" rx="4" fill="#080808" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx={14 + eyeOffset.x} cy={16 + eyeOffset.y} r="2" fill="var(--color-ai-magenta)" style={{ filter: 'drop-shadow(var(--glow-magenta))' }} />
            <circle cx={22 + eyeOffset.x} cy={16 + eyeOffset.y} r="2" fill="var(--color-ai-magenta)" style={{ filter: 'drop-shadow(var(--glow-magenta))' }} />
            <rect x="14" y="23" width="8" height="1.5" rx="0.75" fill="var(--color-cloud-cyan)" />
            <line x1="18" y1="5" x2="18" y2="8" stroke="var(--color-glass-border)" strokeWidth="1.5" />
            <circle cx="18" cy="4" r="1.5" fill="var(--color-ai-magenta)" />
          </svg>
        )}
        {!isOpen && <span style={styles.notificationDot} />}
      </button>

      {isOpen && (
        <div ref={panelRef} className="glass-panel ai-assistant-panel" style={styles.chatPanel}>
          <div style={styles.panelHeader}>
            <div style={styles.headerInfo}>
              <div style={styles.avatar}>
                <Bot size={18} style={{ color: 'var(--color-ai-magenta)' }} />
              </div>
              <div style={styles.nameContainer}>
                <span style={styles.agentName}>AURA AI Assistant</span>
                <div style={styles.statusGroup}>
                  <span className="status-dot" />
                  <span style={styles.agentStatus}>Online & Ready</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
              <X size={18} />
            </button>
          </div>

          <div style={styles.messageBox}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {msg.sender === 'bot' && (
                  <div style={{...styles.msgAvatar, backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--color-glass-border)'}}>
                    <Bot size={11} style={{ color: 'var(--color-ai-magenta)' }} />
                  </div>
                )}
                
                <div 
                  style={{
                    ...styles.msgBubble,
                    backgroundColor: msg.sender === 'user' ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    borderColor: msg.sender === 'user' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <p style={styles.msgText}>{msg.text}</p>
                  <span style={styles.msgTime}>{msg.timestamp}</span>
                </div>

                {msg.sender === 'user' && (
                  <div style={{...styles.msgAvatar, backgroundColor: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.15)'}}>
                    <User size={11} style={{ color: 'var(--color-cloud-cyan)' }} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{...styles.messageRow, justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                <div style={{...styles.msgAvatar, backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--color-glass-border)'}}>
                  <Bot size={11} style={{ color: 'var(--color-ai-magenta)' }} />
                </div>
                <div style={{...styles.msgBubble, backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255,255,255,0.06)'}}>
                  <div style={styles.typingDots}>
                    <span style={styles.dot} />
                    <span style={{...styles.dot, animationDelay: '0.15s'}} />
                    <span style={{...styles.dot, animationDelay: '0.3s'}} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          <div style={styles.quickActions}>
            <button onClick={() => handleSendMessage("Tell me about Madesh's background")} style={styles.actionBtn}>
              <Sparkles size={11} /> About Madesh
            </button>
            <button onClick={() => handleSendMessage("What deep learning projects does he have?")} style={styles.actionBtn}>
              <Sparkles size={11} /> Projects
            </button>
            <button onClick={() => handleSendMessage("Tell me about Madesh's PyTorch experience")} style={styles.actionBtn}>
              <Sparkles size={11} /> PyTorch Deep Learning
            </button>
            <button onClick={() => handleSendMessage("What certifications does Madesh hold?")} style={styles.actionBtn}>
              <Sparkles size={11} /> Certifications
            </button>
            <button onClick={() => handleSendMessage("Simulate system deployment")} style={{...styles.actionBtn, borderColor: 'var(--color-ai-magenta)', color: 'var(--color-ai-magenta)'}}>
              <Zap size={11} /> Deploy System
            </button>
          </div>

          <div style={styles.inputFooter}>
            <input 
              type="text"
              placeholder="Ask AURA a question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={styles.textInput}
            />
            <button onClick={() => handleSendMessage()} style={styles.sendBtn}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  floatingBtn: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-panel-dark)',
    border: '1px solid var(--color-glass-border)',
    color: 'var(--text-bright)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 9999,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  notificationDot: {
    position: 'absolute',
    top: '3px',
    right: '3px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-ai-magenta)',
    border: '2px solid var(--bg-panel-dark)',
    boxShadow: 'var(--glow-magenta)',
  },
  chatPanel: {
    position: 'fixed',
    bottom: '96px',
    right: '24px',
    width: '360px',
    height: '480px',
    borderRadius: '16px',
    border: '1px solid var(--color-glass-border)',
    backgroundColor: 'rgba(10, 8, 25, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), var(--glow-magenta)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 9999,
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    backgroundColor: 'rgba(7, 5, 20, 0.85)',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(254, 1, 154, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(254, 1, 154, 0.2)',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  agentName: {
    fontSize: '0.85rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    color: 'var(--text-bright)',
    letterSpacing: '0.02em',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  agentStatus: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-mono)',
    color: '#27c93f',
    letterSpacing: '0.02em',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-dark)',
    cursor: 'pointer',
    padding: '4px',
    transition: 'color 0.2s',
  },
  messageBox: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageRow: {
    display: 'flex',
    gap: '8px',
    maxWidth: '85%',
    alignItems: 'flex-start',
  },
  msgAvatar: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
    flexShrink: 0,
  },
  msgBubble: {
    padding: '10px 14px',
    borderRadius: '14px',
    border: '1px solid var(--color-glass-border)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  msgText: {
    fontSize: '0.82rem',
    color: 'var(--text-bright)',
    lineHeight: 1.45,
    whiteSpace: 'pre-line',
  },
  msgTime: {
    fontSize: '0.62rem',
    color: 'var(--text-dark)',
    display: 'block',
    marginTop: '4px',
    textAlign: 'right',
  },
  typingDots: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    height: '14px',
    padding: '0 4px',
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-ai-magenta)',
    opacity: 0.6,
    animation: 'float 1s ease-in-out infinite alternate',
  },
  quickActions: {
    display: 'flex',
    gap: '6px',
    padding: '10px 16px',
    overflowX: 'auto',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTop: '1px solid rgba(255,255,255,0.03)',
    scrollbarWidth: 'none',
  },
  actionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    color: 'var(--text-muted)',
    fontSize: '0.72rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  inputFooter: {
    display: 'flex',
    padding: '12px 16px',
    gap: '8px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(7, 5, 20, 0.85)',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '0.82rem',
    color: 'var(--text-bright)',
    outline: 'none',
  },
  sendBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-cyber-purple)',
    border: 'none',
    color: 'var(--text-pure)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }
};
