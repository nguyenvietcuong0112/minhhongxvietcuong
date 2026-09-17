import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ModernKnotHappinessSymbol,
  PhotorealisticFloralCorner,
  RealisticLotusOrnaments,
} from './ModernLotusOrnaments';
import AnimatedWeddingRings from './AnimatedWeddingRings';

/**
 * CeremonyStage: Modern, minimalist, aesthetic wedding backdrop
 * inspired directly by trending Pinterest/TikTok Vietnamese wedding ceremonies.
 * Features clean typography (Oswald & Dancing Script signature), watercolor lotus accents,
 * and smooth animated thank-you messages.
 */
const CeremonyStage = ({ data, theme, layoutMode, isSlideshow, onLayoutChange }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [incomingIdx, setIncomingIdx] = useState(null);

  const messages = data.messages || [];
  const photos = data.photos || [];
  const totalItems = Math.max(photos.length, messages.length);

  // Maintain a randomized shuffle bag queue so all 6 photos/wishes are shown without repeats
  const shuffleBagRef = useRef([]);
  const duoCountRef = useRef(0);

  const getNextRandomIdx = useCallback(() => {
    if (totalItems <= 1) return 0;

    // Refill the shuffle bag if empty
    if (!shuffleBagRef.current || shuffleBagRef.current.length === 0) {
      const bag = Array.from({ length: totalItems }, (_, i) => i);
      // Fisher-Yates shuffle
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      // If the first item of new bag matches the currently active index, swap it
      if (bag[0] === activeIdx && bag.length > 1) {
        [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
      }
      shuffleBagRef.current = bag;
    }

    return shuffleBagRef.current.shift();
  }, [totalItems, activeIdx]);

  // Slideshow & auto-alternating timer:
  // Starts on Full Background (center) for 12s, switches to Duo Photo (duo) for 12s,
  // then loops back to Full Background (center) for 12s, repeating continuously!
  useEffect(() => {
    const duration = (data.slideDuration || 12) * 1000;
    const cycleMode = data.slideshowCycleMode || 'alternate';

    if (isSlideshow) {
      // Running active presentation on TV
      const timer = setTimeout(() => {
        if (layoutMode === 'center') {
          // Transition from Full Background to Kèm Ảnh (Duo)
          const next = getNextRandomIdx();
          setActiveIdx(next);
          duoCountRef.current = 1;
          if (onLayoutChange) {
            onLayoutChange('duo');
          }
        } else {
          // In Duo mode
          if (cycleMode === 'batch') {
            if (duoCountRef.current < totalItems) {
              // Advance to next photo in batch
              const next = getNextRandomIdx();
              setIncomingIdx(next);
              duoCountRef.current += 1;
              setTimeout(() => {
                setActiveIdx(next);
                setIncomingIdx(null);
              }, 1500);
            } else {
              // Batch finished, loop back to Full Background
              duoCountRef.current = 0;
              if (onLayoutChange) {
                onLayoutChange('center');
              }
            }
          } else {
            // Default 'alternate': 12s Duo finishes -> loop back to Full Background!
            if (onLayoutChange) {
              onLayoutChange('center');
            }
          }
        }
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Manual preview mode (isSlideshow is false)
      if (totalItems <= 1) return;
      const interval = setInterval(() => {
        const next = getNextRandomIdx();
        setIncomingIdx(next);
        setTimeout(() => {
          setActiveIdx(next);
          setIncomingIdx(null);
        }, 1500);
      }, duration);

      return () => clearInterval(interval);
    }
  }, [
    isSlideshow,
    layoutMode,
    data.slideDuration,
    data.slideshowCycleMode,
    totalItems,
    getNextRandomIdx,
    onLayoutChange,
  ]);

  // Format dateSolar with dots if provided with spaces (e.g. "18 09 2026" -> "18.09.2026")
  const formatSolarDate = (str) => {
    if (!str) return '';
    const trimmed = String(str).trim();
    if (/^\d{1,2}\s+\d{1,2}\s+\d{4}$/.test(trimmed)) {
      return trimmed.split(/\s+/).join('.');
    }
    return trimmed;
  };

  const isDuo = layoutMode === 'duo';

  // Render centerpiece emblem: Luxury Animated 18k Gold Interlocking Wedding Rings with sparkles & floating motion
  const renderEmblem = (size = 175) => {
    if (data.centerEmblem === 'knot') {
      return (
        <ModernKnotHappinessSymbol
          size={size}
          color={theme.knotColor || theme.accentColor}
        />
      );
    }
    return <AnimatedWeddingRings size={size} />;
  };

  // Render animated message with locked container height to eliminate layout shift
  const renderAnimatedMessage = (alignmentClass = 'align-center') => {
    const activeMsg = photos[activeIdx]?.message || messages[activeIdx] || '';
    const incomingMsg = incomingIdx !== null ? (photos[incomingIdx]?.message || messages[incomingIdx] || '') : null;

    return (
      <div className={`modern-message-stage-box ${alignmentClass}`}>
        <div className={`message-layer base ${incomingIdx !== null ? 'fading-out' : 'active'}`}>
          <p className="modern-message-text">{activeMsg}</p>
        </div>
        {incomingMsg !== null && (
          <div className="message-layer incoming">
            <p className="modern-message-text">{incomingMsg}</p>
          </div>
        )}
      </div>
    );
  };

  // Dynamic corner ornament rendering (chỉ giữ các type đẹp: Hoa Sen, Hoa Tươi, Tối Giản)
  const renderCornerOrnaments = () => {
    const selected = data.ornament || 'lotus';
    if (selected === 'minimal') return null;

    if (selected === 'real_flowers') {
      return (
        <>
          <PhotorealisticFloralCorner position="top-left" theme={data.theme} />
          <PhotorealisticFloralCorner position="top-right" theme={data.theme} />
        </>
      );
    }

    // Default: Hoa Sen Hai Bên (Mẫu Thật)
    return <RealisticLotusOrnaments layoutMode={layoutMode} />;
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
              {renderEmblem(175)}
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
                  src={photos[activeIdx]?.url || '/anh1.jpg'}
                  alt="Việt Cường & Minh Hồng"
                  className="modern-arch-img base-layer"
                />
                {incomingIdx !== null && (
                  <img
                    src={photos[incomingIdx]?.url || '/anh1.jpg'}
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
