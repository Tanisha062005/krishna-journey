import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ChapterParallaxOverlay from './ChapterParallaxOverlay';

const HotspotLeafSvg = () => (
  <svg viewBox="0 0 24 24" className="hotspot-leaf-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22C12 22 12 12 12 2C12 2 4 8 4 13C4 18 12 22 12 22Z" />
    <path d="M12 22C12 22 12 12 12 2C12 2 20 8 20 13C20 18 12 22 12 22Z" />
    <path d="M12 6C10 8 10 10 12 11" />
    <path d="M12 10C14 12 14 14 12 15" />
    <path d="M12 14C10 16 10 17 12 18" />
  </svg>
);

const hotspotsConfig = {
  '01-prophecy': [
    { id: 1, x: '35%', y: '45%', title: 'Divine Destiny', content: 'The dark prison cells represent the material confinement of the soul, while the prophecy represents the descending light of consciousness (dharma).' },
    { id: 2, x: '65%', y: '55%', title: 'The Iron Gates', content: 'Symbolizes the heavy locks of human ego and ignorance, which automatically shatter when the Supreme Divine forces manifest.' }
  ],
  '02-crossing-yamuna': [
    { id: 1, x: '50%', y: '35%', title: 'Sheshnaag\'s Hoods', content: 'The multiple hoods of the celestial serpent represent absolute protection and the cosmic shield of divine energy shielding the soul from material storms.' },
    { id: 2, x: '42%', y: '68%', title: 'Yamuna River', content: 'The raging river represents the turbulent ocean of samsara (material existence). Vasudeva stepping in signifies surrender, which parted the waters.' }
  ],
  '05-universe-mouth': [
    { id: 1, x: '52%', y: '48%', title: 'Cosmic Revelation', content: 'The mouth of Krishna containing stars and galaxies shows that the entire infinite cosmos is not external, but exists within the Divine Consciousness.' },
    { id: 2, x: '38%', y: '62%', title: 'Yashoda\'s Vatsalya', content: 'Represents pure maternal love (vatsalya bhava) which is so strong it binds even the infinite creator of the universe to act as a simple child.' }
  ],
  '08-peacock-chase': [
    { id: 1, x: '55%', y: '32%', title: 'Peacock Crown', content: 'The peacock feather represents beauty, purity, and the absorption of all colors of the spectrum into one, symbolizing the integration of all existence.' },
    { id: 2, x: '44%', y: '65%', title: 'Sacred Flute', content: 'Represents the hollow reed of a devotee\'s heart. When emptied of ego, the divine can flow through it to play sweet melodies.' }
  ],
  '12-raas-leela': [
    { id: 1, x: '48%', y: '42%', title: 'The Cosmic Dance', content: 'The circular dance represents the dance of the soul around the divine center, where every individual soul experiences a personal connection with the Supreme.' },
    { id: 2, x: '62%', y: '58%', title: 'Gopis\' Devotion', content: 'Represents \'madhurya bhava\'—the highest stage of ecstatic spiritual love where all social titles and egos dissolve in sheer bliss.' }
  ],
  '14-govardhan-leela': [
    { id: 1, x: '50%', y: '40%', title: 'Lifting Govardhan', content: 'Symbolizes that faith in natural divinity (the hill) over ritualistic gods (Indra) is protected by the little finger of the Lord, representing effortless grace.' },
    { id: 2, x: '38%', y: '65%', title: 'Indra\'s Rain', content: 'Represents the storm of worldly pride and anger, which is easily subdued when facing the shelter of absolute divine shelter.' }
  ],
  '17-kansa-vadh': [
    { id: 1, x: '46%', y: '45%', title: 'Subduing Kansa', content: 'Kansa represents the tyrannical ego and fear of death. His defeat represents the triumph of the eternal soul over physical mortality.' },
    { id: 2, x: '58%', y: '60%', title: 'The Royal Platform', content: 'Represents the high seat of worldly power, which eventually crumbles when it lacks alignment with moral and spiritual law (Dharma).' }
  ],
  '18-meets-sudama': [
    { id: 1, x: '44%', y: '52%', title: 'Pure Friendship', content: 'Sudama represents the selfless, detached seeker who seeks only the association of the divine without asking for wealth or favors.' },
    { id: 2, x: '58%', y: '48%', title: 'Guru Sandipani\'s Ashram', content: 'Represents the sacred sanctuary of knowledge, where social disparities disappear and all students are equal under spiritual guidance.' }
  ],
  '22-runs-embrace': [
    { id: 1, x: '50%', y: '58%', title: 'Barefoot Sprint', content: 'The Lord of the Universe running barefoot to meet a poor beggar signifies that the Divine respects pure devotion far above royal prestige or protocol.' }
  ],
  '23-washing-feet': [
    { id: 1, x: '52%', y: '68%', title: 'Tears of Love', content: 'Washing a devotee\'s feet with tears shows the humility of the Supreme. It represents the inversion of the master-servant dynamic in pure love.' }
  ],
  '25-leaves-flute': [
    { id: 1, x: '50%', y: '45%', title: 'Retiring the Flute', content: 'Signifies the conclusion of temporal activities (leelas) and returning the focus of devotees to the internal, formless teachings of the Bhagavad Gita.' }
  ]
};


