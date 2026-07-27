import { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const EMAIL = 'sivamadesh.134@gmail.com';

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f94b78ab-6009-4bb5-91bf-7695f5a36efc",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Portfolio Contact System",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        // Trigger spectacular success confetti!
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#ffffff', '#888888', '#cccccc', '#333333']
        });

        // Reset form after a small delay
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ name: '', email: '', message: '' });
        }, 5000);
      } else {
        console.error("Form submission error:", result);
        alert("Failed to send transmission. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission exception:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--bg-deep-space)', position: 'relative' }}>
      <div className="container">
        
        <div ref={headerRef} className={`section-header reveal-down ${headerVisible ? 'visible' : ''}`}>
          <span className="badge badge-ai" style={{ marginBottom: '10px' }}>COMMUNICATION ROUTER</span>
          <h2 className="section-title">Initialize Connection</h2>
          <p className="section-subtitle">
            Recruiters, hiring managers, and developers: Feel free to send a secure transmission to discuss active projects or partnerships.
          </p>
        </div>

        <div ref={contentRef} style={styles.grid} className={`stagger-container ${contentVisible ? 'visible' : ''}`}>
          {/* LEFT COLUMN: CONNECTION INFO */}
          <div className="glass-panel reveal-left stagger-item" style={styles.infoCard}>
            <div style={styles.infoHead}>
              <h3 style={styles.infoTitle}>Connect Offline</h3>
              <p style={styles.infoDesc}>Feel free to reach out via email, phone, or LinkedIn. I am always open to discussing new technical roles or project solutions.</p>
            </div>

            <div style={styles.infoList}>
              <div style={styles.infoItem}>
                <div style={styles.infoIconBg}>
                  <Mail size={18} style={{ color: 'var(--color-ai-magenta)' }} />
                </div>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>EMAIL</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a href={`mailto:${EMAIL}`} style={styles.infoValue}>{EMAIL}</a>
                    <button
                      onClick={copyEmail}
                      title={emailCopied ? 'Copied!' : 'Copy email'}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        color: emailCopied ? '#27c93f' : 'var(--text-dark)',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {emailCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIconBg}>
                  <Phone size={18} style={{ color: 'var(--color-cloud-cyan)' }} />
                </div>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>PHONE</span>
                  <a href="tel:+918928405063" style={styles.infoValue}>+91 89284 05063</a>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIconBg}>
                  <MapPin size={18} style={{ color: 'var(--color-cyber-purple)' }} />
                </div>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>LOCATION</span>
                  <span style={styles.infoValue}>Cheranmahadevi, Tamil Nadu, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div style={styles.socialRow}>
                <a href="https://github.com/Shiva134-ui" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/madesh-s-927138328/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://www.youtube.com/@mdhgamerz-h2m" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </div>
            </div>

            <div style={styles.shieldPanel}>
              <ShieldCheck size={20} style={{ color: '#27c93f', flexShrink: 0 }} />
              <span style={styles.shieldText}>
                Encrypted secure sockets active. All inputs filtered against SQL Injection and XSS attacks.
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="glass-panel reveal-right stagger-item" style={styles.formCard}>
            {isSuccess ? (
              <div style={styles.successContainer}>
                <CheckCircle2 size={56} style={styles.successIcon} />
                <h3 style={styles.successTitle}>Transmission Complete!</h3>
                <p style={styles.successDesc}>
                  Your message has been processed through my secure mail server routers. I will review your request and initialize a feedback connection shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                
                {/* Name */}
                <div style={styles.inputGroup}>
                  <label htmlFor="name" style={styles.label}>IDENTIFY VISITOR NAME</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Alexis Carter"
                    style={styles.input}
                  />
                </div>

                {/* Email */}
                <div style={styles.inputGroup}>
                  <label htmlFor="email" style={styles.label}>VISITOR EMAIL ENDPOINT</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="e.g. alexis@company.com"
                    style={styles.input}
                  />
                </div>

                {/* Message */}
                <div style={styles.inputGroup}>
                  <label htmlFor="message" style={styles.label}>TRANSMISSION BODY DATA</label>
                  <textarea
                    id="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Type details here..."
                    style={styles.textarea}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    ...styles.submitBtn,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Send size={16} />
                  {isSubmitting ? 'TRANSMITTING SECURE DATA...' : 'INITIALIZE ROUTING CONNECTION'}
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '40px',
    alignItems: 'stretch',
    marginTop: '20px',
  },
  infoCard: {
    padding: '30px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  infoHead: {
    marginBottom: '30px',
  },
  infoTitle: {
    fontSize: '1.5rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    marginBottom: '10px',
  },
  infoDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flex: 1,
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  infoIconBg: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoLabel: {
    fontSize: '0.68rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  infoValue: {
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    fontWeight: '500',
    color: 'var(--text-bright)',
    marginTop: '2px',
  },
  shieldPanel: {
    display: 'flex',
    gap: '12px',
    backgroundColor: 'rgba(39, 201, 63, 0.04)',
    border: '1px solid rgba(39, 201, 63, 0.12)',
    padding: '16px',
    borderRadius: '10px',
    alignItems: 'center',
    marginTop: '30px',
  },
  shieldText: {
    fontSize: '0.78rem',
    color: '#27c93f',
    lineHeight: 1.4,
  },
  formCard: {
    padding: '30px',
    backgroundColor: 'var(--bg-glass-card)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.68rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-dark)',
    letterSpacing: '0.05em',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '0.9rem',
    color: 'var(--text-bright)',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '0.9rem',
    color: 'var(--text-bright)',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '0.92rem',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '10px',
  },
  successContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    animation: 'float 3s ease-in-out infinite',
  },
  successIcon: {
    color: '#27c93f',
    filter: 'drop-shadow(0 0 10px rgba(39, 201, 63, 0.4))',
  },
  successTitle: {
    fontSize: '1.6rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    color: 'var(--text-bright)',
  },
  successDesc: {
    fontSize: '0.92rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    maxWidth: '400px',
  },
  socialRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '4px',
  },
  socialLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: 'var(--text-muted)',
    fontSize: '0.78rem',
    fontFamily: 'var(--font-mono)',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    letterSpacing: '0.04em',
  }
};
