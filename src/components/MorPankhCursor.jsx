import React, { useState, useEffect, useRef } from 'react';

export default function MorPankhCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef(null);
  const particlesContainerRef = useRef(null);

  // Mouse coordinates (target and interpolated current positions)
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  // Velocity and rotation tracking
  const lastX = useRef(0);
  const currentRotation = useRef(0);

  // Particle trailing distance tracker
  const lastSpawnX = useRef(0);
  const lastSpawnY = useRef(0);

  // 1. Bulletproof desktop detection: checks window size and rejects mobile user agents.
  useEffect(() => {
    const checkEnabled = () => {
      const isSmallScreen = window.innerWidth <= 1200;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
      
      setEnabled(!isSmallScreen && !prefersReducedMotion && !isMobileAgent);
    };

    checkEnabled();
    window.addEventListener('resize', checkEnabled);
    return () => window.removeEventListener('resize', checkEnabled);
  }, []);

  // 2. Track mouse coordinate updates and window visibility state
  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled]);

  // 3. Main animation frame loop for smooth rendering, velocity tilt, and particle trail
  useEffect(() => {
    if (!enabled || !isVisible) {
      if (cursorRef.current) {
        cursorRef.current.style.display = 'none';
      }
      return;
    }

    // Initialize position directly to avoid snapping from (0,0)
    currentX.current = targetX.current;
    currentY.current = targetY.current;
    lastX.current = targetX.current;
    lastSpawnX.current = targetX.current;
    lastSpawnY.current = targetY.current;

    if (cursorRef.current) {
      cursorRef.current.style.display = 'block';
    }

    let rafId;

    const spawnParticle = (x, y) => {
      const container = particlesContainerRef.current;
      if (!container) return;

      const particle = document.createElement('div');
      particle.className = 'gold-dust-particle';

      const size = Math.random() * 2 + 1.5; // 1.5px to 3.5px
      const duration = 400 + Math.random() * 100; // 400ms to 500ms

      // Soft circular scatter trajectory
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const tx = Math.cos(angle) * speed;
      const ty = Math.sin(angle) * speed + 8; // bias downwards

      particle.style.setProperty('--size', `${size}px`);
      particle.style.setProperty('--duration', `${duration}ms`);
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);

      // Spawn exactly at the peacock feather's tip position
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      container.appendChild(particle);

      // Self-cleanup after animation duration
      setTimeout(() => {
        particle.remove();
      }, duration);
    };

    const updateCursor = () => {
      // Linear interpolation (lerp) for fluid lag-free tracking
      const dx = targetX.current - currentX.current;
      const dy = targetY.current - currentY.current;
      currentX.current += dx * 0.15;
      currentY.current += dy * 0.15;

      // Calculate horizontal velocity to determine cursor tilt angle
      const velocityX = targetX.current - lastX.current;
      lastX.current = targetX.current;

      // Map velocity to rotation with a cap of ±15 degrees
      const targetRot = Math.max(-15, Math.min(15, velocityX * 0.45));
      currentRotation.current += (targetRot - currentRotation.current) * 0.15;

      if (cursorRef.current) {
        // Offset by 18px (half of 38px scaled size) and 8px to align the feather tip with the mouse coordinate
        cursorRef.current.style.transform = `translate3d(${currentX.current - 18}px, ${currentY.current - 8}px, 0) rotate(${currentRotation.current}deg)`;
      }

      // Check distance traveled to spawn gold dust particles
      const dist = Math.hypot(targetX.current - lastSpawnX.current, targetY.current - lastSpawnY.current);
      if (dist > 18) {
        spawnParticle(currentX.current, currentY.current);
        lastSpawnX.current = targetX.current;
        lastSpawnY.current = targetY.current;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [enabled, isVisible]);

  const [isTabVisible, setIsTabVisible] = useState(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* 38px Mor Pankh Peacock Feather Custom Cursor */}
      <div ref={cursorRef} className="mor-pankh-cursor" style={{ display: 'none' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Subtle outer halo path */}
          <path 
            d="M16 28 C 15 22, 13 16, 17 8 C 19 4, 23 2, 25 5 C 23 9, 21 11, 20 14 C 19 16, 20 20, 21 23" 
            stroke="rgba(212, 175, 55, 0.45)" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
          {/* Main peacock feather shape */}
          <path 
            d="M16 28 C 13 22, 10 17, 15 7 C 22 5, 26 9, 23 15 C 20 20, 18 24, 16 28 Z" 
            fill="url(#gold-grad-pankh)" 
            stroke="#d4af37" 
            strokeWidth="0.8" 
          />
          {/* Dark center core eyelet */}
          <path 
            d="M17 12 C 15 11, 14 14, 17 17 C 19 15, 20 13, 17 12 Z" 
            fill="#050c21" 
            stroke="#d4af37" 
            strokeWidth="0.5" 
          />
          {/* Golden core nucleus */}
          <circle cx="17.2" cy="13.8" r="1.2" fill="#d4af37" />
          
          {/* Fine golden barbs detailing */}
          <path d="M15.5 19 L 12.5 20 M16.5 17 L 13.5 17.5 M17.5 15 L 14.5 15 M18.5 13 L 15.5 12.5 M19 11 L 17 10" stroke="#d4af37" strokeWidth="0.4" strokeLinecap="round" />
          <path d="M17 19 L 20 20 M18 17 L 21 17.5 M19 15 L 22 15 M20 13 L 22.5 12 M20.5 11 L 22 10" stroke="#d4af37" strokeWidth="0.4" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="gold-grad-pankh" x1="16" y1="28" x2="20" y2="7" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8e754a" />
              <stop offset="40%" stopColor="#c5a880" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Gold dust particle container */}
      <div ref={particlesContainerRef} className={`mor-pankh-particles ${!isTabVisible ? 'paused' : ''}`} />

      {/* Style overrides to hide default cursor globally and configure particles */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Hide native cursor globally on desktop browsers */
        @media (hover: hover) and (pointer: fine) {
          html, body, a, button, select, input, textarea, [role="button"], .chapter-card, .timeline-node-container, .details-btn {
            cursor: none !important;
          }
        }

        .mor-pankh-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 38px;
          height: 38px;
          pointer-events: none;
          z-index: 2147483647 !important; /* Always on top of overlays and modals */
          transform-origin: 18px 8px; /* Rotation center at the feather tip */
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
        }

        .mor-pankh-particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 2147483646 !important;
        }

        .gold-dust-particle {
          position: fixed;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(circle, #ffe57f 20%, #d4af37 80%);
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 4px #d4af37;
          animation: fadeOutParticle var(--duration) forwards ease-out;
        }

        @keyframes fadeOutParticle {
          0% {
            opacity: 0.85;
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--tx), var(--ty), 0) scale(0.25);
          }
        }
      `}} />
    </>
  );
}
