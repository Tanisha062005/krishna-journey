import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TimelineCarousel({ chapters, activeIndex, onChangeActiveIndex }) {
  const scrollRef = useRef(null);

  // Auto-scroll horizontal timeline to the active node
  useEffect(() => {
    scrollToActive(activeIndex);
  }, [activeIndex]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      onChangeActiveIndex(activeIndex - 1);
      scrollToActive(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < chapters.length - 1) {
      onChangeActiveIndex(activeIndex + 1);
      scrollToActive(activeIndex + 1);
    }
  };

  const scrollToActive = (index) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const children = container.childNodes;
      if (children[index]) {
        const child = children[index];
        const containerWidth = container.offsetWidth;
        const childLeft = child.offsetLeft;
        const childWidth = child.offsetWidth;
        
        container.scrollTo({
          left: childLeft - containerWidth / 2 + childWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  // Helper to get image or gradient placeholder for thumbnail
  const getThumbnailStyle = (chapter, index) => {
    if (chapter.image) {
      return { backgroundImage: `url(${chapter.image})` };
    }
    // Gradient placeholders for subsequent phase images
    const gradients = [
      'radial-gradient(circle, #0f2b5c 0%, #030712 100%)',
      'radial-gradient(circle, #2d1645 0%, #030712 100%)',
      'radial-gradient(circle, #451b1b 0%, #030712 100%)',
      'radial-gradient(circle, #164534 0%, #030712 100%)',
      'radial-gradient(circle, #4a3818 0%, #030712 100%)'
    ];
    return { background: gradients[index % gradients.length] };
  };

  return (
    <div id="the-journey" className="timeline-carousel-container">
      {/* Label and Left Navigation Arrow */}
      <div className="timeline-header-control">
        <span className="timeline-label">THE STORY</span>
        <button 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`btn-circle timeline-nav-btn ${activeIndex === 0 ? 'disabled' : ''}`}
          title="Previous Chapter"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Chapters Container with connecting line */}
      <div className="timeline-wrapper">
        <div className="timeline-connecting-line" />
        <div className="timeline-scroll-area" ref={scrollRef}>
          {chapters.map((chapter, index) => {
            const isActive = index === activeIndex;
            const displayNum = String(index + 1).padStart(2, '0');
            
            return (
              <div 
                key={chapter.id}
                onClick={() => {
                  onChangeActiveIndex(index);
                  scrollToActive(index);
                }}
                className={`timeline-node-container ${isActive ? 'active' : ''}`}
              >
                {/* Thumbnail Circle */}
                <div 
                  className={`timeline-thumbnail ${isActive ? 'active-glow' : ''}`}
                  style={getThumbnailStyle(chapter, index)}
                >
                  {/* Decorative Inner Ring */}
                  <div className="thumbnail-inner-ring" />
                </div>

                {/* Chapter Info */}
                <div className="timeline-node-info">
                  <span className="node-number">{displayNum}</span>
                  <span className="node-title">{chapter.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Navigation Arrow */}
      <button 
        onClick={handleNext}
        disabled={activeIndex === chapters.length - 1}
        className={`btn-circle timeline-nav-btn right-btn ${activeIndex === chapters.length - 1 ? 'disabled' : ''}`}
        title="Next Chapter"
      >
        <ChevronRight size={16} />
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        .timeline-carousel-container {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 16px;
          margin-top: 12px;
          margin-bottom: 12px;
          position: relative;
        }

        .timeline-header-control {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .timeline-label {
          font-family: var(--font-sans);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--gold-antique);
        }

        .timeline-nav-btn {
          width: 36px;
          height: 36px;
          background: rgba(3, 7, 18, 0.6);
        }

        .timeline-nav-btn.disabled {
          opacity: 0.3;
          pointer-events: none;
        }

        .timeline-wrapper {
          flex: 1;
          position: relative;
          overflow: hidden;
          padding: 10px 0;
        }

        .timeline-connecting-line {
          position: absolute;
          left: 0;
          right: 0;
          top: 36px; /* center of the 52px thumbnail */
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(212, 175, 55, 0) 0%, 
            rgba(212, 175, 55, 0.3) 15%, 
            rgba(212, 175, 55, 0.3) 85%, 
            rgba(212, 175, 55, 0) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .timeline-scroll-area {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 4px 16px;
          z-index: 2;
          position: relative;
        }

        /* Hide Scrollbar for clean UI */
        .timeline-scroll-area::-webkit-scrollbar {
          display: none;
        }
        .timeline-scroll-area {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .timeline-node-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          min-width: 100px;
          text-align: center;
          user-select: none;
          transition: var(--transition);
          z-index: 3;
        }

        .timeline-thumbnail {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid var(--gold-border);
          background-size: cover;
          background-position: center;
          position: relative;
          transition: var(--transition);
          background-color: var(--bg-navy-dark);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .timeline-thumbnail::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1px solid transparent;
          transition: var(--transition);
        }

        .timeline-node-container:hover .timeline-thumbnail {
          border-color: var(--gold-metallic);
          transform: scale(1.08);
          box-shadow: var(--gold-glow);
        }

        .timeline-node-container.active .timeline-thumbnail {
          border-color: var(--gold-metallic);
          transform: scale(1.15);
          box-shadow: var(--gold-glow-hover);
        }

        .timeline-node-container.active .timeline-thumbnail::before {
          border-color: var(--gold-metallic);
          animation: goldGlowPulse 3s infinite ease-in-out;
        }

        .thumbnail-inner-ring {
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.15);
          pointer-events: none;
        }

        .timeline-node-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 8px;
          max-width: 90px;
        }

        .node-number {
          font-family: var(--font-sans);
          font-size: 8px;
          font-weight: 600;
          color: var(--gold-antique);
          letter-spacing: 1px;
        }

        .node-title {
          font-family: var(--font-serif-body);
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.2;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-transform: capitalize;
          text-overflow: ellipsis;
          width: 100%;
          transition: var(--transition);
        }

        .timeline-node-container:hover .node-title,
        .timeline-node-container.active .node-title {
          color: var(--text-primary);
        }
      `}} />
    </div>
  );
}
