import React, { useState, useEffect, useRef } from 'react';
import { THEMES, ORNAMENTS } from '../config/weddingData';

/**
 * ControlBar: Modern minimalist floating dock for switching themes and layout modes.
 * Features unified popover menus for Theme and Ornament selection.
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
  onSelectOrnament,
  onToggleOrnament,
  audioPlaying,
  setAudioPlaying,
  onOpenSettings,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(() => {
    return new URLSearchParams(window.location.search).get('menu') === 'theme';
  });
  const [showOrnamentMenu, setShowOrnamentMenu] = useState(() => {
    return new URLSearchParams(window.location.search).get('menu') === 'ornament';
  });

  const dockRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setShowThemeMenu(false);
        setShowOrnamentMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-hide control bar after 5 seconds of idle mouse (only when menus are closed)
  useEffect(() => {
    if (showThemeMenu || showOrnamentMenu) return;

    let timeoutId;
    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timeoutId = setTimeout(() => setIsVisible(false), 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [showThemeMenu, showOrnamentMenu]);

  // Keyboard shortcuts (F: fullscreen, H: bar, M: music, T: theme menu, O: ornament menu, Esc: close menu)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'Escape') {
        setShowThemeMenu(false);
        setShowOrnamentMenu(false);
      } else if (e.key === 'h' || e.key === 'H') {
        setIsVisible((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        setAudioPlaying((prev) => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        if (onToggleSlideshow) onToggleSlideshow();
      } else if (e.key === 't' || e.key === 'T') {
        setShowThemeMenu((prev) => !prev);
        setShowOrnamentMenu(false);
      } else if (e.key === 'o' || e.key === 'O') {
        setShowOrnamentMenu((prev) => !prev);
        setShowThemeMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setAudioPlaying, onToggleSlideshow]);

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

  const activeTheme = THEMES[currentThemeId] || THEMES.ivoryLotus;
  const activeOrnament = ORNAMENTS[ornament] || ORNAMENTS.lotus;

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
      <div
        ref={dockRef}
        className={`modern-dock-wrapper ${isVisible ? 'visible' : 'hidden'}`}
      >
        <div className="modern-dock">
          {/* Group 1: Appearance Controls (Theme & Ornaments with Popover Pickers) */}
          <div className="dock-group">
            {/* Unified Theme Button with Popover */}
            <div className="dock-popover-anchor">
              <button
                onClick={() => {
                  setShowThemeMenu((prev) => !prev);
                  setShowOrnamentMenu(false);
                }}
                className={`modern-dock-btn theme-dock-btn ${showThemeMenu ? 'active' : ''}`}
                title="Chọn phông nền màu sắc (Phím T)"
              >
                <span className="dock-icon">{activeTheme.icon}</span>
                <span className="dock-label">{activeTheme.shortName || 'Màu Nền'}</span>
                <span className="dock-chevron">{showThemeMenu ? '▲' : '▼'}</span>
              </button>

              {/* Theme Popover Picker */}
              {showThemeMenu && (
                <div className="dock-popover-menu theme-popover">
                  <div className="popover-header">🎨 Chọn Màu Phông Nền</div>
                  <div className="popover-items">
                    {Object.values(THEMES).map((t) => {
                      const isSelected = currentThemeId === t.id;
                      return (
                        <button
                          key={t.id}
                          className={`popover-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            setThemeId(t.id);
                            setShowThemeMenu(false);
                          }}
                        >
                          <div
                            className="item-swatch-circle"
                            style={{
                              background: t.swatchGradient || t.bg,
                            }}
                          />
                          <div className="item-text">
                            <div className="item-title">
                              <span className="item-icon-inline">{t.icon}</span>
                              {t.name.split(' (')[0]}
                            </div>
                            <div className="item-desc">{t.desc}</div>
                          </div>
                          {isSelected && <span className="item-check">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Unified Ornament Button with Popover */}
            <div className="dock-popover-anchor">
              <button
                onClick={() => {
                  setShowOrnamentMenu((prev) => !prev);
                  setShowThemeMenu(false);
                }}
                className={`modern-dock-btn ornament-dock-btn ${showOrnamentMenu ? 'active' : ''}`}
                title="Chọn họa tiết trang trí (Phím O)"
              >
                <span className="dock-icon">{activeOrnament.icon}</span>
                <span className="dock-label">{activeOrnament.shortName || 'Họa Tiết'}</span>
                <span className="dock-chevron">{showOrnamentMenu ? '▲' : '▼'}</span>
              </button>

              {/* Ornament Popover Picker */}
              {showOrnamentMenu && (
                <div className="dock-popover-menu ornament-popover">
                  <div className="popover-header">🪷 Chọn Họa Tiết Trang Trí</div>
                  <div className="popover-items">
                    {Object.values(ORNAMENTS).map((o) => {
                      const isSelected = ornament === o.id;
                      return (
                        <button
                          key={o.id}
                          className={`popover-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            if (onSelectOrnament) {
                              onSelectOrnament(o.id);
                            } else if (onToggleOrnament) {
                              onToggleOrnament();
                            }
                            setShowOrnamentMenu(false);
                          }}
                        >
                          <span className="item-icon-large">{o.icon}</span>
                          <div className="item-text">
                            <div className="item-title">
                              {o.name}
                              {o.id === 'lotus' && <span className="item-badge">Đẹp nhất</span>}
                            </div>
                            <div className="item-desc">{o.desc}</div>
                          </div>
                          {isSelected && <span className="item-check">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="dock-divider" />

          {/* Group 2: Display, Typography & Audio Controls */}
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
