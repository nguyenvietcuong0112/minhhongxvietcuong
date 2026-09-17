import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import {
  THEMES,
  ORNAMENTS,
  loadWeddingData,
  saveWeddingData,
  DEFAULT_WEDDING_DATA,
} from './config/weddingData';
import CeremonyStage from './components/CeremonyStage';
import AudioPlayer from './components/AudioPlayer';
import ControlBar from './components/ControlBar';
import SettingsModal from './components/SettingsModal';

function App() {
  const [data, setData] = useState(() => {
    const loaded = loadWeddingData();
    const params = new URLSearchParams(window.location.search);
    const qTheme = params.get('theme');
    const qMode = params.get('mode');
    const qFont = params.get('font');
    const qOrnament = params.get('ornament');
    if (qTheme && THEMES[qTheme]) loaded.theme = qTheme;
    if (qMode) loaded.layoutMode = qMode;
    if (qFont) loaded.fontFamily = qFont;
    if (qOrnament && ORNAMENTS[qOrnament]) loaded.ornament = qOrnament;
    return loaded;
  });
  const [themeId, setThemeId] = useState(() => {
    const qTheme = new URLSearchParams(window.location.search).get('theme');
    return (qTheme && THEMES[qTheme]) ? qTheme : (data.theme || 'deepRose');
  });
  const [layoutMode, setLayoutMode] = useState(() => {
    const qMode = new URLSearchParams(window.location.search).get('mode');
    return qMode || data.layoutMode || 'duo';
  });
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasStartedInteracting, setHasStartedInteracting] = useState(false);

  const [isSlideshow, setIsSlideshow] = useState(() => {
    const qSlideshow = new URLSearchParams(window.location.search).get('slideshow');
    if (qSlideshow !== null) return qSlideshow === 'true';
    return !!data.autoAlternate;
  });

  const activeTheme = THEMES[themeId] || THEMES.ivoryLotus;

  // Toggle between themes (deepRose <-> royalRed <-> ivoryLotus)
  const toggleTheme = useCallback(() => {
    const themeKeys = Object.keys(THEMES);
    const nextIdx = (themeKeys.indexOf(themeId) + 1) % themeKeys.length;
    const nextThemeId = themeKeys[nextIdx];
    setThemeId(nextThemeId);
    const updated = { ...data, theme: nextThemeId };
    setData(updated);
    saveWeddingData(updated);
  }, [themeId, data]);

  // Toggle layout mode between 'center' and 'duo' (pauses slideshow so user stays on chosen view)
  const toggleLayoutMode = useCallback(() => {
    setIsSlideshow(false);
    const nextMode = layoutMode === 'center' ? 'duo' : 'center';
    setLayoutMode(nextMode);
    const updated = { ...data, layoutMode: nextMode, autoAlternate: false };
    setData(updated);
    saveWeddingData(updated);
  }, [layoutMode, data]);

  // Toggle Slideshow auto-presentation
  const toggleSlideshow = useCallback(() => {
    setIsSlideshow((prev) => {
      const nextVal = !prev;
      const updated = { ...data, autoAlternate: nextVal };
      setData(updated);
      saveWeddingData(updated);
      return nextVal;
    });
  }, [data]);

  // 1-Click Launch Fullscreen, YouTube Audio & Auto-Slideshow for TV
  const handleStartPresentation = () => {
    setHasStartedInteracting(true);
    setAudioPlaying(true);
    setIsSlideshow(true);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  // Toggle Font: Dancing Script <-> Charm
  const toggleFont = useCallback(() => {
    setData((prev) => {
      const nextFont = prev.fontFamily === 'charm' ? 'dancing' : 'charm';
      const updated = { ...prev, fontFamily: nextFont };
      saveWeddingData(updated);
      return updated;
    });
  }, []);

  // Toggle Ornament: Lotus <-> Real Flowers <-> Minimal
  const toggleOrnament = useCallback(() => {
    const keys = Object.keys(ORNAMENTS);
    setData((prev) => {
      const current = prev.ornament || 'lotus';
      const nextIdx = (keys.indexOf(current) + 1) % keys.length;
      const nextOrnament = keys[nextIdx];
      const updated = { ...prev, ornament: nextOrnament };
      saveWeddingData(updated);
      return updated;
    });
  }, []);

  const handleOrnamentChange = useCallback((newOrnament) => {
    if (!ORNAMENTS[newOrnament]) return;
    setData((prev) => {
      const updated = { ...prev, ornament: newOrnament };
      saveWeddingData(updated);
      return updated;
    });
  }, []);

  // Keyboard shortcuts: T (theme), V (view), S (slideshow), P (font), O (ornament), M (music), F (fullscreen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      } else if (e.key === 'v' || e.key === 'V') {
        toggleLayoutMode();
      } else if (e.key === 's' || e.key === 'S') {
        toggleSlideshow();
      } else if (e.key === 'p' || e.key === 'P') {
        toggleFont();
      } else if (e.key === 'o' || e.key === 'O') {
        toggleOrnament();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, toggleLayoutMode, toggleSlideshow, toggleFont, toggleOrnament]);

  const handleSaveData = (newData) => {
    setData(newData);
    if (newData.theme && newData.theme !== themeId) {
      setThemeId(newData.theme);
    }
    saveWeddingData(newData);
  };

  const handleResetData = () => {
    setData(DEFAULT_WEDDING_DATA);
    setThemeId(DEFAULT_WEDDING_DATA.theme);
    setLayoutMode(DEFAULT_WEDDING_DATA.layoutMode);
    saveWeddingData(DEFAULT_WEDDING_DATA);
  };

  const handleThemeChange = (newThemeId) => {
    setThemeId(newThemeId);
    const updated = { ...data, theme: newThemeId };
    setData(updated);
    saveWeddingData(updated);
  };

  return (
    <div
      className={`app-container theme-${themeId}`}
      style={{
        background: activeTheme.bg,
        color: activeTheme.textColor,
      }}
      onClick={() => {
        if (!hasStartedInteracting) {
          handleStartPresentation();
        }
      }}
    >
      {/* Ambient Warm Center Spotlight */}
      <div className="modern-ambient-light" />

      {/* Modern Wedding Ceremony Stage */}
      <CeremonyStage
        data={data}
        theme={activeTheme}
        layoutMode={layoutMode}
        isSlideshow={isSlideshow}
      />

      {/* YouTube Wedding Music Player */}
      <AudioPlayer
        isPlaying={audioPlaying}
        musicUrl={data.musicUrl}
      />

      {/* TV Screen 1-Click Launch Floating Badge (Does not block backdrop) */}
      {!hasStartedInteracting && (
        <div className="launch-tv-badge" onClick={handleStartPresentation}>
          <span className="badge-pulse-icon">✨</span>
          <span className="badge-text">Chạm bất kỳ để Bật Toàn Màn Hình TV, Nhạc Nền & Trình Chiếu</span>
          <button className="badge-action-btn">Bắt Đầu 🎵</button>
        </div>
      )}

      {/* Auto-Hiding Bottom Floating Control Dock */}
      <ControlBar
        currentThemeId={themeId}
        setThemeId={handleThemeChange}
        onToggleTheme={toggleTheme}
        layoutMode={layoutMode}
        onToggleLayout={toggleLayoutMode}
        isSlideshow={isSlideshow}
        onToggleSlideshow={toggleSlideshow}
        fontFamily={data.fontFamily || 'dancing'}
        onToggleFont={toggleFont}
        ornament={data.ornament || 'lotus'}
        onSelectOrnament={handleOrnamentChange}
        onToggleOrnament={toggleOrnament}
        audioPlaying={audioPlaying}
        setAudioPlaying={setAudioPlaying}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Live Customization Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}

export default App;
