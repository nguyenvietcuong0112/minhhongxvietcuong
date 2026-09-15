import React from 'react';

/**
 * Shared SVG Gradients Definition
 */
export const GoldSvgDefs = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
    <defs>
      {/* Premium Metallic Gold Linear Gradient */}
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="25%" stopColor="#F5D061" />
        <stop offset="50%" stopColor="#E5B233" />
        <stop offset="75%" stopColor="#FAEA9C" />
        <stop offset="100%" stopColor="#C99420" />
      </linearGradient>

      {/* Radiant Gold Horizontal Gradient */}
      <linearGradient id="goldHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E5B233" stopOpacity="0" />
        <stop offset="20%" stopColor="#F5D061" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FFF6D1" stopOpacity="1" />
        <stop offset="80%" stopColor="#F5D061" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#E5B233" stopOpacity="0" />
      </linearGradient>

      {/* Gold Radial Glow */}
      <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#F5D061" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#C99420" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Royal Corner Flourish Ornament (Vân Mây Cung Đình Mạ Vàng)
 */
export const RoyalCornerOrnament = ({ position = 'top-left' }) => {
  let transform = '';
  let style = { position: 'absolute', zIndex: 1, pointerEvents: 'none' };

  if (position === 'top-left') {
    style.top = '24px';
    style.left = '24px';
  } else if (position === 'top-right') {
    style.top = '24px';
    style.right = '24px';
    transform = 'scaleX(-1)';
  } else if (position === 'bottom-left') {
    style.bottom = '24px';
    style.left = '24px';
    transform = 'scaleY(-1)';
  } else if (position === 'bottom-right') {
    style.bottom = '24px';
    style.right = '24px';
    transform = 'scale(-1, -1)';
  }

  return (
    <div style={{ ...style, transform }} className="corner-ornament">
      <svg
        width="110"
        height="110"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
      >
        {/* Outer border lines */}
        <path
          d="M 6 110 L 6 24 C 6 14 14 6 24 6 L 110 6"
          stroke="url(#goldGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 14 110 L 14 30 C 14 21 21 14 30 14 L 110 14"
          stroke="url(#goldGradient)"
          strokeWidth="1.2"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />

        {/* Traditional Cloud Spiral & Lotus Petal Motif */}
        <path
          d="M 6 36 C 18 36 28 26 28 14 C 28 8 22 4 16 6 C 10 8 10 16 16 18 C 22 20 34 16 38 6"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 36 6 C 36 18 26 28 14 28"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Small corner diamond */}
        <polygon
          points="22,10 26,14 22,18 18,14"
          fill="url(#goldGradient)"
        />
        <circle cx="48" cy="14" r="2.5" fill="url(#goldGradient)" />
        <circle cx="14" cy="48" r="2.5" fill="url(#goldGradient)" />
      </svg>
    </div>
  );
};

/**
 * Double Happiness Symbol (囍) with Ornate Circular Gold Medallion
 */
export const DoubleHappinessSymbol = ({ size = 120 }) => {
  return (
    <div
      className="double-happiness-container"
      style={{
        width: size,
        height: size,
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="happiness-svg"
        style={{ filter: 'drop-shadow(0 0 16px rgba(245, 208, 97, 0.45))' }}
      >
        {/* Outer Radiant Decorative Ring */}
        <circle
          cx="80"
          cy="80"
          r="74"
          stroke="url(#goldGradient)"
          strokeWidth="2.5"
          strokeDasharray="4 3"
        />
        <circle
          cx="80"
          cy="80"
          r="68"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
        />

        {/* Inner Subtle Lotus Petal Halo */}
        <circle
          cx="80"
          cy="80"
          r="60"
          stroke="url(#goldGradient)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />

        {/* Stylized Double Happiness Character 囍 */}
        <g fill="url(#goldGradient)">
          {/* Left Character 喜 */}
          {/* Top cross / radical */}
          <rect x="36" y="44" width="38" height="3" rx="1.5" />
          <rect x="52" y="38" width="4" height="15" rx="1.5" />

          {/* Middle Mouth/Box */}
          <path
            d="M 40 57 H 68 V 70 H 40 Z"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Middle Cross Bar */}
          <rect x="34" y="74" width="42" height="3" rx="1.5" />
          <rect x="42" y="77" width="3.5" height="11" rx="1" />
          <rect x="62" y="77" width="3.5" height="11" rx="1" />
          <rect x="36" y="88" width="38" height="3" rx="1.5" />

          {/* Bottom Mouth/Box */}
          <path
            d="M 39 96 H 69 V 116 H 39 Z"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            fill="none"
          />

          {/* Right Character 喜 */}
          {/* Top cross / radical */}
          <rect x="86" y="44" width="38" height="3" rx="1.5" />
          <rect x="104" y="38" width="4" height="15" rx="1.5" />

          {/* Middle Mouth/Box */}
          <path
            d="M 92 57 H 120 V 70 H 92 Z"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Middle Cross Bar */}
          <rect x="84" y="74" width="42" height="3" rx="1.5" />
          <rect x="94" y="77" width="3.5" height="11" rx="1" />
          <rect x="114" y="77" width="3.5" height="11" rx="1" />
          <rect x="86" y="88" width="38" height="3" rx="1.5" />

          {/* Bottom Mouth/Box */}
          <path
            d="M 91 96 H 121 V 116 H 91 Z"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            fill="none"
          />

          {/* Central Connecting Ribbon Links */}
          <rect x="74" y="52" width="12" height="3" rx="1" />
          <rect x="74" y="82" width="12" height="3" rx="1" />
          <rect x="74" y="104" width="12" height="3" rx="1" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Divider Flourish with Lotus / Heart Accent
 */
export const DividerFlourish = ({ width = '340px' }) => {
  return (
    <div
      style={{
        width,
        maxWidth: '85vw',
        height: '24px',
        margin: '12px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="100%"
        height="24"
        viewBox="0 0 340 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left line */}
        <line
          x1="10"
          y1="12"
          x2="140"
          y2="12"
          stroke="url(#goldHorizontal)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Right line */}
        <line
          x1="200"
          y1="12"
          x2="330"
          y2="12"
          stroke="url(#goldHorizontal)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Center Lotus/Floral Jewel */}
        <circle cx="170" cy="12" r="4" fill="url(#goldGradient)" />
        <path
          d="M 170 5 C 166 8 162 10 162 13 C 162 16 166 17 170 19 C 174 17 178 16 178 13 C 178 10 174 8 170 5 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          fill="url(#goldGradient)"
          fillOpacity="0.4"
        />
        <circle cx="156" cy="12" r="2" fill="url(#goldGradient)" />
        <circle cx="184" cy="12" r="2" fill="url(#goldGradient)" />
      </svg>
    </div>
  );
};
