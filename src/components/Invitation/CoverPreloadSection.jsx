import React, { useState, useMemo } from 'react';

/**
 * CoverPreloadSection: Imperial Song Phụng & Song Hỷ Luxury Wedding Invitation Cover
 * Enhanced beyond ChungDoi:
 * - Velvet wine red radial gradient background (#7d0002 -> #4a0001 -> #250000)
 * - 14 Floating Song Hỷ 囍 characters with gentle sway & golden stardust
 * - Double gold hairline framed ivory parchment card
 * - Corner Song Phụng (Phoenix) & Hoa Mẫu Đơn watercolor illustrations
 * - 3D embossed Imperial Red Wax Seal with golden Song Hỷ medallion
 * - Calligraphic couple names with gold flourish
 * - Personalized guest invitation badge
 * - Shimmering royal lacquer "Mở thiệp cưới" button with sweeping shine ray
 */
const CoverPreloadSection = ({ data, onOpen, isOpened, guestName = '' }) => {
  const [opening, setOpening] = useState(false);

  // Generate 14 deterministic ambient rising Song Hỷ characters
  const floatingHyList = useMemo(() => {
    return [
      { left: 6, size: 18, color: 'rgba(255, 240, 231, 0.45)', sway: 12, duration: 22, delay: -4 },
      { left: 16, size: 24, color: 'rgba(245, 208, 97, 0.4)', sway: -18, duration: 24, delay: -11 },
      { left: 26, size: 14, color: 'rgba(255, 215, 0, 0.35)', sway: 15, duration: 20, delay: -7 },
      { left: 34, size: 20, color: 'rgba(255, 240, 231, 0.3)', sway: -10, duration: 25, delay: -16 },
      { left: 45, size: 16, color: 'rgba(218, 165, 32, 0.35)', sway: 14, duration: 21, delay: -3 },
      { left: 55, size: 22, color: 'rgba(255, 240, 231, 0.38)', sway: -16, duration: 23, delay: -13 },
      { left: 64, size: 15, color: 'rgba(245, 208, 97, 0.42)', sway: 11, duration: 19, delay: -8 },
      { left: 73, size: 26, color: 'rgba(255, 240, 231, 0.32)', sway: -20, duration: 26, delay: -18 },
      { left: 82, size: 17, color: 'rgba(255, 215, 0, 0.38)', sway: 16, duration: 22, delay: -5 },
      { left: 91, size: 21, color: 'rgba(255, 240, 231, 0.4)', sway: -14, duration: 24, delay: -12 },
      { left: 11, size: 13, color: 'rgba(245, 208, 97, 0.3)', sway: 9, duration: 18, delay: -2 },
      { left: 88, size: 15, color: 'rgba(255, 240, 231, 0.35)', sway: -12, duration: 21, delay: -9 },
    ];
  }, []);

  const handleOpen = () => {
    if (opening || isOpened) return;
    setOpening(true);
    setTimeout(() => {
      onOpen();
    }, 950);
  };

  const groom = data?.groom || {};
  const bride = data?.bride || {};

  return (
    <div className={`preload-cover-screen ${isOpened ? 'preload-hidden' : ''} ${opening ? 'preload-opening' : ''}`}>
      {/* 1. Deep Wine Red Velvet Gradient with Subtle Ken Burns photo */}
      <div className="preload-bg-cover">
        <img
          src={process.env.PUBLIC_URL + '/anh6.jpg'}
          alt="Việt Cường & Minh Hồng"
          className="preload-kenburns-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = process.env.PUBLIC_URL + '/anh1.jpg';
          }}
        />
        <div className="preload-royal-red-overlay" />
      </div>

      {/* 2. Floating Ambient Song Hỷ 囍 Characters */}
      <div className="preload-ambient-hy-container">
        {floatingHyList.map((item, idx) => (
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
            囍
          </div>
        ))}
      </div>

      {/* 3. Golden Stardust Sparkles */}
      <div className="preload-stardust-layer">
        <span className="gold-sparkle sp-1" />
        <span className="gold-sparkle sp-2" />
        <span className="gold-sparkle sp-3" />
        <span className="gold-sparkle sp-4" />
        <span className="gold-sparkle sp-5" />
      </div>

      {/* 4. Centered Royal Song Phụng Card Container */}
      <div className="preload-container">
        <div className="preload-royal-card" onClick={handleOpen}>
          {/* Corner Song Phụng & Hoa Watercolor Ornaments */}
          <div className="preload-phuong-ornament top-left">
            <img
              src={process.env.PUBLIC_URL + '/assets/songphung/Phuong.webp'}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="preload-phuong-ornament bottom-right">
            <img
              src={process.env.PUBLIC_URL + '/assets/songphung/Phuong.webp'}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="preload-hoa-ornament top-right">
            <img
              src={process.env.PUBLIC_URL + '/assets/songphung/HOA.webp'}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="preload-hoa-ornament bottom-left">
            <img
              src={process.env.PUBLIC_URL + '/assets/songphung/HOA.webp'}
              alt=""
              aria-hidden="true"
            />
          </div>

          {/* Double Gold Hairline Border */}
          <div className="preload-gold-double-border" />

          {/* Top 3D Embossed Wax Seal with Song Hỷ Medallion */}
          <div className="preload-royal-wax-seal" title="Chạm để mở thiệp cưới">
            <div className="seal-emblem-wrap">
              <img
                src={process.env.PUBLIC_URL + '/assets/songphung/chinese_happiness.webp'}
                alt="囍"
                className="seal-hy-icon"
              />
            </div>
            <span className="seal-pulse-glow" />
          </div>

          {/* Content Inside Royal Card */}
          <div className="preload-card-inner">
            {/* Wedding Title Header */}
            <div className="preload-header-badge">
              <span className="badge-flourish">❖</span>
              <span className="badge-title-text">THIỆP MỜI THÀNH HÔN</span>
              <span className="badge-flourish">❖</span>
            </div>

            {/* Couple Full Names */}
            <div className="preload-names-block">
              <h1 className="preload-groom-name">{groom.fullName || 'Nguyễn Việt Cường'}</h1>
              <div className="preload-ampersand-wrap">
                <span className="ampersand-line" />
                <span className="ampersand-text">&</span>
                <span className="ampersand-line" />
              </div>
              <h1 className="preload-bride-name">{bride.fullName || 'Trần Minh Hồng'}</h1>
            </div>

            {/* Traditional Decorative Divider */}
            <div className="preload-gold-divider">
              <span className="div-line" />
              <span className="div-icon">❦</span>
              <span className="div-line" />
            </div>

            {/* Wedding Date Box with Gold Framing */}
            <div className="preload-date-box">
              <div className="preload-hour-day">CHỦ NHẬT • 09:30 SÁNG</div>
              <div className="preload-solar-date">27 THÁNG 12, 2026</div>
              <div className="preload-lunar-date">(Tức ngày 19 tháng 11 năm Bính Ngọ)</div>
            </div>

            {/* Personalized Guest Badge */}
            <div className="preload-guest-badge">
              <span className="guest-badge-prefix">Kính Mời</span>
              <strong className="guest-badge-name">
                {guestName ? guestName : 'Quý Khách & Gia Đình'}
              </strong>
            </div>

            {/* 2-Day Ceremony Summary */}
            <div className="preload-location-summary">
              <p className="location-heading">Hôn Lễ: 26 & 27 Tháng 12, 2026</p>
              <p className="location-sub">Tư Gia Nhà Gái & Nhà Trai — Hà Nội</p>
            </div>

            {/* Shimmering Royal CTA Button */}
            <div className="preload-cta-btn-wrap">
              <button
                type="button"
                className="preload-royal-open-btn"
                onClick={handleOpen}
                aria-label="Mở thiệp cưới"
              >
                <span className="btn-label-text">Mở thiệp cưới</span>
                <span className="btn-arrow-icon">⟶</span>
                <div className="royal-shine-beam" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Hint Below */}
        <p className="preload-open-hint">
          <span className="hint-arrow animate-bounce">↓</span>
          Chạm vào thiệp để mở lời chúc mừng
        </p>
      </div>
    </div>
  );
};

export default CoverPreloadSection;
