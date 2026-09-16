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
    return (qTheme && THEMES[qTheme]) ? qTheme : (data.theme || 'ivoryLotus');
  });
  const [layoutMode, setLayoutMode] = useState(() => {
    const qMode = new URLSearchParams(window.location.search).get('mode');
    return qMode || data.layoutMode || 'center';
  });
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasStartedInteracting, setHasStartedInteracting] = useState(false);

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

  // Toggle layout mode between 'center' and 'duo'
  const toggleLayoutMode = useCallback(() => {
    const nextMode = layoutMode === 'center' ? 'duo' : 'center';
    setLayoutMode(nextMode);
    const updated = { ...data, layoutMode: nextMode };
    setData(updated);
    saveWeddingData(updated);
  }, [layoutMode, data]);

  // Auto-alternate layout every 14 seconds if autoAlternate is enabled
  useEffect(() => {
    if (!data.autoAlternate) return;
    const interval = setInterval(() => {
      setLayoutMode((prev) => (prev === 'center' ? 'duo' : 'center'));
    }, 14000);
    return () => clearInterval(interval);
  }, [data.autoAlternate]);

  // 1-Click Launch Fullscreen & YouTube Audio for TV
  const handleStartPresentation = () => {
    setHasStartedInteracting(true);
    setAudioPlaying(true);
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

  // Toggle Ornament: Orchids <-> Fans <-> Botanical <-> Minimal <-> Lotus
  const toggleOrnament = useCallback(() => {
    const keys = Object.keys(ORNAMENTS);
    setData((prev) => {
      const current = prev.ornament || 'orchids';
      const nextIdx = (keys.indexOf(current) + 1) % keys.length;
      const nextOrnament = keys[nextIdx];
      const updated = { ...prev, ornament: nextOrnament };
      saveWeddingData(updated);
      return updated;
    });
  }, []);

  // Keyboard shortcuts: T for theme, V for view mode, P for font, O for ornament, M for music, F for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      } else if (e.key === 'v' || e.key === 'V') {
        toggleLayoutMode();
      } else if (e.key === 'p' || e.key === 'P') {
        toggleFont();
      } else if (e.key === 'o' || e.key === 'O') {
        toggleOrnament();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, toggleLayoutMode, toggleFont, toggleOrnament]);

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
          <span className="badge-text">Chạm bất kỳ để Bật Toàn Màn Hình TV & Nhạc Nền</span>
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
        fontFamily={data.fontFamily || 'dancing'}
        onToggleFont={toggleFont}
        ornament={data.ornament || 'orchids'}
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
