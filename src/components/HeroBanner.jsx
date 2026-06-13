import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function HeroBanner({ onBeginJourney }) {
  return (
    <section className="hero-banner-container">
      {/* Left Text Block */}
      <motion.div 
        className="hero-text-block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <span className="hero-subtitle">
          A Journey of Love, Devotion, and Destiny
        </span>
        <h1 className="hero-title">
          The Eternal<br />Krishna
        </h1>

        {/* Peacock feather divider ornament */}
        <div className="hero-divider devotional-hotspot">
          <svg className="divider-svg" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10 H 260" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" />
            {/* Peacock Feather Small Icon at the end of the line */}
            <g transform="translate(265, -2) scale(0.18)">
              {/* Stem */}
              <path d="M10 50 C 45 40, 60 25, 90 20" stroke="#d4af37" strokeWidth="3" fill="none" />
              {/* Outer feather */}
              <path d="M90 20 C 50 15, 30 25, 10 50 C 35 70, 70 50, 90 20 Z" fill="rgba(212, 175, 55, 0.15)" stroke="#c5a880" strokeWidth="1.5" />
              {/* Eyelet */}
              <path d="M80 23 C 65 21, 55 30, 68 40 C 78 35, 85 28, 80 23 Z" fill="#0c2040" stroke="#00bcd4" strokeWidth="2" />
              <circle cx="74" cy="31" r="3" fill="#00bcd4" />
            </g>
          </svg>
        </div>

        <p className="hero-description">
          From the butter thief of Vrindavan to the slayer of Kansa, experience the timeless leelas of Lord Krishna.
        </p>

        <button 
          onClick={onBeginJourney}
          className="btn-gold-solid hero-btn"
        >
          Begin The Journey
          <span className="btn-icon-circle">
            <ChevronRight size={14} />
          </span>
        </button>
      </motion.div>

      {/* Right Image Block */}
      <motion.div 
        className="hero-image-block"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="hero-image-frame">
          <img 
            src="/baby_krishna_butter.png" 
            alt="The Eternal Krishna - Baby Krishna" 
            className="hero-image" 
          />
          {/* Inner radial gold glow */}
          <div className="hero-image-glow" />
          {/* Edge blended gradients */}
          <div className="hero-mask-bottom" />
          <div className="hero-mask-left" />
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        .hero-banner-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 40px;
          margin-top: 12px;
          margin-bottom: 12px;
          position: relative;
        }

        @media (max-width: 992px) {
          .hero-banner-container {
            flex-direction: column-reverse;
            text-align: center;
            gap: 24px;
          }
        }

        .hero-text-block {
          flex: 1;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        @media (max-width: 992px) {
          .hero-text-block {
            align-items: center;
            text-align: center;
            max-width: 100%;
          }
        }

        .hero-subtitle {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 3px;
          color: var(--gold-antique);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .hero-title {
          font-size: 52px;
          line-height: 1.1;
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 38px;
          }
        }

        .hero-divider {
          width: 100%;
          margin: 12px 0;
        }

        .divider-svg {
          width: 100%;
          max-width: 300px;
          height: 20px;
        }

        @media (max-width: 992px) {
          .divider-svg {
            margin: 0 auto;
          }
        }

        .hero-description {
          font-family: var(--font-serif-body);
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 28px;
        }

        .hero-btn {
          position: relative;
        }

        .btn-icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(3, 7, 18, 0.4);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-left: 4px;
        }

        .hero-image-block {
          flex: 1.2;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
        }

        @media (max-width: 992px) {
          .hero-image-block {
            justify-content: center;
            width: 100%;
          }
        }

        .hero-image-frame {
          position: relative;
          width: 100%;
          max-width: 520px;
          max-height: 420px;
          aspect-ratio: 4/3;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        .hero-image-glow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 50px rgba(212, 175, 55, 0.15);
          pointer-events: none;
        }

        .hero-mask-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20%;
          background: linear-gradient(to top, rgba(3, 7, 18, 0.6) 0%, transparent 100%);
          pointer-events: none;
        }

        .hero-mask-left {
          position: absolute;
          bottom: 0;
          left: 0;
          top: 0;
          width: 15%;
          background: linear-gradient(to right, rgba(3, 7, 18, 0.6) 0%, transparent 100%);
          pointer-events: none;
        }

        @media (max-width: 992px) {
          .hero-mask-left {
            display: none;
          }
        }
      `}} />
    </section>
  );
}
