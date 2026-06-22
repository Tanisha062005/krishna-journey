import React from 'react';
import { Music, VolumeX, Menu } from 'lucide-react';

const Navbar = React.memo(function Navbar({ isAudioPlaying, onToggleAudio, onToggleSidebar }) {
  const navLinks = ['HOME', 'THE JOURNEY'];

  return (
    <header className="navbar-container">
      {/* Brand Logo */}
      <div className="navbar-brand">
        <svg className="peacock-logo" viewBox="0 0 100 100" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem */}
          <path d="M50 95 C 45 70, 40 45, 50 15" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Outer Quill Fibers (Antique Gold) */}
          <path d="M50 80 C 25 70, 20 60, 47 50" stroke="#c5a880" strokeWidth="1" strokeLinecap="round" />
          <path d="M50 80 C 75 70, 80 60, 53 50" stroke="#c5a880" strokeWidth="1" strokeLinecap="round" />
          <path d="M49 65 C 20 55, 15 45, 48 35" stroke="#c5a880" strokeWidth="1" strokeLinecap="round" />
          <path d="M51 65 C 80 55, 85 45, 52 35" stroke="#c5a880" strokeWidth="1" strokeLinecap="round" />
          
          {/* Peacock Feather Eyelet */}
          {/* Gold outer halo */}
          <path d="M50 15 C 32 18, 32 42, 50 45 C 68 42, 68 18, 50 15 Z" fill="rgba(212, 175, 55, 0.2)" stroke="#d4af37" strokeWidth="1.5" />
          {/* Bronze middle halo */}
          <path d="M50 20 C 38 22, 38 38, 50 40 C 62 38, 62 22, 50 20 Z" fill="rgba(142, 117, 74, 0.4)" stroke="#8e754a" strokeWidth="1" />
          {/* Deep Navy/Teal core */}
          <path d="M50 24 C 42 25, 42 35, 50 37 C 58 35, 58 24, 50 24 Z" fill="#0c2040" stroke="#00bcd4" strokeWidth="1.5" />
          {/* Electric Blue center */}
          <circle cx="50" cy="30" r="4" fill="#00bcd4" />
        </svg>
        <div className="brand-text">
          <span className="brand-subtitle">The Eternal</span>
          <span className="brand-title">KRISHNA</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="navbar-links">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            className={`nav-link ${link === 'THE JOURNEY' ? 'active' : ''}`}
          >
            {link}
            {link === 'THE JOURNEY' && <span className="nav-link-indicator" />}
          </a>
        ))}
      </nav>

      {/* Right Controls */}
      <div className="navbar-controls">
        <button
          onClick={onToggleAudio}
          className={`btn-circle audio-toggle ${isAudioPlaying ? 'audio-playing glow-pulse' : ''}`}
          title={isAudioPlaying ? 'Turn Off Sacred Ambience' : 'Turn On Sacred Ambience'}
        >

          {isAudioPlaying ? <Music size={18} /> : <VolumeX size={18} />}
        </button>
        <button
          onClick={onToggleSidebar}
          className="btn-circle menu-toggle"
          title="Toggle Journey"
        >
          <Menu size={18} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 80px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          padding: 0 16px;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(3, 7, 18, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          margin-top: -24px;
          margin-left: -48px;
          margin-right: -48px;
          width: calc(100% + 96px);
        }

        @media (max-width: 1200px) {
          .navbar-container {
            margin-top: -24px;
            margin-left: -24px;
            margin-right: -24px;
            width: calc(100% + 48px);
            padding: 0 24px;
          }
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-subtitle {
          font-family: var(--font-sans);
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
        }

        .brand-title {
          font-family: var(--font-serif-title);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--gold-metallic);
          margin-top: 2px;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        @media (max-width: 992px) {
          .navbar-links {
            display: none; /* Hide on mobile/tablet */
          }
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2.5px;
          color: var(--text-muted);
          text-decoration: none;
          text-transform: uppercase;
          position: relative;
          padding: 8px 0;
          transition: var(--transition);
        }

        .nav-link:hover {
          color: var(--gold-antique);
        }

        .nav-link.active {
          color: var(--gold-antique);
        }

        .nav-link-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 2px;
          background-color: var(--gold-antique);
          border-radius: 2px;
          box-shadow: 0 0 6px rgba(212, 175, 55, 0.5);
        }

        .navbar-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .audio-toggle.audio-playing {
          border-color: var(--gold-metallic);
          color: var(--gold-metallic);
          background: rgba(212, 175, 55, 0.15);
        }
      `}} />
    </header>
  );
});

export default Navbar;
