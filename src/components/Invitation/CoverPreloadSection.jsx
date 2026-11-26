import React, { useState, useMemo } from 'react';

/**
 * CoverPreloadSection: Brown Luxury Editorial Envelope Opening Experience
 * - Deep Chocolate Brown (#35231F) parting curtains & textured paper surface
 * - Warm Ivory (#EDE3D5 / #F7F2EA) bespoke cardstock framed in Antique Gold (#C5A36A)
 * - Embossed Antique Gold & Mocha Wax Seal displaying couple initials (VC ♥ MH)
 * - Delicate sepia-tinted botanical foliage corners
 * - Champagne gold stardust & graceful curtain parting + petal burst animation
 */
const CoverPreloadSection = ({ data, onStartOpening, onOpen, isOpened, guestName = '' }) => {
  const [opening, setOpening] = useState(false);

  // Subtle floating champagne gold typography accents in backdrop
  const floatingAccents = useMemo(() => {
    return [
      { left: 8, char: '✦', size: 14, color: 'rgba(197, 163, 106, 0.42)', sway: 12, duration: 22, delay: -4 },
      { left: 18, char: '&', size: 22, color: 'rgba(210, 191, 169, 0.25)', sway: -16, duration: 25, delay: -11 },
      { left: 28, char: '✧', size: 13, color: 'rgba(197, 163, 106, 0.35)', sway: 14, duration: 20, delay: -7 },
      { left: 42, char: '✦', size: 12, color: 'rgba(237, 227, 213, 0.25)', sway: -10, duration: 24, delay: -15 },
      { left: 62, char: '✧', size: 15, color: 'rgba(197, 163, 106, 0.38)', sway: 11, duration: 21, delay: -8 },
      { left: 76, char: '&', size: 20, color: 'rgba(210, 191, 169, 0.22)', sway: -18, duration: 26, delay: -17 },
      { left: 86, char: '✦', size: 16, color: 'rgba(197, 163, 106, 0.4)', sway: 15, duration: 22, delay: -5 },
      { left: 93, char: '✧', size: 12, color: 'rgba(237, 227, 213, 0.3)', sway: -12, duration: 23, delay: -10 },
    ];
  }, []);

  // Champagne, antique gold petals & shimmering motes for opening burst
  const burstPetals = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 28) * Math.PI * 2 + (i % 2) * 0.12;
      const dist = 110 + (i % 4) * 58;
      const variant = i % 3 === 0 ? 'petal-gold' : i % 3 === 1 ? 'petal-champagne' : 'mote-sparkle';
      return {
        tx: `${Math.round(Math.cos(angle) * dist)}px`,
        ty: `${Math.round(Math.sin(angle) * dist - 26)}px`,
        rot: `${(i * 53) % 360}deg`,
        delay: `${(i % 6) * 42}ms`,
        variant,
      };
    });
  }, []);

  const handleOpen = (e) => {
    if (e) e.stopPropagation();
    if (opening || isOpened) return;
    setOpening(true);
    if (onStartOpening) onStartOpening();
    setTimeout(() => {
      onOpen();
    }, 1420);
  };

  const groom = data?.groom || {};
  const bride = data?.bride || {};

  return (
    <div className={`preload-cover-screen ${isOpened ? 'preload-hidden' : ''} ${opening ? 'preload-opening' : ''}`}>
      {/* 1. Parting Chocolate-Brown Luxury Curtains (Left & Right) */}
      <div className="imperial-curtain-panel curtain-left" aria-hidden="true">
        <div className="curtain-bg-photo">
          <img
            src={process.env.PUBLIC_URL + '/photos/HUY01351.jpg'}
            alt=""
            className="preload-kenburns-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = process.env.PUBLIC_URL + '/photos/HUY01657.jpg';
            }}
          />
          <div className="preload-chocolate-overlay" />
        </div>
        <div className="curtain-gold-trim trim-right" />
      </div>

      <div className="imperial-curtain-panel curtain-right" aria-hidden="true">
        <div className="curtain-bg-photo">
          <img
            src={process.env.PUBLIC_URL + '/photos/HUY01351.jpg'}
            alt=""
            className="preload-kenburns-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = process.env.PUBLIC_URL + '/photos/HUY01657.jpg';
            }}
          />
          <div className="preload-chocolate-overlay" />
        </div>
        <div className="curtain-gold-trim trim-left" />
      </div>

      {/* 2. Floating Champagne Gold Accents */}
      <div className="preload-ambient-hy-container" aria-hidden="true">
        {floatingAccents.map((item, idx) => (
          <div
            key={idx}
            className="preload-ambient-hy"
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              color: item.color,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              '--sway': `${item.sway}px`,
            }}
          >
            {item.char}
          </div>
        ))}
      </div>

      {/* 3. Antique Gold Stardust Layer */}
      <div className="preload-stardust-layer" aria-hidden="true">
        <span className="gold-sparkle sp-1" />
        <span className="gold-sparkle sp-2" />
        <span className="gold-sparkle sp-3" />
        <span className="gold-sparkle sp-4" />
        <span className="gold-sparkle sp-5" />
      </div>

      {/* 4. Opening Champagne Gold Light Veil, Dual Ripples & 28 Petals Burst */}
      {opening && (
        <div className="opening-burst-layer" aria-hidden="true">
          <div className="opening-light-veil" />
          <div className="opening-golden-ripple" />
          <div className="opening-golden-ripple secondary" />
          {burstPetals.map((p, idx) => (
            <span
              key={idx}
              className={`burst-petal ${p.variant}`}
              style={{
                '--tx': p.tx,
                '--ty': p.ty,
                '--rot': p.rot,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Centered Ivory Mocha Card Container */}
      <div className="preload-container" onClick={handleOpen}>
        <div className="preload-royal-card" onClick={handleOpen}>
          {/* Inner clipped layer for sepia botanical corners, silk sheen & V-flap fold */}
          <div className="preload-card-bg-clip" aria-hidden="true">
            <div className="preload-envelope-vfold" />
            <div className="preload-silk-ribbon" />
            <div className="card-satin-glint" />
            <div className="preload-botanical-corner top-left">
              <img
                src={process.env.PUBLIC_URL + '/assets/sakura/sakura_top_branch.png'}
                alt=""
              />
            </div>
            <div className="preload-botanical-corner bottom-right">
              <img
                src={process.env.PUBLIC_URL + '/assets/sakura/sakura_bottom_corner.png'}
                alt=""
              />
            </div>
          </div>

          {/* Double Champagne & Antique Gold Hairline Border */}
          <div className="preload-gold-double-border" />

          {/* Top 3D Embossed Antique Gold & Chocolate Wax Seal */}
          <div
            className={`preload-royal-wax-seal ${opening ? 'seal-breaking' : ''}`}
            title="Chạm để mở thiệp cưới"
          >
            <span className="seal-halo-ring" aria-hidden="true" />
            <div className="seal-emblem-wrap" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="12.5" cy="17.5" r="7" stroke="#35231F" strokeWidth="1.8" />
                <circle cx="19.5" cy="17.5" r="7" stroke="#35231F" strokeWidth="1.8" />
                <path
                  d="M16 9.6C16 9.6 18.8 7.1 20.5 8.5C21.8 9.6 20.8 11.7 16 14.3C11.2 11.7 10.2 9.6 11.5 8.5C13.2 7.1 16 9.6 16 9.6Z"
                  fill="#35231F"
                />
              </svg>
            </div>
          </div>

          {/* Content Inside Editorial Envelope Card */}
          <div className="preload-card-inner">
            <div className="preload-header-badge">
              <span className="badge-flourish">✦</span>
              <span className="badge-title-text">THE WEDDING INVITATION</span>
              <span className="badge-flourish">✦</span>
            </div>

            {/* Couple Full Names */}
            <div className="preload-names-block">
              <h1 className="preload-groom-name">{groom.fullName || 'Nguyễn Việt Cường'}</h1>
              <div className="preload-ampersand-wrap">
                <span className="ampersand-line" />
                <span className="ampersand-text">&amp;</span>
                <span className="ampersand-line" />
              </div>
              <h1 className="preload-bride-name">{bride.fullName || 'Lê Minh Hồng'}</h1>
            </div>

            {/* Thin Antique Gold Ornamental Divider */}
            <div className="preload-gold-divider">
              <span className="div-line" />
              <span className="div-icon">❦</span>
              <span className="div-line" />
            </div>

            {/* Editorial Wedding Date Block */}
            <div className="preload-date-box">
              <div className="preload-hour-day">TIỆC CƯỚI 2 NHÀ • THỨ BẢY 26.12 (16:30)</div>
              <div className="preload-solar-date">27 . 12 . 2026</div>
              <div className="preload-lunar-date">(Đón dâu 12:00 Chủ Nhật • 19 tháng 11 năm Bính Ngọ)</div>
            </div>

            {/* Personalized Guest Invitation */}
            <div className="preload-guest-badge">
              <span className="guest-badge-prefix">Trân Trọng Kính Mời</span>
              <strong className="guest-badge-name">
                {guestName ? guestName : 'Quý Khách & Gia Đình'}
              </strong>
            </div>

            {/* 2-Day Ceremony Summary */}
            <div className="preload-location-summary">
              <p className="location-heading">Tiệc Cưới 26.12 (16:30) • Thành Hôn 27.12 (12:00)</p>
              <p className="location-sub">Tư Gia Nhà Gái &amp; Nhà Trai — Hà Nội</p>
            </div>

            {/* Refined Chocolate-Brown CTA Button with Subtle Champagne Shine */}
            <div className="preload-cta-btn-wrap">
              <button
                type="button"
                className="preload-royal-open-btn"
                onClick={handleOpen}
                aria-label="Mở thiệp cưới"
              >
                <span className="btn-label-text">
                  {opening ? 'Đang mở thiệp...' : 'Mở Thiệp Cưới'}
                </span>
                <span className="btn-arrow-icon">⟶</span>
                <div className="royal-shine-beam" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Hint Below */}
        <p className="preload-open-hint">
          <span className="hint-arrow animate-bounce">↑</span>
          Chạm vào thiệp để mở lời mời trân trọng
        </p>
      </div>
    </div>
  );
};

export default CoverPreloadSection;
