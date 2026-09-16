import React, { useState, useEffect } from 'react';
import {
  ModernKnotHappinessSymbol,
  RoyalHappinessMedallion,
  WatercolorLotusCorner,
  GoldenBotanicalCorner,
} from './ModernLotusOrnaments';

/**
 * CeremonyStage: Modern, minimalist, aesthetic wedding backdrop
 * inspired directly by trending Pinterest/TikTok Vietnamese wedding ceremonies.
 * Features clean typography (Oswald & Dancing Script signature), watercolor lotus accents,
 * and smooth animated thank-you messages.
 */
const CeremonyStage = ({ data, theme, layoutMode }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [incomingPhotoIdx, setIncomingPhotoIdx] = useState(null);
  const [isTextFading, setIsTextFading] = useState(false);

  const messages = data.messages || [];
  const photos = data.photos || [];

  // 1. Text Animation: Cycle through thank you & blessings every 6.5s with silky dissolve
  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setIsTextFading(true);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTextFading(false);
      }, 700);
    }, 6500);
    return () => clearInterval(interval);
  }, [messages.length]);

  // 2. Photo Animation: Dual-layer smooth cinematic crossfade every 8s
  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      const nextIdx = (activePhotoIdx + 1) % photos.length;
      setIncomingPhotoIdx(nextIdx);
      setTimeout(() => {
        setActivePhotoIdx(nextIdx);
        setIncomingPhotoIdx(null);
      }, 1600); // 1.6s smooth crossfade
    }, 8000);
    return () => clearInterval(interval);
  }, [photos.length, activePhotoIdx]);

  const currentMessage = messages[messageIndex] || messages[0];
  const isDuo = layoutMode === 'duo';
  const isRoyal = theme.id === 'royalRed';

  // Render happiness emblem depending on theme
  const renderEmblem = (size = 110) => {
    if (isRoyal) {
      return <RoyalHappinessMedallion size={size} color={theme.accentColor} />;
    }
    return (
      <ModernKnotHappinessSymbol
        size={size}
        color={theme.knotColor || theme.accentColor}
      />
    );
  };

  return (
    <div className={`modern-stage-container ${isDuo ? 'layout-duo' : 'layout-center'}`}>
      {/* Corner Botanicals: Gold filigree for Royal Red (ref 1), 3D Sculpted Lotus for Ivory/Rose (ref 2,3) */}
      {isRoyal ? (
        <>
          <GoldenBotanicalCorner position="bottom-left" />
          <GoldenBotanicalCorner position="top-right" />
        </>
      ) : (
        <>
          <WatercolorLotusCorner position="bottom-left" />
          <WatercolorLotusCorner position="bottom-right" />
        </>
      )}

      {/* Subtle Background Watermark 囍 (Faint & Elegant) */}
      <div className="bg-watermark-happiness">
        <ModernKnotHappinessSymbol size={420} color="currentColor" />
      </div>

      {/* MAIN PRESENTATION CONTENT */}
      {!isDuo ? (
        /* =========================================================================
           MODE 1: CENTERED SIGNATURE LANDSCAPE (Exact match to Reference 2: Đình Kiên - Thu Hường)
           ========================================================================= */
        <div className="modern-center-stage">
          {/* Top Title: Condensed modern Oswald */}
          <div className="modern-title-header">
            <h1 className="modern-ceremony-title">{data.ceremonyTitle}</h1>
          </div>

          {/* Centerpiece: Groom Name — 囍 Knot / Medallion — Bride Name */}
          <div className="modern-names-row">
            <div className="modern-groom-name">{data.groomName}</div>

            <div className="modern-knot-symbol">
              {renderEmblem(115)}
            </div>

            <div className="modern-bride-name">{data.brideName}</div>
          </div>

          {/* Animated Thank-you & Blessing message in delicate italic with silky blur dissolve */}
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
           MODE 2: EDITORIAL DUO WITH ARCH PHOTO + INFO DOWN UNDER THE PHOTO
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

          {/* Right Column: Arch Frame + Info placed DOWN UNDER THE PHOTO */}
          <div className="modern-duo-right">
            <div className="modern-duo-card-wrapper">
              {/* Modern Minimalist Arch holding couple photo with dual-layer crossfade */}
              <div className="modern-arch-frame">
                <img
                  src={photos[activePhotoIdx]?.url || '/anh1.jpg'}
                  alt="Việt Cường & Minh Hồng"
                  className="modern-arch-img base-layer"
                />
                {incomingPhotoIdx !== null && (
                  <img
                    src={photos[incomingPhotoIdx]?.url}
                    alt="Việt Cường & Minh Hồng"
                    className="modern-arch-img incoming-layer"
                  />
                )}
              </div>

              {/* Placed DOWN UNDER THE PHOTO as requested ("đặt nó xuống dưới ảnh ý cho đẹp") */}
              <div className="modern-below-photo-info">
                <div className="below-info-title">{data.ceremonyTitle}</div>
                <div className="below-info-emblem">
                  {renderEmblem(46)}
                </div>
                <div className="below-info-date">
                  <span className="below-solar-date">{data.dateSolar}</span>
                  <span className="below-lunar-date">{data.dateLunar}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CeremonyStage;
