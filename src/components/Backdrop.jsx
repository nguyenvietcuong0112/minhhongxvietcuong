import React from 'react';
import {
  RoyalCornerOrnament,
  DoubleHappinessSymbol,
  DividerFlourish,
} from './Ornaments';

/**
 * Backdrop: The primary ceremonial screen for projection on TV / LED screen.
 * Designed with balanced optical proportions for 16:9 widescreen formats.
 */
const Backdrop = ({ data, theme }) => {
  return (
    <div className="backdrop-stage">
      {/* 4 Palace Corner Flourishes */}
      <RoyalCornerOrnament position="top-left" />
      <RoyalCornerOrnament position="top-right" />
      <RoyalCornerOrnament position="bottom-left" />
      <RoyalCornerOrnament position="bottom-right" />

      {/* Decorative Outer Border Arch */}
      <div className="ceremonial-frame-outer">
        <div className="ceremonial-frame-inner" />
      </div>

      {/* Main Ceremony Content */}
      <div className="backdrop-center-content">
        {/* Top Tag / Subtitle */}
        <div className="ceremony-top-badge">
          <span className="badge-line" />
          <span className="badge-text">TRĂM NĂM HẠNH PHÚC</span>
          <span className="badge-line" />
        </div>

        {/* Ceremony Title (e.g. LỄ DẠM NGÕ) */}
        <h1 className="ceremony-main-title">
          {data.ceremonyTitle}
        </h1>

        {/* Central Double Happiness Medallion 囍 */}
        <div className="medallion-wrapper">
          <DoubleHappinessSymbol size={130} />
        </div>

        {/* Couple Names Presentation */}
        <div className="couple-names-container">
          <div className="groom-name-block">
            <span className="person-name">{data.groomName}</span>
          </div>

          <div className="names-connector">
            <span className="connector-ampersand">&</span>
          </div>

          <div className="bride-name-block">
            <span className="person-name">{data.brideName}</span>
          </div>
        </div>

        {/* Decorative Divider Flourish */}
        <DividerFlourish width="420px" />

        {/* Date & Location Section */}
        <div className="ceremony-details">
          {/* Solar Calendar */}
          <div className="date-solar">
            <span className="calendar-icon">✦</span>
            <span className="date-solar-text">{data.dateSolar}</span>
            <span className="calendar-icon">✦</span>
          </div>

          {/* Lunar Calendar */}
          <div className="date-lunar">
            ({data.dateLunar})
          </div>

          {/* Location / House */}
          {data.location && (
            <div className="ceremony-location">
              <span className="location-pin">❖</span>
              <span>{data.location}</span>
            </div>
          )}
        </div>

        {/* Meaningful Wish / Couplet */}
        {data.meaningfulQuote && (
          <div className="ceremony-quote">
            “{data.meaningfulQuote}”
          </div>
        )}
      </div>
    </div>
  );
};

export default Backdrop;