export default function ChapterDetailsCard({ activeChapter, activeIndex, onChangeActiveIndex, chapters, globalActiveIndex, onExplore }) {
  const displayNum = String(activeIndex + 1).padStart(2, '0');

  const currentAct = activeChapter.act;
  const chapterImage = activeChapter.image || '/birth_of_krishna.png';
  const isReversed = activeIndex % 2 !== 0;

  const [activeHotspot, setActiveHotspot] = React.useState(null);
  const [isLocked, setIsLocked] = React.useState(false);

  React.useEffect(() => {
    setActiveHotspot(null);
    setIsLocked(false);
  }, [activeChapter.id]);

  const handleHotspotInteraction = (hotspot, isEnter) => {
    if (isLocked) return;
    if (isEnter) {
      setActiveHotspot(hotspot);
    } else {
      setActiveHotspot(prev => (prev && prev.id === hotspot.id && prev.title === hotspot.title) ? null : prev);
    }
  };

  const handleHotspotClick = (hotspot) => {
    if (activeHotspot && activeHotspot.id === hotspot.id && isLocked) {
      setActiveHotspot(null);
      setIsLocked(false);
    } else {
      setActiveHotspot(hotspot);
      setIsLocked(true);
    }
  };

  return (
    <div className={`chapter-details-container ${globalActiveIndex === activeIndex ? 'glow-pulse active-card' : 'inactive-card'} ${isReversed ? 'layout-reversed' : ''}`}>
      {/* 2. Center Text Details */}
      <div className="details-text-column">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="details-content-wrapper"
          >
            <span className="details-chapter-label">
              ACT {currentAct} • CHAPTER {displayNum}
            </span>
            <h2 className="details-chapter-title">
              {activeChapter.title}
            </h2>

            {/* Antique divider */}
            <div className="details-divider">
              <svg className="details-divider-svg" viewBox="0 0 150 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5 H 150" stroke="#d4af37" strokeWidth="0.8" strokeLinecap="round" />
                <circle cx="75" cy="5" r="2.5" fill="#d4af37" />
                <path d="M71 5 L 75 1 L 79 5 L 75 9 Z" stroke="#d4af37" strokeWidth="0.8" fill="none" />
              </svg>
            </div>

            <p className="details-chapter-desc">
              {activeChapter.description}
            </p>

            {onExplore && (
              <button
                className={`btn-gold-outline details-btn ${onExplore ? 'interactive-explore' : ''}`}
                onClick={onExplore}
              >
                Explore Chapter
                <span className="btn-icon-circle-outline">
                  <ChevronRight size={12} />
                </span>
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Right Scenic Visual Panel */}
      <div className="details-image-column">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="details-image-frame"
          >
            <img
              src={chapterImage}
              alt={activeChapter.title}
              className="details-scenic-image"
              loading="lazy"
            />
            {globalActiveIndex === activeIndex && (
              <ChapterParallaxOverlay chapterId={activeChapter.id} />
            )}

            {/* Hotspots rendering - placed directly on the image frame */}
            {hotspotsConfig[activeChapter.id]?.map((hotspot) => (
              <button
                key={hotspot.id}
                className={`sacred-hotspot devotional-hotspot ${activeHotspot?.id === hotspot.id ? 'active' : ''}`}
                style={{
                  position: 'absolute',
                  left: hotspot.x,
                  top: hotspot.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 8
                }}
                onMouseEnter={() => handleHotspotInteraction(hotspot, true)}
                onMouseLeave={() => handleHotspotInteraction(hotspot, false)}
                onClick={() => handleHotspotClick(hotspot)}
                aria-label={`Spiritual Symbolism: ${hotspot.title}`}
              >
                <HotspotLeafSvg />
              </button>
            ))}

            {/* Glassmorphic tooltip popup */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  className="symbolism-tooltip-popup"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="tooltip-header">
                    <span className="tooltip-icon">🪶</span>
                    <h4 className="tooltip-title">{activeHotspot.title}</h4>
                  </div>
                  <p className="tooltip-content">{activeHotspot.content}</p>
                  <button 
                    className="tooltip-close-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(null);
                      setIsLocked(false);
                    }}
                    aria-label="Close tooltip"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Blends image to card background */}
            <div className="details-image-overlay" />
            <div className="details-image-mask" />
          </motion.div>
        </AnimatePresence>
      </div>


      <style dangerouslySetInnerHTML={{
        __html: `
        .chapter-details-container {
          display: flex;
          background: rgba(5, 12, 33, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.06);
          border-radius: 16px;
          min-height: 360px;
          height: auto;
          width: 100%;
          overflow: hidden;
          padding: 24px 36px;
          box-sizing: border-box;
          position: relative;
          z-index: 2;
          gap: 40px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(212, 175, 55, 0.03);
        }

        .chapter-details-container.layout-reversed {
          flex-direction: row-reverse;
        }

        .chapter-details-container::before {
          content: '';
          position: absolute;
          inset: -30px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(212, 175, 55, 0) 70%);
          filter: blur(40px);
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: -1;
        }

        .chapter-details-container.active-card::before {
          opacity: 1;
        }

        @media (max-width: 992px) {
          .chapter-details-container,
          .chapter-details-container.layout-reversed {
            flex-direction: column !important;
            height: auto;
            gap: 24px;
            padding: 20px;
          }
        }

        /* Center Text Column */
        .details-text-column {
          flex: 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
          transform: translateY(calc(var(--scroll-progress, 0) * 12px));
          transition: transform 0.1s ease-out;
        }



        .details-content-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .details-chapter-label {
          font-family: var(--font-sans);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--gold-antique);
          margin-bottom: 6px;
        }

        .details-chapter-title {
          font-size: 26px;
          font-weight: 500;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .details-divider {
          margin: 8px 0;
          width: 150px;
          height: 10px;
        }

        .details-divider-svg {
          width: 100%;
          height: 100%;
        }

        .details-chapter-desc {
          font-family: var(--font-serif-body);
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-muted);
          margin-bottom: 18px;
        }

        .details-btn {
          align-self: flex-start;
          padding: 8px 20px;
          font-size: 9px;
        }

        .interactive-explore {
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1);
        }

        .interactive-explore::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 20%;
          height: 200%;
          background: rgba(255, 255, 255, 0.15);
          transform: rotate(30deg);
          transition: none;
          opacity: 0;
        }

        .interactive-explore:hover::after {
          left: 150%;
          opacity: 1;
          transition: left 0.8s ease-in-out, opacity 0.8s ease-in-out;
        }

        .interactive-explore:hover {
          border-color: var(--gold-metallic) !important;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.45) !important;
          transform: scale(1.02);
        }

        .btn-icon-circle-outline {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(212, 175, 55, 0.1);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.2);
          margin-left: 4px;
        }

        /* Right Image Column */
        .details-image-column {
          flex: 6;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(calc(var(--scroll-progress, 0) * -35px));
          transition: transform 0.1s ease-out;
        }

        @media (max-width: 992px) {
          .details-image-column {
            width: 100%;
            height: auto;
            min-height: 240px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .details-image-frame {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .details-image-frame::before {
          content: '';
          position: absolute;
          width: 160px;
          height: 160px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, transparent 70%);
          filter: blur(35px);
          pointer-events: none;
          z-index: 0;
          transform: translateY(calc(var(--scroll-progress, 0) * 8px));
          transition: transform 0.1s ease-out;
        }

        .details-scenic-image {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 340px;
          object-fit: contain;
          display: block;
          border-radius: 8px;
          border: none;
          box-shadow: none;
          background: transparent;
          position: relative;
          z-index: 1;
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
          mask-image: radial-gradient(ellipse 90% 90% at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
        }

        @media (max-width: 992px) {
          .details-scenic-image {
            max-height: 280px;
          }
        }

        .details-image-overlay {
          display: none;
        }

        .details-image-mask {
          display: none;
        }

        /* Hotspots & Tooltips */
        .hotspots-sidebar {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 10;
        }

        @media (max-width: 992px) {
          .hotspots-sidebar {
            right: 12px;
            gap: 8px;
          }
        }

        .sacred-hotspot {
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-metallic);
          background: rgba(3, 7, 18, 0.85);
          border: 1px solid var(--gold-border);
          border-radius: 50%;
          cursor: pointer;
          z-index: 8;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4), 0 0 5px rgba(212, 175, 55, 0.15);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .sacred-hotspot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 1px solid var(--gold-metallic);
          border-radius: 50%;
          opacity: 0;
          animation: hotspotPulse 2s infinite ease-out;
          pointer-events: none;
        }

        @keyframes hotspotPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        .sacred-hotspot:hover,
        .sacred-hotspot.active {
          transform: scale(1.15);
          border-color: var(--gold-metallic);
          color: #fff;
          background: rgba(12, 24, 58, 0.95);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 12px rgba(212, 175, 55, 0.5);
        }

        .hotspot-leaf-icon {
          width: 14px;
          height: 14px;
          display: block;
        }

        .symbolism-tooltip-popup {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          background: rgba(5, 12, 33, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 10px;
          padding: 14px 18px;
          z-index: 12;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(212, 175, 55, 0.05);
          pointer-events: auto;
          text-align: left;
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .tooltip-icon {
          font-size: 14px;
        }

        .tooltip-title {
          font-family: var(--font-serif-title);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: var(--gold-metallic);
          text-transform: uppercase;
        }

        .tooltip-content {
          font-family: var(--font-serif-body);
          font-size: 13px;
          line-height: 1.4;
          color: var(--text-primary);
          margin-right: 16px;
        }

        .tooltip-close-btn {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 16px;
          color: var(--gold-antique);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          line-height: 1;
        }

        .tooltip-close-btn:hover {
          color: #fff;
        }
      `}} />
    </div>
  );
}
