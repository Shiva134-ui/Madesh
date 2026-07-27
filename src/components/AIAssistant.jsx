import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, User, Zap, Terminal, Code2, Cpu, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AIAssistant({ onTriggerTerminalCommand, onFilterProjects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm Madesh's AI Copilot. Ask me anything about his DevOps journey, cloud infrastructure, certifications, or projects. You can also select a quick action below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  const chatEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const panelRef = useRef(null);
  const floatingBtnRef = useRef(null);
  const chipsScrollRef = useRef(null);

  const scrollChips = (direction) => {
    if (chipsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      chipsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Eye-tracking & magnet effect for robot button
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

      const triggerRadius = 140;
      if (dist < triggerRadius && !isOpen) {
        const pullForce = (1 - dist / triggerRadius) * 18;
        const pullX = Math.cos(angle) * pullForce;
        const pullY = Math.sin(angle) * pullForce;
        
        el.style.transition = 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)';
        el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.08)`;
        el.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.4)';
      } else {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transform = '';
        el.style.boxShadow = isOpen ? 'none' : '0 0 15px rgba(255, 255, 255, 0.2)';
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
    intro: "Madesh S is an Aspiring DevOps Engineer and CSE Student (2023–2027) passionate about Cloud Infrastructure, Linux Automation, Containerization, and Systems Networking. His mission is to design resilient CI/CD pipelines and high-availability cloud solutions.",
    techStack: "Madesh's core technical toolkit:\n\n• Cloud & Infrastructure: AWS (EC2, S3, IAM), Azure, Docker, Kubernetes, Terraform\n• Scripting & Dev: Python, Go, JavaScript, Bash, React\n• CI/CD & Automation: GitHub Actions, Linux Administration, Git Workflows\n• Networking: Systems Protocols, Subnetting, Security Fundamentals",
    projects: "Madesh has built production-grade systems including:\n\n• Automated CI/CD Cloud Pipeline with Docker & GitHub Actions\n• Full-Stack Cloud Monitoring & Microservice Architecture\n• System Architecture Visualizer & Interactive CLI Tools",
    experience: "Madesh's experience and education:\n\n• DevOps Intern @ ICANIO Technologies — Hands-on exposure to Linux systems, Git workflows, cloud concepts, and container deployment.\n• B.E. Computer Science & Engineering @ SCAD College (2023–2027) | CGPA: 7.5\n• Continuous Learner building real-world infrastructure automation projects.",
    certifications: "Madesh holds verified technical credentials:\n\n• Anthropic — Claude with Google Vertex AI\n• GreyLearn — C++ Programming Certification\n• GreyLearn — Advanced Data Analytics & Excel\n\nCurrently preparing for AWS Certified Solutions Architect Associate.",
    contact: "You can reach Madesh S directly:\n\n• Email: sivamadesh.134@gmail.com\n• Phone: +91 8928405063\n• Location: Cheranmahadevi, Tamil Nadu, India\n• LinkedIn: linkedin.com/in/madesh-s-927138328/\n• GitHub: github.com/Shiva134-ui\n• YouTube: youtube.com/@mdhgamerz-h2m",
    hiring: "Yes! Madesh is actively looking for DevOps Internships, Junior DevOps Engineering roles, Cloud Administrator positions, and Infrastructure projects. Feel free to connect via email or LinkedIn!",
    deploy: "Initializing developer console... Launching interactive terminal mode.",
    default: "I'm Madesh's AI Copilot. Ask me about his DevOps learning journey, AWS/Docker skills, featured projects, certifications, education, or contact details. You can also launch the terminal for an interactive CLI experience!"
  };

  const getBotResponse = (text) => {
    const clean = text.toLowerCase().trim();
    
    if (clean.includes('who is') || clean.includes('about') || clean.includes('background') || clean.includes('intro') || clean.includes('profile') || clean.includes('bio')) {
      return { text: localKnowledge.intro };
    }
    if (clean.includes('stack') || clean.includes('skill') || clean.includes('docker') || clean.includes('kubernetes') || clean.includes('aws') || clean.includes('python') || clean.includes('linux')) {
      return { text: localKnowledge.techStack, filter: 'devops' };
    }
    if (clean.includes('project') || clean.includes('build') || clean.includes('code') || clean.includes('portfolio') || clean.includes('repo')) {
      return { text: localKnowledge.projects, filter: 'all' };
    }
    if (clean.includes('experience') || clean.includes('intern') || clean.includes('work') || clean.includes('college') || clean.includes('education') || clean.includes('history')) {
      return { text: localKnowledge.experience };
    }
    if (clean.includes('certif') || clean.includes('cred') || clean.includes('anthropic') || clean.includes('vertex')) {
      return { text: localKnowledge.certifications };
    }
    if (clean.includes('contact') || clean.includes('email') || clean.includes('phone') || clean.includes('reach') || clean.includes('linkedin') || clean.includes('location')) {
      return { text: localKnowledge.contact };
    }
    if (clean.includes('hire') || clean.includes('role') || clean.includes('job') || clean.includes('opportunity') || clean.includes('open')) {
      return { text: localKnowledge.hiring };
    }
    if (clean.includes('deploy') || clean.includes('terminal') || clean.includes('cli') || clean.includes('run') || clean.includes('sudo')) {
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
        }, 1200);
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
      }, 30);
    }, 500);
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
      {/* INTERACTIVE EYE-TRACKING ROBOT FLOATING BUTTON */}
      <button 
        id="robot-assistant-btn"
        ref={floatingBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
        style={{
          ...styles.floatingBtn,
          boxShadow: isOpen ? 'none' : '0 0 15px rgba(255, 255, 255, 0.2)',
          transform: isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1)'
        }}
      >
        {isOpen ? (
          <X size={24} style={{ color: '#ffffff' }} />
        ) : (
          <svg width="38" height="38" viewBox="0 0 36 36" fill="none" style={{ transition: 'transform 0.2s' }}>
            <circle cx="18" cy="18" r="13" fill="#0c0e17" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
            <rect x="9" y="12" width="18" height="8" rx="4" fill="#04050a" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            <circle cx={14 + eyeOffset.x} cy={16 + eyeOffset.y} r="2" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))' }} />
            <circle cx={22 + eyeOffset.x} cy={16 + eyeOffset.y} r="2" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))' }} />
            <rect x="14" y="23" width="8" height="1.5" rx="0.75" fill="#ffffff" />
            <line x1="18" y1="5" x2="18" y2="8" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
            <circle cx="18" cy="4" r="1.5" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }} />
          </svg>
        )}
      </button>

      {/* SLEEK CYBER-GLASS CHAT PANEL */}
      {isOpen && (
        <div ref={panelRef} className="glass-panel ai-assistant-panel" style={styles.chatPanel}>
          {/* HEADER */}
          <div style={styles.panelHeader}>
            <div style={styles.headerInfo}>
              <div style={styles.avatar}>
                <Bot size={18} style={{ color: 'var(--color-cloud-cyan)' }} />
              </div>
              <div style={styles.nameContainer}>
                <span style={styles.agentName}>MADESH.IN AI COPILOT</span>
                <div style={styles.statusGroup}>
                  <span className="status-dot" style={{ backgroundColor: '#27c93f', boxShadow: '0 0 10px #27c93f' }} />
                  <span style={styles.agentStatus}>DevOps Assistant • Online</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onTriggerTerminalCommand && onTriggerTerminalCommand('help');
                }}
                className="nav-link-btn"
                style={styles.headerActionBtn}
                title="Launch CLI Terminal"
              >
                <Terminal size={14} />
              </button>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn} title="Close Assistant">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* MESSAGES LIST */}
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
                  <div style={styles.botAvatar}>
                    <Bot size={12} style={{ color: 'var(--color-cloud-cyan)' }} />
                  </div>
                )}
                
                <div 
                  style={{
                    ...styles.msgBubble,
                    backgroundColor: msg.sender === 'user' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    borderColor: msg.sender === 'user' ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <p style={styles.msgText}>{msg.text}</p>
                  <span style={styles.msgTime}>{msg.timestamp}</span>
                </div>

                {msg.sender === 'user' && (
                  <div style={styles.userAvatar}>
                    <User size={12} style={{ color: '#ffffff' }} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ ...styles.messageRow, justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                <div style={styles.botAvatar}>
                  <Bot size={12} style={{ color: 'var(--color-cloud-cyan)' }} />
                </div>
                <div style={{ ...styles.msgBubble, backgroundColor: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <div style={styles.typingDots}>
                    <span style={styles.dot} />
                    <span style={{ ...styles.dot, animationDelay: '0.15s' }} />
                    <span style={{ ...styles.dot, animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* QUICK ACTION CAROUSEL WITH SMOOTH SCROLL ARROWS */}
          <div style={styles.carouselContainer}>
            <button 
              onClick={() => scrollChips('left')} 
              style={styles.arrowBtn}
              className="ai-arrow-btn"
              title="Scroll Left"
            >
              <ChevronLeft size={14} />
            </button>

            <div ref={chipsScrollRef} style={styles.quickActions} className="ai-chips-scroll">
              <button onClick={() => handleSendMessage("About Madesh")} style={styles.actionBtn} className="ai-chip-btn">
                <User size={12} style={{ color: 'var(--color-cloud-cyan)' }} /> About
              </button>
              <button onClick={() => handleSendMessage("Tell me about Madesh's DevOps & Cloud stack")} style={styles.actionBtn} className="ai-chip-btn">
                <Cpu size={12} style={{ color: 'var(--color-cloud-cyan)' }} /> Tech Stack
              </button>
              <button onClick={() => handleSendMessage("What projects has Madesh built?")} style={styles.actionBtn} className="ai-chip-btn">
                <Code2 size={12} style={{ color: 'var(--color-cloud-cyan)' }} /> Projects
              </button>
              <button onClick={() => handleSendMessage("What certifications does Madesh hold?")} style={styles.actionBtn} className="ai-chip-btn">
                <ShieldCheck size={12} style={{ color: 'var(--color-cloud-cyan)' }} /> Certifications
              </button>
              <button onClick={() => handleSendMessage("How can I contact Madesh?")} style={styles.actionBtn} className="ai-chip-btn">
                <Sparkles size={12} style={{ color: 'var(--color-cloud-cyan)' }} /> Contact
              </button>
              <button 
                onClick={() => handleSendMessage("Simulate system deployment")} 
                style={{ ...styles.actionBtn, borderColor: 'rgba(0, 240, 255, 0.3)', color: 'var(--color-cloud-cyan)', backgroundColor: 'rgba(0, 240, 255, 0.08)' }}
                className="ai-chip-btn"
              >
                <Zap size={12} style={{ color: 'var(--color-cloud-cyan)' }} /> Deploy System
              </button>
            </div>

            <button 
              onClick={() => scrollChips('right')} 
              style={styles.arrowBtn}
              className="ai-arrow-btn"
              title="Scroll Right"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* INPUT FOOTER */}
          <div style={styles.inputFooter}>
            <input 
              type="text"
              placeholder="Ask about DevOps, projects, skills..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={styles.textInput}
              className="ai-chat-input"
            />
            <button onClick={() => handleSendMessage()} style={styles.sendBtn} className="ai-send-btn" title="Send Message">
              <Send size={15} />
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
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 9999,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  chatPanel: {
    position: 'fixed',
    bottom: '96px',
    right: '24px',
    width: '395px',
    height: '520px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(6, 7, 16, 0.95)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 240, 255, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 9999,
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(4, 5, 12, 0.95)',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0, 240, 255, 0.25)',
    boxShadow: '0 0 12px rgba(0, 240, 255, 0.15)',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  agentName: {
    fontSize: '0.85rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    color: 'var(--text-bright)',
    letterSpacing: '0.06em',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  agentStatus: {
    fontSize: '0.62rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    letterSpacing: '0.03em',
  },
  headerActionBtn: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--color-cloud-cyan)',
    borderRadius: '8px',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    maxWidth: '88%',
    alignItems: 'flex-start',
  },
  botAvatar: {
    width: '26px',
    height: '26px',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
    border: '1px solid rgba(0, 240, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
    flexShrink: 0,
  },
  userAvatar: {
    width: '26px',
    height: '26px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
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
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
  },
  msgText: {
    fontSize: '0.83rem',
    color: 'var(--text-bright)',
    lineHeight: 1.5,
    whiteSpace: 'pre-line',
  },
  msgTime: {
    fontSize: '0.6rem',
    color: 'var(--text-dark)',
    display: 'block',
    marginTop: '4px',
    textAlign: 'right',
    fontFamily: 'var(--font-mono)',
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
    backgroundColor: 'var(--color-cloud-cyan)',
    opacity: 0.7,
    animation: 'float 1s ease-in-out infinite alternate',
  },
  carouselContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    gap: '6px',
  },
  arrowBtn: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--color-cloud-cyan)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s ease',
  },
  quickActions: {
    flex: 1,
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '8px',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
  },
  actionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 13px',
    borderRadius: '18px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: 'var(--text-bright)',
    fontSize: '0.73rem',
    fontFamily: 'var(--font-mono)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
  },
  inputFooter: {
    display: 'flex',
    padding: '12px 16px',
    gap: '10px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(4, 5, 12, 0.95)',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '24px',
    padding: '9px 16px',
    fontSize: '0.83rem',
    color: 'var(--text-bright)',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  sendBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-cloud-cyan)',
    border: 'none',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
    transition: 'transform 0.2s, background-color 0.2s',
  }
};
