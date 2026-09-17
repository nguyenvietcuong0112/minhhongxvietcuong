import React from 'react';

/**
 * 4-Point Diamond Flare Star SVG for brilliant gemstone reflections
 */
const DiamondStarSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
    <path
      d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"
      fill="#FFFFFF"
    />
    <circle cx="12" cy="12" r="3" fill="#FFF2B2" />
  </svg>
);

/**
 * AnimatedWeddingRings:
 * Photorealistic 18k yellow gold interlocking wedding rings with brilliant solitaire diamond.
 * Features realistic floating/tilting physics, pulsing golden aura, and sparkling diamond lens flares.
 */
export const AnimatedWeddingRings = ({ size = 135, className = '', showSparkles = true }) => {
  const height = size * 0.82; // Aspect ratio matches (761 x 613)

  return (
    <div
      className={`animated-wedding-rings-container ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
      title="Đôi Nhẫn Cưới Vàng 18k Gắn Kết Trọn Đời"
    >
      {/* Warm Golden Aura Ambient Spotlight */}
      <div className="rings-ambient-glow" />

      {/* Main Luxury Interlocking 18k Gold Wedding Rings */}
      <img
        src={process.env.PUBLIC_URL + '/assets/decorations/wedding_rings_gold.png'}
        alt="Đôi nhẫn cưới vàng kim lồng nhau"
        className="rings-main-image"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      {/* Diamond Twinkle Sparkle Stars (Animated at diamond crown facets) */}
      {showSparkles && (
        <>
          <div className="diamond-sparkle-star sparkle-primary">
            <DiamondStarSVG />
          </div>
          <div className="diamond-sparkle-star sparkle-secondary">
            <DiamondStarSVG />
          </div>
          <div className="diamond-sparkle-star sparkle-tertiary">
            <DiamondStarSVG />
          </div>
        </>
      )}
    </div>
  );
};

export default AnimatedWeddingRings;
