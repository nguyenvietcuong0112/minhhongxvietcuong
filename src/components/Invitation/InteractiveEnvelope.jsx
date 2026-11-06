import React, { useState } from 'react';

/**
 * InteractiveEnvelope: 3D Wax Seal Envelope Opening Ceremony
 * The guest taps the 3D monogram wax seal or "Mở Thiệp",
 * the wax breaks, flap folds open, and the wedding suite reveals itself.
 */
const InteractiveEnvelope = ({ data, onOpen, isOpened, guestName = '' }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening || isOpened) return;
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className={`envelope-screen-overlay ${isOpened ? 'envelope-hidden' : ''} ${opening ? 'envelope-opening' : ''}`}>
      <div className="envelope-ambient-glow" />

      {/* Decorative floating flower petals / sparkle lights */}
      <div className="envelope-floating-particles">
        <span className="petal p1" />
        <span className="petal p2" />
        <span className="petal p3" />
        <span className="petal p4" />
      </div>

      <div className="envelope-center-wrapper">
        <p className="envelope-pretitle">
          {guestName ? `KÍNH GỬI: ${guestName.toUpperCase()}` : 'TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH ĐẾN DỰ HÔN LỄ'}
        </p>
        
        {/* Main 3D Envelope Box */}
        <div className={`envelope-3d-box ${opening ? 'open' : ''}`} onClick={handleOpen}>
          {/* Back fold */}
          <div className="envelope-fold back" />

          {/* Letter preview sliding out */}
          <div className="envelope-letter-card">
            <div className="letter-header-decor">囍</div>
            {guestName && (
              <p className="letter-guest-to">Kính mời: <strong>{guestName}</strong></p>
            )}
            <div className="letter-couple-names">
              <span>{data.groom?.shortName || 'Việt Cường'}</span>
              <span className="letter-amp">&</span>
              <span>{data.bride?.shortName || 'Minh Hồng'}</span>
            </div>
            <p className="letter-wedding-date">26 • 27 THÁNG 12, 2026</p>
          </div>

          {/* Left and Right folds */}
          <div className="envelope-fold left" />
          <div className="envelope-fold right" />
          <div className="envelope-fold bottom" />

          {/* Top Flap that rotates open */}
          <div className="envelope-flap top" />

          {/* Golden Ribbon Band */}
          <div className="envelope-ribbon-band" />

          {/* 3D Wax Seal with Monogram */}
          <div className="envelope-wax-seal" title="Chạm để mở thiệp cưới">
            <div className="wax-seal-outer-rim">
              <div className="wax-seal-inner-circle">
                <div className="wax-seal-monogram">
                  <span className="monogram-text">VC</span>
                  <span className="monogram-heart">♥</span>
                  <span className="monogram-text">MH</span>
                </div>
              </div>
            </div>
            <div className="wax-sparkle-flare" />
          </div>
        </div>

        {/* Prompt to Tap */}
        <button
          type="button"
          className="envelope-open-action-btn"
          onClick={handleOpen}
        >
          <span className="open-icon">💌</span>
          <span className="open-text">CHẠM ĐỂ MỞ THIỆP CƯỚI</span>
          <span className="open-arrow">✨</span>
        </button>

        <p className="envelope-sub-hint">Bấm vào con dấu sáp hoặc nút trên để mở thiệp</p>
      </div>
    </div>
  );
};

export default InteractiveEnvelope;
