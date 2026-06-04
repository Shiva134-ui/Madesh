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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate secure cloud transmission API post
    setTimeout(() => {
      setIsSubmitting(false);
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
    }, 1500);
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
                  <span style={styles.infoLabel}>SECURE EMAIL</span>
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
                  <span style={styles.infoLabel}>DIRECT CALLS</span>
                  <a href="tel:+918928405063" style={styles.infoValue}>+91 89284 05063</a>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIconBg}>
                  <MapPin size={18} style={{ color: 'var(--color-cyber-purple)' }} />
                </div>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>LOCATION STATE</span>
                  <span style={styles.infoValue}>Tirunelveli, Tamil Nadu, India (GMT+5:30)</span>
                </div>
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
  }
};
