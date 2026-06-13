import React from 'react';

const DUST_PARTICLES_CONFIG = [
  { size: 2, left: 8, top: 15, duration: 24, delay: 0 },
  { size: 1, left: 88, top: 22, duration: 28, delay: 2 },
  { size: 3, left: 45, top: 60, duration: 20, delay: 1 },
  { size: 2, left: 25, top: 35, duration: 32, delay: 4 },
  { size: 1.5, left: 70, top: 40, duration: 26, delay: 3 },
  { size: 2.5, left: 12, top: 75, duration: 22, delay: 5 },
  { size: 1, left: 93, top: 65, duration: 30, delay: 0.5 },
  { size: 2, left: 35, top: 80, duration: 25, delay: 6 },
  { size: 1.5, left: 62, top: 18, duration: 29, delay: 1.5 },
  { size: 3, left: 55, top: 85, duration: 21, delay: 3.5 },
  { size: 2, left: 78, top: 70, duration: 27, delay: 2.5 },
  { size: 1, left: 30, top: 10, duration: 31, delay: 4.5 },
  { size: 2.5, left: 50, top: 30, duration: 23, delay: 5.5 },
  { size: 1.5, left: 82, top: 50, duration: 25, delay: 0.8 },
  { size: 2, left: 20, top: 90, duration: 33, delay: 1.2 }
];

const FIREFLIES_CONFIG = [
  // Placed mostly near the edges (left/right viewport boundaries)
  { size: 4, left: 3, top: 25, duration: 12, delay: 0 },
  { size: 3, left: 95, top: 18, duration: 15, delay: 2 },
  { size: 5, left: 5, top: 70, duration: 14, delay: 1 },
  { size: 4, left: 96, top: 60, duration: 16, delay: 3.5 },
  { size: 3, left: 2, top: 45, duration: 13, delay: 5 },
  { size: 4, left: 94, top: 80, duration: 17, delay: 0.5 }
];

export default function CinematicEffects() {
  return (
    <div className="cinematic-effects-container" aria-hidden="true">
      {/* Slow-moving light rays */}
      <div className="light-ray ray-1" />
      <div className="light-ray ray-2" />

      {/* Subtle floating golden dust particles */}
      {DUST_PARTICLES_CONFIG.map((cfg, idx) => (
        <div
          key={`dust-${idx}`}
          className="dust-particle"
          style={{
            width: `${cfg.size}px`,
            height: `${cfg.size}px`,
            left: `${cfg.left}%`,
            top: `${cfg.top}%`,
            animationDuration: `${cfg.duration}s`,
            animationDelay: `${cfg.delay}s`
          }}
        />
      ))}

      {/* Tiny fireflies appearing near the edges */}
      {FIREFLIES_CONFIG.map((cfg, idx) => (
        <div
          key={`firefly-${idx}`}
          className="firefly"
          style={{
            width: `${cfg.size}px`,
            height: `${cfg.size}px`,
            left: `${cfg.left}%`,
            top: `${cfg.top}%`,
            animationDuration: `${cfg.duration}s`,
            animationDelay: `${cfg.delay}s`
          }}
        />
      ))}
    </div>
  );
}
