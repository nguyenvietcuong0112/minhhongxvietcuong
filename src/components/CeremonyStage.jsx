import React, { useState, useEffect } from 'react';
import { ModernKnotHappinessSymbol, WatercolorLotusCorner } from './ModernLotusOrnaments';

/**
 * CeremonyStage: Modern, minimalist, aesthetic wedding backdrop
 * inspired directly by trending Pinterest/TikTok Vietnamese wedding ceremonies.
 * Features clean typography (Oswald & Dancing Script signature), watercolor lotus accents,
 * and smooth animated thank-you messages.
 */
const CeremonyStage = ({ data, theme, layoutMode }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isTextFading, setIsTextFading] = useState(false);
  const [isPhotoFading, setIsPhotoFading] = useState(false);

  const messages = data.messages || [];
  const photos = data.photos || [];

  // 1. Text Animation: Cycle through thank you & blessings every 6.5s
  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setIsTextFading(true);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTextFading(false);
      }, 500);
    }, 6500);
    return () => clearInterval(interval);
  }, [messages.length]);

  // 2. Photo Animation: Cycle through photos in duo layout every 8s
  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setIsPhotoFading(true);
      setTimeout(() => {
        setPhotoIndex((prev) => (prev + 1) % photos.length);
        setIsPhotoFading(false);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const currentMessage = messages[messageIndex] || messages[0];
  const currentPhoto = photos[photoIndex] || photos[0];

  const isDuo = layoutMode === 'duo';

  return (
    <div className={`modern-stage-container ${isDuo ? 'layout-duo' : 'layout-center'}`}>
      {/* Watercolor Lotus Leaves & White Lotus Blossoms at bottom corners */}
      <WatercolorLotusCorner position="bottom-left" />
      <WatercolorLotusCorner position="bottom-right" />

      {/* Subtle Background Watermark 囍 (Faint & Elegant) */}
      <div className="bg-watermark-happiness">
        <ModernKnotHappinessSymbol size={380} color="currentColor" />
      </div>

      {/* MAIN PRESENTATION CONTENT */}
      {!isDuo ? (
        /* =========================================================================
           MODE 1: CENTERED SIGNATURE LANDSCAPE (Exact match to Reference 2: Đình Kiên - Thu Hường)
           ========================================================================= */
        <div className="modern-center-stage">
          {/* Top Title */}
          <div className="modern-title-header">
            <h1 className="modern-ceremony-title">{data.ceremonyTitle}</h1>
          </div>

          {/* Centerpiece: Groom Name — 囍 Endless Knot — Bride Name */}
          <div className="modern-names-row">
            <div className="modern-groom-name">{data.groomName}</div>

            <div className="modern-knot-symbol">
              <ModernKnotHappinessSymbol
                size={110}
                color={theme.knotColor || theme.accentColor}
              />
            </div>

            <div className="modern-bride-name">{data.brideName}</div>
          </div>

          {/* Animated Thank-you & Blessing message in delicate italic */}
          <div className="modern-message-wrapper">
            <div className={`modern-message-text ${isTextFading ? 'fading' : 'visible'}`}>
              {currentMessage}
            </div>
          </div>

          {/* Bottom Date in Modern Condensed Font */}
          <div className="modern-date-footer">
            <span className="modern-solar-date">{data.dateSolar}</span>
            <span className="modern-lunar-date">{data.dateLunar}</span>
          </div>
        </div>
      ) : (
        /* =========================================================================
           MODE 2: EDITORIAL DUO WITH ARCH PHOTO (Exact match to Reference 3)
           ========================================================================= */
        <div className="modern-duo-stage">
          {/* Left Column: Stacked Signature Names & Animated Message */}
          <div className="modern-duo-left">
            <div className="modern-stacked-names">
              <div className="stacked-groom">{data.groomName}</div>
              <div className="stacked-ampersand">&</div>
              <div className="stacked-bride">{data.brideName}</div>
            </div>

            <div className="modern-duo-message">
              <div className={`modern-message-text ${isTextFading ? 'fading' : 'visible'}`}>
                {currentMessage}
              </div>
            </div>
          </div>

          {/* Right Column: Modern Minimalist Arch holding couple photo */}
          <div className="modern-duo-right">
            <div className="modern-arch-frame">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption || 'Việt Cường & Minh Hồng'}
                className={`modern-arch-img ${isPhotoFading ? 'fading' : ''}`}
                loading="eager"
              />
              <div className="modern-arch-tag">
                <div className="arch-tag-title">{data.ceremonyTitle}</div>
                <div className="arch-tag-symbol">
                  <ModernKnotHappinessSymbol size={48} color="#FFFFFF" />
                </div>
                <div className="arch-tag-date">{data.dateSolar}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CeremonyStage;
