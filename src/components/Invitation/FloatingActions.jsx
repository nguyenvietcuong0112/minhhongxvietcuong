import React, { useState } from 'react';

/**
 * FloatingActions:
 * 1. Fixed floating spinning music disc (top right)
 * 2. Fixed floating bouncing gift button (bottom right)
 * 3. Modal Gift with VietQR & 1-click copy STK
 * Matches the exact floating UI behavior of baoquyenwedding.net
 */
const FloatingActions = ({
  audioPlaying,
  onToggleAudio,
  groom,
  bride,
  songTitle = 'Dắt Anh Về Nhà',
}) => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [activeGiftTab, setActiveGiftTab] = useState('groom'); // 'groom' or 'bride'
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }).catch(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  const currentPerson = activeGiftTab === 'groom' ? groom : bride;

  return (
    <>
      {/* 1. Floating Music Button (Fixed Top-Right) */}
      <div className="floating-music-module">
        <button
          type="button"
          className={`floating-music-disc-btn ${audioPlaying ? 'is-playing' : 'is-paused'}`}
          onClick={onToggleAudio}
          title={audioPlaying ? `Tắt nhạc: ${songTitle}` : `Bật nhạc: ${songTitle}`}
          aria-label="Bật/Tắt nhạc nền"
        >
          {/* Vinyl Grooves & Spinning Center with Royal Song Hỷ */}
          <div className="vinyl-disc-face">
            <span className="vinyl-groove" />
            <span className="vinyl-groove-2" />
            <div className="vinyl-center-label royal-vinyl-center">
              <span className="vinyl-hy-center">{audioPlaying ? '囍' : '🔇'}</span>
            </div>
          </div>
          {audioPlaying && (
            <>
              <span className="music-pulse-ring ring-1" />
              <span className="music-pulse-ring ring-2" />
            </>
          )}
        </button>
      </div>

      {/* 2. Floating Gift Button (Fixed Bottom-Right) */}
      <div className="floating-gift-module">
        <button
          type="button"
          className="floating-gift-btn animate-bounce"
          onClick={() => setIsGiftModalOpen(true)}
          title="Hộp mừng cưới (Gửi quà & QR)"
          aria-label="Mở hộp mừng cưới"
        >
          <span className="gift-btn-icon">🎁</span>
          <span className="gift-btn-tooltip">Mừng Cưới</span>
        </button>
      </div>

      {/* 3. Gift Modal Popup */}
      {isGiftModalOpen && (
        <div
          className="gift-modal-backdrop"
          onClick={() => setIsGiftModalOpen(false)}
        >
          <div
            className="gift-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="gift-modal-close-btn"
              onClick={() => setIsGiftModalOpen(false)}
              aria-label="Đóng hộp mừng cưới"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="gift-modal-header">
              <span className="modal-gift-icon">🎁</span>
              <h3 className="gift-modal-title">Hộp Mừng Cưới</h3>
              <p className="gift-modal-desc">
                Cảm ơn tình cảm và lời chúc phúc của quý khách dành cho hai vợ chồng!
              </p>
            </div>

            {/* Groom / Bride Switcher Tabs */}
            <div className="gift-modal-tabs">
              <button
                type="button"
                className={`modal-tab-btn ${activeGiftTab === 'groom' ? 'active' : ''}`}
                onClick={() => setActiveGiftTab('groom')}
              >
                <span>👑 Chú Rể</span>
                <span className="tab-person-name">({groom?.shortName || 'Việt Cường'})</span>
              </button>
              <button
                type="button"
                className={`modal-tab-btn ${activeGiftTab === 'bride' ? 'active' : ''}`}
                onClick={() => setActiveGiftTab('bride')}
              >
                <span>🌸 Cô Dâu</span>
                <span className="tab-person-name">({bride?.shortName || 'Minh Hồng'})</span>
              </button>
            </div>

            {/* QR Code & Banking Card Details */}
            <div className="gift-modal-body">
              <div className="gift-modal-qr-frame">
                <img
                  src={currentPerson?.qrUrl}
                  alt={`VietQR ${currentPerson?.fullName}`}
                  className="gift-modal-qr-img"
                  loading="lazy"
                />
              </div>

              <div className="gift-modal-bank-info">
                <p className="modal-bank-line">
                  Ngân hàng: <strong>{currentPerson?.bank}</strong>
                </p>
                <p className="modal-stk-line">
                  Số tài khoản: <strong className="stk-number">{currentPerson?.accountNumber}</strong>
                </p>
                <p className="modal-holder-line">
                  Chủ tài khoản: <strong>{currentPerson?.accountName}</strong>
                </p>
              </div>

              {/* Action Buttons: 1-Click Copy STK & Download QR */}
              <div className="gift-modal-actions">
                <button
                  type="button"
                  className={`modal-copy-btn ${copiedKey === activeGiftTab ? 'copied' : ''}`}
                  onClick={() => handleCopy(currentPerson?.accountNumber, activeGiftTab)}
                >
                  {copiedKey === activeGiftTab ? '✓ Đã sao chép STK!' : '📋 Sao Chép Số Tài Khoản'}
                </button>

                {currentPerson?.qrUrl && (
                  <a
                    href={currentPerson.qrUrl}
                    download={`VietQR_MungCuoi_${currentPerson.shortName}.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-download-qr-btn"
                  >
                    <span>📥 Tải Mã QR Về Máy</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActions;
