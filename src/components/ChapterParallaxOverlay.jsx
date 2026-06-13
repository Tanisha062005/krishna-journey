import React from 'react';

export default function ChapterParallaxOverlay({ chapterId }) {
  // Determine overlay type
  const isProphecy = chapterId === '01-prophecy';
  const isYamuna = chapterId === '02-crossing-yamuna';
  const isGovardhan = chapterId === '14-govardhan-leela';
  const isFinal = chapterId === '25-leaves-flute';
  
  // Gokul & Vrindavan scenes (Act I, except Yamuna and Govardhan and Prophecy)
  const isVrindavan = [
    '03-little-kanha',
    '04-makhan-chor',
    '05-universe-mouth',
    '06-damodar-leela',
    '07-calves-test',
    '08-peacock-chase',
    '09-radha-meeting',
    '10-flower-crowns',
    '11-moonlight-yamuna',
    '12-raas-leela',
    '13-kaliya-mardan',
    '15-farewell-vrindavan'
  ].includes(chapterId);

  // Dwarka scenes (Act IV)
  const isDwarka = [
    '20-establishes-dwarka',
    '21-sudama-journey',
    '22-runs-embrace',
    '23-washing-feet',
    '24-gift-beaten-rice'
  ].includes(chapterId);

  return (
    <div className="chapter-parallax-overlay-container" aria-hidden="true">
      {/* 1. Prophecy lightning clouds */}
      {isProphecy && (
        <>
          <div className="overlay-cloud cloud-1" />
          <div className="overlay-cloud cloud-2" />
        </>
      )}

      {/* 2. Yamuna water reflections */}
      {isYamuna && (
        <div className="water-reflection" />
      )}

      {/* 3. Vrindavan flower petals and leaves */}
      {isVrindavan && (
        <>
          <div className="vrindavan-element leaf-1" />
          <div className="vrindavan-element petal-1" />
          <div className="vrindavan-element leaf-2" />
          <div className="vrindavan-element petal-2" />
        </>
      )}

      {/* 4. Govardhan rain layers */}
      {isGovardhan && (
        <>
          <div className="rain-layer rain-back" />
          <div className="rain-layer rain-front" />
        </>
      )}

      {/* 5. Dwarka sea waves and ship */}
      {isDwarka && (
        <>
          <div className="dwarka-wave wave-back" />
          <div className="dwarka-wave wave-front" />
          <div className="dwarka-ship" />
        </>
      )}

      {/* 6. Final scene moonlight, fireflies, and footprints */}
      {isFinal && (
        <>
          <div className="final-moonlight" />
          <div className="final-firefly fly-1" />
          <div className="final-firefly fly-2" />
          <div className="final-footprints devotional-hotspot">
            <svg viewBox="0 0 40 30" className="footprints-svg">
              {/* Left Foot */}
              <path d="M12 22 C10 20, 8 16, 9 12 C10 9, 13 8, 14 11 C15 13, 14 17, 13 20 C12 21, 12 22, 12 22 Z" fill="var(--gold-antique)" />
              <circle cx="10" cy="7" r="1.5" fill="var(--gold-antique)" />
              <circle cx="12" cy="6" r="1.2" fill="var(--gold-antique)" />
              <circle cx="14" cy="6.5" r="1.0" fill="var(--gold-antique)" />
              <circle cx="16" cy="7.5" r="0.8" fill="var(--gold-antique)" />
              
              {/* Right Foot slightly forward */}
              <path d="M26 17 C24 15, 22 11, 23 7 C24 4, 27 3, 28 6 C29 8, 28 12, 27 15 C26 16, 26 17, 26 17 Z" fill="var(--gold-antique)" />
              <circle cx="24" cy="2" r="1.5" fill="var(--gold-antique)" />
              <circle cx="26" cy="1" r="1.2" fill="var(--gold-antique)" />
              <circle cx="28" cy="1.5" r="1.0" fill="var(--gold-antique)" />
              <circle cx="30" cy="2.5" r="0.8" fill="var(--gold-antique)" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
