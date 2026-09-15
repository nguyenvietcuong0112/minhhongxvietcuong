import React, { useState, useEffect } from 'react';
import { THEMES } from '../config/weddingData';

/**
 * ControlBar: Floating glassmorphic dock at the bottom of the screen.
 * Auto-hides when mouse is idle so the backdrop remains completely pristine for projection.
 */
const ControlBar = ({
  currentMode,
  setMode,
  currentThemeId,
  setThemeId,
  particlesEnabled,
  setParticlesEnabled,
  audioPlaying,
  setAudioPlaying,
  onOpenSettings,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-hide control bar after 4 seconds of idle mouse
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timeoutId = setTimeout(() => setIsVisible(false), 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Keyboard shortcuts (F for fullscreen, H to toggle bar, M for music, 1/2/3 for modes)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'h' || e.key === 'H') {
        setIsVisible((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        setAudioPlaying((prev) => !prev);
      } else if (e.key === '1') {
        setMode('backdrop');
      } else if (e.key === '2') {
        setMode('slideshow');
      } else if (e.key === '3') {
        setMode('countdown');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => console.warn('Fullscreen error:', err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <>
      {/* Mini toggle button when bar is hidden */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="dock-reveal-btn"
          title="Mở thanh điều khiển (Phím H)"
          aria-label="Hiện thanh điều khiển"
        >
          ⚙ Điều khiển
        </button>
      )}

      {/* Floating Dock */}
      <div className={`control-dock-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="control-dock">
          {/* Mode Switcher */}
          <div className="dock-group mode-group">
            <button
              onClick={() => setMode('backdrop')}
              className={`dock-btn ${currentMode === 'backdrop' ? 'active' : ''}`}
              title="Phím tắt: 1"
            >
              <span className="dock-icon">🎎</span>
              <span className="dock-label">Backdrop Lễ</span>
            </button>
            <button
              onClick={() => setMode('slideshow')}
              className={`dock-btn ${currentMode === 'slideshow' ? 'active' : ''}`}
              title="Phím tắt: 2"
            >
              <span className="dock-icon">📸</span>
              <span className="dock-label">Album Ảnh</span>
            </button>
            <button
              onClick={() => setMode('countdown')}
              className={`dock-btn ${currentMode === 'countdown' ? 'active' : ''}`}
              title="Phím tắt: 3"
            >
              <span className="dock-icon">⏳</span>
              <span className="dock-label">Đếm Ngược</span>
            </button>
          </div>

          <div className="dock-divider" />

          {/* Theme Switcher */}
          <div className="dock-group theme-group">
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`theme-dot-btn ${currentThemeId === t.id ? 'active' : ''}`}
                title={t.name}
              >
                <span
                  className="theme-circle-preview"
                  style={{ background: t.accentColor }}
                />
              </button>
            ))}
          </div>

          <div className="dock-divider" />

          {/* Quick Toggles */}
          <div className="dock-group toggle-group">
            {/* Particles Toggle */}
            <button
              onClick={() => setParticlesEnabled(!particlesEnabled)}
              className={`dock-btn small ${particlesEnabled ? 'active' : ''}`}
              title="Bật/Tắt hiệu ứng hoa rơi & bụi vàng"
            >
              <span className="dock-icon">✨</span>
              <span className="dock-label">{particlesEnabled ? 'Hoa rơi: BẬT' : 'Hoa rơi: TẮT'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setAudioPlaying(!audioPlaying)}
              className={`dock-btn small ${audioPlaying ? 'active' : ''}`}
              title="Bật/Tắt nhạc nền lãng mạn (Phím M)"
            >
              <span className="dock-icon">{audioPlaying ? '🔊' : '🔇'}</span>
              <span className="dock-label">{audioPlaying ? 'Nhạc: BẬT' : 'Nhạc: TẮT'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className={`dock-btn small ${isFullscreen ? 'active' : ''}`}
              title="Toàn màn hình trình chiếu (Phím F)"
            >
              <span className="dock-icon">{isFullscreen ? '⛶' : '⛶'}</span>
              <span className="dock-label">{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="dock-btn settings-btn"
              title="Tuỳ chỉnh tên, ngày, câu chúc, hình ảnh..."
            >
              <span className="dock-icon">⚙</span>
              <span className="dock-label">Tuỳ Chỉnh</span>
            </button>
          </div>

          {/* Hide Bar Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="dock-hide-btn"
            title="Ẩn thanh điều khiển (Phím H)"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default ControlBar;
