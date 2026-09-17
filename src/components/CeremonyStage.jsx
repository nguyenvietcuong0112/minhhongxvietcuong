import React, { useState, useEffect } from 'react';
import {
  ModernKnotHappinessSymbol,
  RoyalHappinessMedallion,
  LuxuryOrchidCorner,
  WeddingFansCorner,
  WatercolorLotusCorner,
  GoldenBotanicalCorner,
  PhotorealisticFloralCorner,
  SakuraOrnaments,
} from './ModernLotusOrnaments';

/**
 * CeremonyStage: Modern, minimalist, aesthetic wedding backdrop
 * inspired directly by trending Pinterest/TikTok Vietnamese wedding ceremonies.
 * Features clean typography (Oswald & Dancing Script signature), watercolor lotus accents,
 * and smooth animated thank-you messages.
 */
const CeremonyStage = ({ data, theme, layoutMode, isSlideshow }) => {
  const [activeMsgIdx, setActiveMsgIdx] = useState(0);
  const [incomingMsgIdx, setIncomingMsgIdx] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [incomingPhotoIdx, setIncomingPhotoIdx] = useState(null);

  const messages = data.messages || [];
  const photos = data.photos || [];

  // Format dateSolar with dots if provided with spaces (e.g. "18 09 2026" -> "18.09.2026")
  const formatSolarDate = (str) => {
    if (!str) return '';
    const trimmed = String(str).trim();
    if (/^\d{1,2}\s+\d{1,2}\s+\d{4}$/.test(trimmed)) {
      return trimmed.split(/\s+/).join('.');
    }
    return trimmed;
  };

  // When switching into duo layout during slideshow, smoothly advance to next photo
  useEffect(() => {
    if (layoutMode === 'duo' && isSlideshow && photos.length > 1) {
      setActivePhotoIdx((prev) => (prev + 1) % photos.length);
    }
  }, [layoutMode, isSlideshow, photos.length]);

  // 1. Dual-Layer Smooth Text Crossfade (Locked Height, Zero Jitter)
  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      const nextIdx = (activeMsgIdx + 1) % messages.length;
      setIncomingMsgIdx(nextIdx);
      setTimeout(() => {
        setActiveMsgIdx(nextIdx);
        setIncomingMsgIdx(null);
      }, 1000); // 1.0s silky dissolve
    }, 6500);
    return () => clearInterval(interval);
  }, [messages.length, activeMsgIdx]);

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

  const isDuo = layoutMode === 'duo';
  const isRoyal = theme.id === 'royalRed';

  // Render happiness emblem depending on theme
  const renderEmblem = (size = 110) => {
    if (theme.id === 'blushSakura') {
      return (
        <div
          className="sakura-center-rings-wrap"
          style={{
            position: 'relative',
            width: size,
            height: size * 1.15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Faint Double Happiness Watermark */}
          <div
            className="watermark-xi-center"
            style={{
              position: 'absolute',
              fontSize: size * 1.35,
              color: 'rgba(232, 67, 112, 0.22)',
              fontWeight: 900,
              lineHeight: 1,
              userSelect: 'none',
              zIndex: 1,
              fontFamily: 'sans-serif',
            }}
          >
            囍
          </div>
          {/* Sparkling Interlocking Diamond Wedding Rings */}
          <img
            src={process.env.PUBLIC_URL + '/assets/sakura/wedding_rings.png'}
            alt="Cặp nhẫn cưới kim cương lồng nhau"
            style={{
              width: size * 1.05,
              height: size * 1.05,
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 6px 16px rgba(114, 19, 39, 0.22))',
            }}
          />
        </div>
      );
    }
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

  // Render animated message with locked container height to eliminate layout shift
  const renderAnimatedMessage = (alignmentClass = 'align-center') => (
    <div className={`modern-message-stage-box ${alignmentClass}`}>
      <div className={`message-layer base ${incomingMsgIdx !== null ? 'fading-out' : 'active'}`}>
        <p className="modern-message-text">{messages[activeMsgIdx] || ''}</p>
      </div>
      {incomingMsgIdx !== null && (
        <div className="message-layer incoming">
          <p className="modern-message-text">{messages[incomingMsgIdx] || ''}</p>
        </div>
      )}
    </div>
  );

  // Dynamic corner ornament rendering
  const renderCornerOrnaments = () => {
    const selected = data.ornament || (theme.id === 'blushSakura' ? 'sakura' : 'real_flowers');
    if (selected === 'minimal') return null;

    if (selected === 'sakura' || theme.id === 'blushSakura') {
      return <SakuraOrnaments layoutMode={layoutMode} />;
    }

    if (selected === 'real_flowers') {
      return (
        <>
          <PhotorealisticFloralCorner position="top-left" theme={data.theme} />
          <PhotorealisticFloralCorner position="top-right" theme={data.theme} />
        </>
      );
    }

    if (selected === 'fans') {
      return (
        <>
          <WeddingFansCorner position="bottom-left" />
          <WeddingFansCorner position="bottom-right" />
        </>
      );
    }
    if (selected === 'botanical') {
      return (
        <>
          <GoldenBotanicalCorner position="bottom-left" />
          <GoldenBotanicalCorner position="top-right" />
        </>
      );
    }
    if (selected === 'lotus') {
      return (
        <>
          <WatercolorLotusCorner position="bottom-left" />
          <WatercolorLotusCorner position="bottom-right" />
        </>
      );
    }
    // Luxury Orchids
    return (
      <>
        <LuxuryOrchidCorner position="bottom-left" />
        <LuxuryOrchidCorner position="bottom-right" />
      </>
    );
  };

  return (
    <div className={`modern-stage-container ${isDuo ? 'layout-duo' : 'layout-center'} font-${data.fontFamily || 'dancing'}`}>
      {/* Corner Botanicals: Dynamic modern ornaments (Orchids, Wedding Fans, Gold Botanical, Lotus, or Minimal) */}
      {renderCornerOrnaments()}

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
              {renderEmblem(135)}
            </div>

            <div className="modern-bride-name">{data.brideName}</div>
          </div>

          {/* Animated Thank-you & Blessing message: Dual-layer zero-shift crossfade */}
          <div className="modern-message-wrapper">
            {renderAnimatedMessage('align-center')}
          </div>

          {/* Bottom Date in Modern Condensed Font */}
          <div className="modern-date-footer">
            <span className="modern-solar-date">{formatSolarDate(data.dateSolar)}</span>
            {theme.id === 'blushSakura' && (
              <img
                src={process.env.PUBLIC_URL + '/assets/sakura/love_doves.png'}
                alt="Đôi chim bồ câu"
                className="sakura-love-doves"
                style={{
                  width: 'clamp(48px, 4.8vw, 72px)',
                  height: 'auto',
                  margin: '0 clamp(8px, 1.2vw, 16px)',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(180, 80, 100, 0.25))',
                }}
              />
            )}
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
              {renderAnimatedMessage('align-left')}
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
                  <span className="below-solar-date">{formatSolarDate(data.dateSolar)}</span>
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
