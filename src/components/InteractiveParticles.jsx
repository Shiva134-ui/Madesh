import { useEffect, useRef } from 'react';

export default function InteractiveParticles({ theme }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let bgParticles = [];
    const particleCount = 130;
    const bgParticleCount = 20;

    // Configuration
    const config = {
      connectionDist: 100,
      cursorConnectionDist: 150,
      dodgeRadius: 100,
      dodgeSpeed: 2.5,
      shockRadius: 220,
    };

    // Keep cached theme colors
    let themeColors = {
      primary: '#e5e5e5',
      accent: '#ffffff',
      purple: '#737373',
      isDark: true
    };

    // Extract current colors directly from the React theme prop
    const updateThemeColors = () => {
      if (theme === 'cyberpunk') {
        themeColors.primary = '#00F0FF';
        themeColors.accent = '#ffffff';
        themeColors.purple = '#00F0FF';
        themeColors.isDark = true;
      } else if (theme === 'emerald') {
        themeColors.primary = '#bfbfbf';
        themeColors.accent = '#ffffff';
        themeColors.purple = '#737373';
        themeColors.isDark = true;
      } else { // cosmic / default
        themeColors.primary = '#e5e5e5';
        themeColors.accent = '#ffffff';
        themeColors.purple = '#737373';
        themeColors.isDark = true;
      }
    };

    updateThemeColors();

    // Particle Classes
    class InteractiveParticle {
      constructor(width, height) {
        this.resize(width, height);
        this.radius = Math.random() * 2 + 1.2; // 1.2 to 3.2px
        this.colorType = Math.random(); // 0 to 1 for styling
        this.alpha = Math.random() * 0.45 + 0.4; // 0.4 to 0.85 opacity
        
        // Base drift
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        
        // Dynamic additions
        this.dodgeVx = 0;
        this.dodgeVy = 0;
        this.shockVx = 0;
        this.shockVy = 0;
      }

      resize(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      update(width, height) {
        // Physics integration
        this.x += this.vx + this.dodgeVx + this.shockVx;
        this.y += this.vy + this.dodgeVy + this.shockVy;

        // Shockwave decay
        this.shockVx *= 0.92;
        this.shockVy *= 0.92;

        // Boundaries wrapping with slight padding
        const pad = 10;
        if (this.x < -pad) this.x = width + pad;
        if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        if (this.y > height + pad) this.y = -pad;

        // Mouse dodging/repulsion physics
        if (mouse.current.active) {
          const dx = this.x - mouse.current.x;
          const dy = this.y - mouse.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist < config.dodgeRadius && dist > 0) {
            const force = (config.dodgeRadius - dist) / config.dodgeRadius;
            const angle = Math.atan2(dy, dx);
            const targetDodgeVx = Math.cos(angle) * force * config.dodgeSpeed;
            const targetDodgeVy = Math.sin(angle) * force * config.dodgeSpeed;

            // Smooth interpolation to avoid jittering
            this.dodgeVx += (targetDodgeVx - this.dodgeVx) * 0.12;
            this.dodgeVy += (targetDodgeVy - this.dodgeVy) * 0.12;
          } else {
            this.dodgeVx *= 0.88;
            this.dodgeVy *= 0.88;
          }
        } else {
          this.dodgeVx *= 0.85;
          this.dodgeVy *= 0.85;
        }
      }

      draw(ctx) {
        // Select color based on layout and color type
        let color = themeColors.primary;
        if (this.colorType > 0.65) color = themeColors.accent;
        else if (this.colorType > 0.4) color = themeColors.purple;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Dynamic blending or standard fill
        ctx.fillStyle = color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        
        // Add tiny subtle glow to larger dots in dark themes
        if (this.radius > 2.5 && themeColors.isDark) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = color;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }
    }

    // Larger background ambient particle layer (Parallax depth of field)
    class AmbientBackgroundParticle {
      constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 6 + 6; // 6 to 12px large blurred dust
        this.colorType = Math.random();
        this.alpha = Math.random() * 0.05 + 0.03; // extremely faint (3-8% opacity)
        this.vx = (Math.random() - 0.5) * 0.15; // float super slowly
        this.vy = (Math.random() - 0.5) * 0.15;
      }

      update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        const pad = 20;
        if (this.x < -pad) this.x = width + pad;
        if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        if (this.y > height + pad) this.y = -pad;
      }

      draw(ctx) {
        let color = themeColors.purple;
        if (this.colorType > 0.7) color = themeColors.accent;
        else if (this.colorType > 0.4) color = themeColors.primary;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    // Set canvas sizes properly
    const resizeCanvas = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const width = rect.width;
      const height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);

      // Force state update inside classes
      particles.forEach(p => p.resize(width, height));
    };

    // Initialize systems
    const initParticles = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      particles = [];
      bgParticles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new InteractiveParticle(w, h));
      }

      for (let i = 0; i < bgParticleCount; i++) {
        bgParticles.push(new AmbientBackgroundParticle(w, h));
      }
    };

    // Shockwave click scatter effect
    const triggerClickShockwave = (x, y) => {
      particles.forEach(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.hypot(dx, dy);

        if (dist < config.shockRadius && dist > 0) {
          // Inverse proportion force (higher closer to the center click point)
          const force = (config.shockRadius - dist) / config.shockRadius;
          const angle = Math.atan2(dy, dx);
          
          // Apply outward impulse velocity
          p.shockVx += Math.cos(angle) * force * 7.5;
          p.shockVy += Math.sin(angle) * force * 7.5;
        }
      });
    };

    // Mouse events
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouse.current.x = x;
        mouse.current.y = y;
        mouse.current.active = true;
      } else {
        mouse.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        triggerClickShockwave(clickX, clickY);
      }
    };

    // Attach listeners to window to guarantee tracking regardless of overlays / pointer-events blocking
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    
    // Support touch interactions on mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;

        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          mouse.current.x = clickX;
          mouse.current.y = clickY;
          mouse.current.active = true;
        } else {
          mouse.current.active = false;
        }
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);
    window.addEventListener('touchcancel', handleMouseLeave);

    // Initial setup
    resizeCanvas();
    initParticles();

    // Main animation frame loop
    const render = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Clear with additive styling transparency to avoid trailing smudge, but allow smooth clearing
      ctx.clearRect(0, 0, w, h);

      // Render Ambient Background Particles first (no connection lines)
      bgParticles.forEach(bp => {
        bp.update(w, h);
        bp.draw(ctx);
      });

      // Render Interactive Particles
      particles.forEach(p => {
        p.update(w, h);
        p.draw(ctx);
      });

      // Draw Neural Network / Constellation Lines (Interactive Particle Connective Web)
      ctx.lineWidth = 0.65;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // 1. Draw connection lines between adjacent particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < config.connectionDist) {
            const alpha = (config.connectionDist - dist) / config.connectionDist * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = themeColors.primary;
            ctx.stroke();
          }
        }

        // 2. Draw magnetic connection to the mouse cursor
        if (mouse.current.active) {
          const distToMouse = Math.hypot(p1.x - mouse.current.x, p1.y - mouse.current.y);

          if (distToMouse < config.cursorConnectionDist) {
            // Mouse connection is brighter/tighter
            const alpha = (config.cursorConnectionDist - distToMouse) / config.cursorConnectionDist * 0.38;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#ffffff'; // pure white for cursor connection web
            ctx.lineWidth = 0.85;
            ctx.stroke();
            ctx.lineWidth = 0.65; // restore
          }
        }
      }

      ctx.globalAlpha = 1.0; // reset transparency
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Trigger theme update on theme dependency change
    updateThemeColors();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('touchcancel', handleMouseLeave);
    };
  }, [theme]); // Re-initialize only when theme changes, so variables get correctly queried

  return (
    <div 
      ref={containerRef} 
      className="interactive-particles"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
