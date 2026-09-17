import React, { useState, useEffect } from 'react';
import { THEMES, ORNAMENTS } from '../config/weddingData';

/**
 * ControlBar: Modern minimalist floating dock for switching themes and layout modes.
 */
const ControlBar = ({
  currentThemeId,
  setThemeId,
  layoutMode,
  onToggleLayout,
  isSlideshow,
  onToggleSlideshow,
  fontFamily,
  onToggleFont,
  ornament,
  onToggleOrnament,
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

  // Keyboard shortcuts (F: fullscreen, H: bar, M: music)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'h' || e.key === 'H') {
        setIsVisible((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        setAudioPlaying((prev) => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        if (onToggleSlideshow) onToggleSlideshow();
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
      {/* Mini reveal button when dock is hidden */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="modern-reveal-btn"
          title="Mở thanh điều khiển (Phím H)"
          aria-label="Hiện thanh điều khiển"
        >
          ⚙ Điều khiển
        </button>
      )}

      {/* Floating Modern Dock */}
      <div className={`modern-dock-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="modern-dock">
          {/* Theme Switcher */}
          <div className="dock-group">
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`modern-dock-btn ${currentThemeId === t.id ? 'active' : ''}`}
                title={t.name}
              >
                <span className="dock-icon">
                  {t.id === 'blushSakura' ? '🌸' : t.id === 'ivoryLotus' ? '🌿' : t.id === 'royalRed' ? '🏮' : '🌺'}
                </span>
                <span className="dock-label">{t.name.split(' (')[0]}</span>
              </button>
            ))}
          </div>

          <div className="dock-divider" />

          {/* Layout Mode & Slideshow Group */}
          <div className="dock-group">
            {/* Slideshow Presentation Button */}
            <button
              onClick={onToggleSlideshow}
              className={`modern-dock-btn slideshow-btn ${isSlideshow ? 'active-slideshow' : ''}`}
              title="Bật/Tắt chế độ tự động trình chiếu slide trên TV (Phím S)"
            >
              <span className="dock-icon">{isSlideshow ? '🎬' : '▶️'}</span>
              <span className="dock-label">
                {isSlideshow ? 'Đang Chiếu' : 'Trình Chiếu'}
              </span>
            </button>

            {/* Layout Mode Toggle */}
            <button
              onClick={onToggleLayout}
              className="modern-dock-btn"
              title="Đổi kiểu hiển thị: Toàn cảnh chữ hoặc Kèm ảnh chân dung (Phím V)"
            >
              <span className="dock-icon">{layoutMode === 'center' ? '🖼️' : '🎎'}</span>
              <span className="dock-label">
                {layoutMode === 'center' ? 'Xem Kèm Ảnh' : 'Xem Toàn Cảnh'}
              </span>
            </button>

            {/* Font Style Toggle */}
            <button
              onClick={onToggleFont}
              className="modern-dock-btn"
              title="Đổi kiểu chữ: Nét thanh thoát / Nét đậm đà (Phím P)"
            >
              <span className="dock-icon">🔤</span>
              <span className="dock-label">
                {fontFamily === 'charm' ? 'Chữ Nét Đậm' : 'Chữ Ký Uốn'}
              </span>
            </button>

            {/* Ornament Motif Toggle */}
            <button
              onClick={onToggleOrnament}
              className="modern-dock-btn"
              title="Đổi họa tiết góc: Lan Hồ Điệp / Quạt Xếp / Kim Tuyến / Tối Giản / Hoa Sen (Phím O)"
            >
              <span className="dock-icon">
                {ORNAMENTS[ornament]?.icon || '🌸'}
              </span>
              <span className="dock-label">
                {ORNAMENTS[ornament]?.name?.split(' ')[0] + ' ' + (ORNAMENTS[ornament]?.name?.split(' ')[1] || '')}
              </span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setAudioPlaying(!audioPlaying)}
              className={`modern-dock-btn ${audioPlaying ? 'active' : ''}`}
              title="Bật/Tắt nhạc YouTube đám cưới (Phím M)"
            >
              <span className="dock-icon">{audioPlaying ? '🔊' : '🔇'}</span>
              <span className="dock-label">{audioPlaying ? 'Nhạc: BẬT' : 'Nhạc: TẮT'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className={`modern-dock-btn ${isFullscreen ? 'active' : ''}`}
              title="Toàn màn hình TV (Phím F)"
            >
              <span className="dock-icon">⛶</span>
              <span className="dock-label">{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="modern-dock-btn settings"
              title="Tuỳ chỉnh nội dung..."
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
