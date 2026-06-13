import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EpilogueOverlay({ isActive, onClose }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isActive) {
      // Sequence the animations
      const t1 = setTimeout(() => setStep(1), 3000); // Wait for black fade, then show image
      const t2 = setTimeout(() => setStep(2), 6000); // Show english text
      const t3 = setTimeout(() => setStep(3), 9000); // Show hindi text

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setStep(0);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="epilogue-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          onClick={onClose} // Allow user to click to dismiss and see normal UI
        >
          {/* Black background is handled by the container itself via CSS */}
          
          <AnimatePresence>
            {step >= 1 && (
              <motion.img
                src="/leaves_flute.jpg"
                alt="Krishna Leaves the Flute"
                className="epilogue-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }} // Dim the image slightly so text is readable
                transition={{ duration: 3, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

          <div className="epilogue-text-container">
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  className="epilogue-english"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                >
                  <p>He is more than a story.</p>
                  <p className="epilogue-emphasis">He is an experience.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  className="epilogue-hindi"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
                >
                  जय श्री कृष्ण
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {step >= 3 && (
            <motion.div
              className="epilogue-dismiss"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2 }}
            >
              Click anywhere to close
            </motion.div>
          )}

          <style dangerouslySetInnerHTML={{__html: `
            .epilogue-container {
              position: fixed;
              inset: 0;
              background-color: #000;
              z-index: 9999;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }

            .epilogue-image {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: 1;
            }

            .epilogue-text-container {
              position: relative;
              z-index: 2;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 40px;
            }

            .epilogue-english {
              font-family: var(--font-serif-body);
              font-size: 24px;
              color: rgba(255, 255, 255, 0.9);
              line-height: 1.6;
              text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
            }

            .epilogue-emphasis {
              font-family: var(--font-serif-title);
              font-size: 36px;
              color: var(--gold-metallic);
              font-style: italic;
              margin-top: 10px;
            }

            .epilogue-hindi {
              font-family: var(--font-serif-title);
              font-size: 42px;
              color: var(--gold-metallic);
              font-weight: 700;
              letter-spacing: 4px;
              text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
            }

            .epilogue-dismiss {
              position: absolute;
              bottom: 40px;
              font-family: var(--font-sans);
              font-size: 10px;
              letter-spacing: 3px;
              color: rgba(255, 255, 255, 0.4);
              z-index: 2;
              text-transform: uppercase;
            }

            @media (max-width: 768px) {
              .epilogue-english { font-size: 18px; }
              .epilogue-emphasis { font-size: 28px; }
              .epilogue-hindi { font-size: 32px; }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
