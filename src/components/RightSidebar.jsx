import React, { useRef, useEffect } from 'react';
import { Play, X } from 'lucide-react';

export default function RightSidebar({ chapters, activeIndex, onChangeActiveIndex, isOpen, onClose }) {
  const activeCardRef = useRef(null);

  // Auto-scroll the sidebar list to the active chapter card
  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeIndex]);

  // Helper to group chapters by Act for rendering headers
  const acts = [
    { name: 'ACT I – GOKUL & VRINDAVAN', start: 0, end: 14 },
    { name: 'ACT II – MATHURA', start: 15, end: 16 },
    { name: 'ACT III – SANDIPANI ASHRAM', start: 17, end: 18 },
    { name: 'ACT IV – DWARKA', start: 19, end: 23 },
    { name: '✨ EPILOGUE', start: 24, end: 24 }
  ];

  // Helper to get thumbnail image for the card
  const getSidebarThumbnail = (chapter, index) => {
    if (chapter.image) {
      return `url(${chapter.image})`;
    }
    // Gradients for other chapters
    const gradients = [
      'linear-gradient(135deg, #0d253f, #020617)',
      'linear-gradient(135deg, #2b1137, #020617)',
      'linear-gradient(135deg, #3d1b1b, #020617)',
      'linear-gradient(135deg, #103324, #020617)',
      'linear-gradient(135deg, #3b2e11, #020617)'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <aside className={`sidebar-pane ${isOpen ? 'mobile-open' : ''}`}>


      {/* 1. Header Title */}
      <div className="sidebar-header" style={{ position: 'relative', width: '100%' }}>
        <button 
          onClick={onClose} 
          className="sidebar-close-btn"
          aria-label="Close Sidebar"
        >
          <X size={20} color="#d4af37" />
        </button>
        <div className="sidebar-title-decor top-decor">
          <svg viewBox="0 0 100 10" width="80" height="8" fill="none">
            <path d="M0 5 H 100" stroke="#d4af37" strokeWidth="0.8" />
            <circle cx="50" cy="5" r="2" fill="#d4af37" />
          </svg>
        </div>
        <h3 className="sidebar-title">The Journey</h3>
        <div className="sidebar-title-decor bottom-decor">
          <svg viewBox="0 0 100 10" width="80" height="8" fill="none">
            <path d="M0 5 H 100" stroke="#d4af37" strokeWidth="0.8" />
            <circle cx="50" cy="5" r="2" fill="#d4af37" />
          </svg>
        </div>
        <div className="sidebar-progress-container" title="Journey Progress">
          <div className="sidebar-progress-bar" style={{ width: `${((activeIndex + 1) / chapters.length) * 100}%` }} />
        </div>
      </div>


      {/* 2. Scrollable List of Chapters */}
      <div className="sidebar-scroll-list">
        {acts.map((act) => (
          <div key={act.name} className="act-group">
            <span className="act-header">{act.name}</span>
            <div className="act-chapters">
              {chapters.slice(act.start, act.end + 1).map((chapter) => {
                const globalIndex = chapters.findIndex(c => c.id === chapter.id);
                const isActive = globalIndex === activeIndex;
                const displayNum = String(globalIndex + 1).padStart(2, '0');
                
                return (
                  <div
                    key={chapter.id}
                    ref={isActive ? activeCardRef : null}
                    onClick={() => onChangeActiveIndex(globalIndex)}
                    className={`chapter-card ${isActive ? 'active' : ''}`}
                  >
                    <div className="card-left">
                      <span className="card-index">{displayNum}</span>
                      <div className="card-text">
                        <h4 className="card-chapter-title">{chapter.title}</h4>
                        <p className="card-chapter-subtitle">{chapter.shortDesc}</p>
                      </div>
                    </div>

                    <div className="card-right">
                      {/* Image Thumbnail */}
                      <div 
                        className="card-thumbnail"
                        style={{
                          background: getSidebarThumbnail(chapter, globalIndex),
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      {/* Small Play Button */}
                      <button className="btn-circle card-play-btn">
                        <Play size={10} fill="#d4af37" stroke="none" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer Branding */}
      <div className="sidebar-footer">
        <p className="footer-quote">
          He is more than a story.<br />He is an experience.
        </p>
        
        <div className="footer-sanskrit-container">
          <svg className="sanskrit-decor-left" viewBox="0 0 50 10" width="30" height="6" fill="none">
            <path d="M0 5 H 50" stroke="#d4af37" strokeWidth="0.5" />
            <circle cx="45" cy="5" r="1.5" fill="#d4af37" />
          </svg>
          <span className="footer-sanskrit">जय श्री कृष्ण</span>
          <svg className="sanskrit-decor-right" viewBox="0 0 50 10" width="30" height="6" fill="none">
            <path d="M0 5 H 50" stroke="#d4af37" strokeWidth="0.5" />
            <circle cx="5" cy="5" r="1.5" fill="#d4af37" />
          </svg>
        </div>

        {/* Small peacock feather SVG */}
        <div className="footer-feather-wrapper devotional-hotspot">
          <svg className="footer-feather-svg" viewBox="0 0 100 100" width="32" height="32" fill="none">
            <path d="M50 90 C 47 70, 44 48, 50 20" stroke="#d4af37" strokeWidth="1.5" />
            {/* Soft inner core */}
            <path d="M50 20 C 35 22, 35 44, 50 46 C 65 44, 65 22, 50 20 Z" fill="rgba(212, 175, 55, 0.1)" stroke="#d4af37" strokeWidth="1" />
            <path d="M50 25 C 41 27, 41 39, 50 41 C 59 39, 59 27, 50 25 Z" fill="#051c33" stroke="#00b0ff" strokeWidth="1" />
            <circle cx="50" cy="33" r="3.5" fill="#00bcd4" />
          </svg>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .sidebar-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
        }

        .sidebar-progress-container {
          width: 80px;
          height: 1px;
          background: rgba(212, 175, 55, 0.15);
          margin-top: 10px;
          border-radius: 1px;
          position: relative;
          overflow: hidden;
        }

        .sidebar-progress-bar {
          height: 100%;
          background: var(--gold-metallic);
          box-shadow: 0 0 4px var(--gold-metallic);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }


        .sidebar-close-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          padding: 8px;
          opacity: 0.7;
          transition: var(--transition);
          background: rgba(3, 7, 18, 0.5);
          border-radius: 50%;
          border: 1px solid transparent;
        }

        .sidebar-close-btn:hover {
          opacity: 1;
          transform: scale(1.1) rotate(90deg);
          background: rgba(12, 24, 58, 0.8);
          border-color: var(--gold-border);
        }

        .sidebar-title {
          font-family: var(--font-serif-title);
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--gold-antique);
          margin: 6px 0;
        }

        .sidebar-title-decor {
          display: flex;
          justify-content: center;
          height: 8px;
        }

        /* Scrollable List */
        .sidebar-scroll-list {
          flex-grow: 1;
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 4px;
        }

        .act-group {
          margin-bottom: 24px;
        }

        .act-header {
          display: block;
          font-family: var(--font-sans);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--gold-muted);
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          padding-bottom: 6px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .act-chapters {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Chapter Card Item */
        .chapter-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid rgba(212, 175, 55, 0.08);
          background: rgba(7, 15, 38, 0.25);
          cursor: pointer;
          transition: var(--transition);
        }

        .chapter-card:hover {
          border-color: rgba(212, 175, 55, 0.25);
          background: rgba(7, 15, 38, 0.45);
          transform: translateY(-1px);
        }

        .chapter-card.active {
          border-color: var(--gold-metallic);
          background: rgba(12, 24, 58, 0.6);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.08);
        }

        .card-left {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          flex-grow: 1;
        }

        .card-index {
          font-family: var(--font-serif-title);
          font-size: 16px;
          color: var(--gold-muted);
          font-weight: 700;
          transition: var(--transition);
          margin-top: -2px;
        }

        .chapter-card.active .card-index {
          color: var(--gold-metallic);
          text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
        }

        .card-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .card-chapter-title {
          font-family: var(--font-serif-title);
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 2px;
        }

        .card-chapter-subtitle {
          font-family: var(--font-serif-body);
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-right {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 12px;
          flex-shrink: 0;
        }

        .card-thumbnail {
          width: 50px;
          height: 34px;
          border-radius: 4px;
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }

        .card-play-btn {
          width: 22px;
          height: 22px;
          background: rgba(3, 7, 18, 0.8);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .chapter-card:hover .card-play-btn,
        .chapter-card.active .card-play-btn {
          border-color: var(--gold-metallic);
          background: var(--gold-metallic);
        }

        .chapter-card:hover .card-play-btn svg,
        .chapter-card.active .card-play-btn svg {
          fill: var(--text-dark);
        }

        /* Sidebar Footer */
        .sidebar-footer {
          border-top: 1px solid rgba(212, 175, 55, 0.1);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .footer-quote {
          font-family: var(--font-serif-body);
          font-size: 12px;
          font-style: italic;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 10px;
        }

        .footer-sanskrit-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .footer-sanskrit {
          font-family: var(--font-serif-title);
          font-size: 12px;
          font-weight: 700;
          color: var(--gold-metallic);
          letter-spacing: 1px;
        }

        .footer-feather-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .footer-feather-svg {
          opacity: 0.85;
          filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.15));
        }
      `}} />
    </aside>
  );
}
