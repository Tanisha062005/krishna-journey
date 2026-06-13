import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, ArrowLeft, Volume2, VolumeX } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoSrc, title }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showUnmuteToast, setShowUnmuteToast] = useState(false);

  // Auto-play attempt when modal opens
  useEffect(() => {
    if (isOpen) {
      // Reset video state
      setIsPlaying(false);
      setIsMuted(false);
      setProgress(0);
      setCurrentTime(0);
      setControlsVisible(true);
      setShowUnmuteToast(false);

      const timer = setTimeout(() => {
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.muted = false; // Attempt playing with sound first

          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setIsMuted(false);
                setShowUnmuteToast(false);
              })
              .catch((err) => {
                console.log("Autoplay with audio blocked. Attempting muted autoplay.", err);
                // Graceful fallback to muted autoplay
                video.muted = true;
                setIsMuted(true);
                setShowUnmuteToast(true);

                video.play()
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch((mutedErr) => {
                    console.error("Muted autoplay also failed:", mutedErr);
                  });
              });
          }
        }
      }, 300); // Small delay to let Framer Motion finish animation mount

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle controls visibility timeout (fade out controls after 2.5s of inactivity when playing)
  const resetControlsTimeout = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2500);
    }
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Handle keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault(); // Stop page scrolling
        handlePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, isMuted]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play().catch(err => console.log("Play failed:", err));
        setIsPlaying(true);
      }
      resetControlsTimeout();
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(err => console.log("Play failed:", err));
      setIsPlaying(true);
      resetControlsTimeout();
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const nextMuted = !isMuted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        setShowUnmuteToast(false);
      }
      resetControlsTimeout();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleProgressBarClick = (e) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (progressBar && video) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(1, clickX / width));
      const newTime = percentage * video.duration;
      video.currentTime = newTime;
      setProgress(percentage * 100);
      setCurrentTime(newTime);
      resetControlsTimeout();
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseMove={resetControlsTimeout}
        >
          {/* Subtle Overlay Shadow Top/Bottom to enhance button visibility */}
          <div className={`video-vignette ${controlsVisible ? 'visible' : ''}`} />

          {/* TOP CONTROLS */}
          <div className={`video-top-bar ${controlsVisible ? 'visible' : ''}`}>
            <button className="video-btn-back" onClick={onClose} title="Return to Journey">
              <ArrowLeft size={16} />
              <span>Return to Journey</span>
            </button>
            <div className="video-title">{title}</div>
            <button className="video-btn-close" onClick={onClose} title="Close Experience">
              <X size={20} />
            </button>
          </div>

          {/* MAIN VIDEO VIEWPORT CONTAINER */}
          <div className="video-viewport-wrapper" onClick={handlePlayPause}>
            <video
              ref={videoRef}
              src={videoSrc}
              className="video-element"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Play/Pause Overlay Animation Indicator (shown when paused) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  className="video-play-center-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Play size={40} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Autoplay blocked muted notification */}
            <AnimatePresence>
              {showUnmuteToast && (
                <motion.div
                  className="video-unmute-toast"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={(e) => {
                    e.stopPropagation(); // Don't trigger play/pause
                    handleToggleMute();
                  }}
                >
                  <VolumeX size={16} className="unmute-toast-icon" />
                  <span>Autoplayed Muted. Click to Unmute.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM CONTROL PANEL */}
          <div className={`video-bottom-panel ${controlsVisible ? 'visible' : ''}`}>
            {/* Timeline Progress Bar */}
            <div 
              className="video-progress-container"
              ref={progressBarRef}
              onClick={handleProgressBarClick}
            >
              <div className="video-progress-bg" />
              <div 
                className="video-progress-fill" 
                style={{ width: `${progress}%` }} 
              />
              <div 
                className="video-progress-handle"
                style={{ left: `${progress}%` }}
              />
            </div>

            <div className="video-controls-row">
              <div className="video-controls-left">
                {/* Play/Pause Button */}
                <button 
                  className="video-control-btn play-pause-btn" 
                  onClick={handlePlayPause}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>

                {/* Replay Button */}
                <button 
                  className="video-control-btn replay-btn" 
                  onClick={handleReplay}
                  title="Replay"
                >
                  <RotateCcw size={16} />
                </button>

                {/* Timeline time reading */}
                <span className="video-time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="video-controls-right">
                {/* Mute/Unmute toggle */}
                <button 
                  className={`video-control-btn volume-btn ${isMuted ? 'muted' : ''}`}
                  onClick={handleToggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .video-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 9999;
              background-color: rgba(3, 7, 18, 0.95);
              backdrop-filter: blur(20px);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              color: var(--text-primary, #ffffff);
              font-family: var(--font-sans, system-ui, sans-serif);
              user-select: none;
            }

            /* Vignette gradient overlays to ensure text/controls visibility */
            .video-vignette {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              pointer-events: none;
              background: radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.75) 100%);
              opacity: 0;
              transition: opacity 0.4s ease;
              z-index: 1;
            }
            .video-vignette.visible {
              opacity: 1;
            }

            /* Top Bar styling */
            .video-top-bar {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 80px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 40px;
              z-index: 10;
              transform: translateY(-20px);
              opacity: 0;
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
              pointer-events: none;
            }
            .video-top-bar.visible {
              transform: translateY(0);
              opacity: 1;
              pointer-events: auto;
            }

            @media (max-width: 768px) {
              .video-top-bar {
                padding: 0 16px;
                height: 60px;
              }
            }

            /* Return to Journey Button style */
            .video-btn-back {
              display: flex;
              align-items: center;
              gap: 8px;
              background: rgba(212, 175, 55, 0.08);
              border: 1px solid rgba(212, 175, 55, 0.25);
              border-radius: 30px;
              padding: 8px 18px;
              color: var(--gold-antique, #d4af37);
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }
            .video-btn-back:hover {
              background: rgba(212, 175, 55, 0.18);
              border-color: var(--gold-metallic, #ffd700);
              color: var(--text-primary, #ffffff);
              box-shadow: 0 0 12px rgba(212, 175, 55, 0.25);
              transform: translateY(-1px);
            }

            .video-title {
              font-family: var(--font-serif-title, serif);
              font-size: 18px;
              font-weight: 500;
              letter-spacing: 2px;
              color: var(--gold-metallic, #ffd700);
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
              text-transform: uppercase;
            }
            @media (max-width: 600px) {
              .video-title {
                display: none; /* Hide title on very narrow screens */
              }
            }

            .video-btn-close {
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(212, 175, 55, 0.15);
              border-radius: 50%;
              width: 38px;
              height: 38px;
              color: var(--text-muted, #a0aec0);
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .video-btn-close:hover {
              background: rgba(239, 68, 68, 0.2);
              border-color: rgba(239, 68, 68, 0.4);
              color: #ff8888;
              transform: rotate(90deg);
            }

            /* Video Viewport Wrapper */
            .video-viewport-wrapper {
              position: relative;
              max-width: 92%;
              max-height: 80%;
              width: auto;
              height: auto;
              aspect-ratio: 16/9;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0 15px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.1);
              border-radius: 12px;
              border: 1px solid rgba(212, 175, 55, 0.2);
              background-color: #000;
              overflow: hidden;
              z-index: 5;
            }

            @media (max-width: 1200px) {
              .video-viewport-wrapper {
                max-width: 95%;
                max-height: 75%;
              }
            }

            .video-element {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 11px;
            }

            /* Central Big Play Icon */
            .video-play-center-btn {
              position: absolute;
              width: 76px;
              height: 76px;
              background: rgba(212, 175, 55, 0.15);
              border: 2px solid var(--gold-border, #d4af37);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--gold-metallic, #ffd700);
              cursor: pointer;
              box-shadow: 0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.2);
              backdrop-filter: blur(4px);
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              pointer-events: none; /* Let parent click handle it */
            }
            .video-viewport-wrapper:hover .video-play-center-btn {
              transform: scale(1.1);
              background: rgba(212, 175, 55, 0.25);
              box-shadow: 0 0 40px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.3);
            }

            /* Autoplay warning toast */
            .video-unmute-toast {
              position: absolute;
              top: 24px;
              background: rgba(7, 15, 38, 0.85);
              border: 1px solid var(--gold-border, #d4af37);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.2);
              border-radius: 30px;
              padding: 10px 20px;
              display: flex;
              align-items: center;
              gap: 10px;
              color: var(--text-primary, #ffffff);
              font-size: 11px;
              font-weight: 500;
              letter-spacing: 0.5px;
              backdrop-filter: blur(10px);
              cursor: pointer;
              z-index: 12;
              transition: all 0.3s ease;
              animation: float-pulse 2s infinite alternate;
            }
            .video-unmute-toast:hover {
              background: rgba(212, 175, 55, 0.2);
              transform: scale(1.03);
            }
            .unmute-toast-icon {
              color: var(--gold-metallic, #ffd700);
            }

            @keyframes float-pulse {
              0% { transform: translateY(0px); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); }
              100% { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(212, 175, 55, 0.25); }
            }

            /* Bottom Panel */
            .video-bottom-panel {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 20px 40px 40px 40px;
              display: flex;
              flex-direction: column;
              gap: 15px;
              z-index: 10;
              transform: translateY(20px);
              opacity: 0;
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
              pointer-events: none;
            }
            .video-bottom-panel.visible {
              transform: translateY(0);
              opacity: 1;
              pointer-events: auto;
            }

            @media (max-width: 768px) {
              .video-bottom-panel {
                padding: 16px 16px 24px 16px;
              }
            }

            /* Custom Progress Bar */
            .video-progress-container {
              position: relative;
              width: 100%;
              height: 6px;
              cursor: pointer;
              display: flex;
              align-items: center;
            }
            .video-progress-bg {
              position: absolute;
              left: 0;
              right: 0;
              height: 4px;
              background-color: rgba(255, 255, 255, 0.15);
              border-radius: 2px;
              transition: height 0.2s ease;
            }
            .video-progress-fill {
              position: absolute;
              left: 0;
              height: 4px;
              background: linear-gradient(90deg, var(--gold-antique, #d4af37), var(--gold-metallic, #ffd700));
              border-radius: 2px;
              transition: height 0.2s ease;
              box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
            }
            .video-progress-handle {
              position: absolute;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: #ffffff;
              border: 2px solid var(--gold-metallic, #ffd700);
              transform: translate(-50%, -50%);
              top: 50%;
              opacity: 0;
              transition: opacity 0.2s ease, transform 0.2s ease;
              box-shadow: 0 0 8px rgba(212, 175, 55, 0.8);
            }

            .video-progress-container:hover .video-progress-bg,
            .video-progress-container:hover .video-progress-fill {
              height: 6px;
            }
            .video-progress-container:hover .video-progress-handle {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.15);
            }

            /* Controls Layout row */
            .video-controls-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
            }

            .video-controls-left {
              display: flex;
              align-items: center;
              gap: 20px;
            }
            .video-controls-right {
              display: flex;
              align-items: center;
            }

            /* Buttons inside control bar */
            .video-control-btn {
              background: transparent;
              border: none;
              color: var(--text-muted, #a0aec0);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
              padding: 6px;
              border-radius: 4px;
            }
            .video-control-btn:hover {
              color: var(--gold-metallic, #ffd700);
              background: rgba(255, 255, 255, 0.05);
              transform: scale(1.08);
            }

            .play-pause-btn {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.05);
              color: var(--gold-antique, #d4af37);
              border: 1px solid rgba(212, 175, 55, 0.2);
            }
            .play-pause-btn:hover {
              background: rgba(212, 175, 55, 0.1);
              color: var(--gold-metallic, #ffd700);
              border-color: rgba(212, 175, 55, 0.4);
            }

            .video-time-display {
              font-family: var(--font-mono, monospace);
              font-size: 12px;
              color: var(--text-muted, #a0aec0);
              letter-spacing: 0.5px;
            }

            .volume-btn.muted {
              color: #ef4444;
            }
            .volume-btn.muted:hover {
              color: #fca5a5;
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
