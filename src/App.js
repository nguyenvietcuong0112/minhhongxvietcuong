import React, { useState } from 'react';
import './App.css';
import { DEFAULT_INVITATION_DATA } from './config/weddingData';
import AudioPlayer from './components/AudioPlayer';
import WeddingInvitationView from './components/Invitation/WeddingInvitationView';

/**
 * App: Main Entry Point
 * Exclusively displays the Interactive Online Wedding Invitation Suite
 * for Việt Cường & Minh Hồng (26.12.2026 Lễ Ăn Hỏi & 27.12.2026 Đại Lễ Thành Hôn).
 * Legacy Lễ Dạm Ngõ presentation has been completely deactivated.
 */
function App() {
  const [audioPlaying, setAudioPlaying] = useState(false);

  return (
    <div className="app-invitation-container">
      {/* Interactive Online Wedding Invitation */}
      <WeddingInvitationView
        invitationData={DEFAULT_INVITATION_DATA}
        audioPlaying={audioPlaying}
        onToggleAudio={() => setAudioPlaying((prev) => !prev)}
      />

      {/* Background Wedding Music Player ("Dắt Anh Về Nhà") */}
      <AudioPlayer
        isPlaying={audioPlaying}
        musicUrl={DEFAULT_INVITATION_DATA.musicUrl}
      />
    </div>
  );
}

export default App;
