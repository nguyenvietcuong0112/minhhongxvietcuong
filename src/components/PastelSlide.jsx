import React from 'react';
import { RoyalCornerOrnament, DoubleHappinessSymbol, DividerFlourish } from './Ornaments';

/**
 * PastelSlide: Balanced side-by-side presentation of couple photo & designed typography.
 * Fits perfectly on TV screens and landscape monitors with zero text clipping.
 */
const PastelSlide = ({ slide, data }) => {
  const isLeftPhoto = slide.layout === 'left-photo';

  return (
    <div className={`pastel-slide-container ${isLeftPhoto ? 'layout-left' : 'layout-right'}`}>
      {/* 4 Corner Flourishes */}
      <RoyalCornerOrnament position="top-left" />
      <RoyalCornerOrnament position="top-right" />
      <RoyalCornerOrnament position="bottom-left" />
      <RoyalCornerOrnament position="bottom-right" />

      {/* Ceremonial Double Gold & Rose Border */}
      <div className="pastel-frame-outer">
        <div className="pastel-frame-inner" />
      </div>

      {/* Main Content: Photo & Typography Card */}
      <div className="pastel-slide-content">
        {/* Photo Section */}
        <div className="pastel-photo-col">
          <div className="pastel-photo-arch-frame">
            <img
              src={slide.photoUrl}
              alt={slide.badge || 'Lễ Dạm Ngõ'}
              className="pastel-photo-img"
              loading="eager"
            />
            <div className="pastel-photo-overlay-border" />
          </div>
        </div>

        {/* Typography Card Section (Frosted Glass Ivory Panel) */}
        <div className="pastel-text-col">
          <div className="pastel-text-card">
            {/* Top Badge */}
            <div className="pastel-badge-wrapper">
              <span className="pastel-badge-dot">✦</span>
              <span className="pastel-badge-text">{slide.badge || 'DUYÊN THẮM TRẦU CAU'}</span>
              <span className="pastel-badge-dot">✦</span>
            </div>

            {/* Ceremony Title */}
            <h1 className="pastel-main-title">
              {data.ceremonyTitle || 'LỄ DẠM NGÕ'}
            </h1>

            {/* Clear, Bold Double Happiness Medallion 囍 */}
            <div className="pastel-happiness-wrapper">
              <DoubleHappinessSymbol size={68} />
            </div>

            {/* Couple Names */}
            <div className="pastel-names-block">
              <div className="pastel-person">
                <span className="pastel-role">CHÚ RỂ</span>
                <span className="pastel-name">{data.groomName}</span>
              </div>

              <div className="pastel-ampersand">&</div>

              <div className="pastel-person">
                <span className="pastel-role">CÔ DÂU</span>
                <span className="pastel-name">{data.brideName}</span>
              </div>
            </div>

            {/* Divider */}
            <DividerFlourish width="280px" />

            {/* Dates */}
            <div className="pastel-date-section">
              <div className="pastel-date-solar">
                <span className="pastel-solar-icon">✦</span>
                <span className="pastel-solar-text">{data.dateSolar}</span>
                <span className="pastel-solar-icon">✦</span>
              </div>
              <div className="pastel-date-lunar">
                {data.dateLunar}
              </div>
            </div>

            {/* Poetic Quote & Subtitle */}
            <div className="pastel-quote-section">
              <div className="pastel-quote-text">{slide.quote}</div>
              {slide.subtitle && (
                <div className="pastel-subtitle-text">{slide.subtitle}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastelSlide;
