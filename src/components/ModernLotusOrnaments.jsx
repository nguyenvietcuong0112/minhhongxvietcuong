import React from 'react';

/**
 * Modern Chữ Hỷ 囍 with Endless Knot & Tassel
 * (Exact match to reference 2: Đình Kiên - Thu Hường & reference 3)
 */
export const ModernKnotHappinessSymbol = ({ size = 110, color = '#F5D061' }) => {
  return (
    <div
      style={{
        width: size,
        height: size * 1.35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        width={size}
        height={size * 1.35}
        viewBox="0 0 140 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.35))' }}
      >
        {/* Double Happiness 囍 */}
        <g fill={color}>
          {/* === LEFT 喜 === */}
          <rect x="24" y="24" width="40" height="5" rx="1.5" />
          <rect x="41.5" y="16" width="5" height="18" rx="1.5" />

          {/* Middle Mouth */}
          <rect x="28" y="38" width="32" height="18" rx="2" fill="none" stroke={color} strokeWidth="4.5" />

          {/* Middle Bar */}
          <rect x="22" y="62" width="44" height="5" rx="1.5" />
          <rect x="30" y="65" width="4.5" height="15" rx="1" />
          <rect x="53" y="65" width="4.5" height="15" rx="1" />
          <rect x="24" y="78" width="40" height="5" rx="1.5" />

          {/* Bottom Mouth */}
          <rect x="26" y="89" width="36" height="22" rx="2" fill="none" stroke={color} strokeWidth="5" />

          {/* === RIGHT 喜 === */}
          <rect x="76" y="24" width="40" height="5" rx="1.5" />
          <rect x="93.5" y="16" width="5" height="18" rx="1.5" />

          {/* Middle Mouth */}
          <rect x="80" y="38" width="32" height="18" rx="2" fill="none" stroke={color} strokeWidth="4.5" />

          {/* Middle Bar */}
          <rect x="74" y="62" width="44" height="5" rx="1.5" />
          <rect x="82" y="65" width="4.5" height="15" rx="1" />
          <rect x="105" y="65" width="4.5" height="15" rx="1" />
          <rect x="76" y="78" width="40" height="5" rx="1.5" />

          {/* Bottom Mouth */}
          <rect x="78" y="89" width="36" height="22" rx="2" fill="none" stroke={color} strokeWidth="5" />

          {/* Connecting Links */}
          <rect x="62" y="44" width="16" height="5" rx="1.5" />
          <rect x="62" y="70" width="16" height="5" rx="1.5" />
          <rect x="62" y="96" width="16" height="5" rx="1.5" />
        </g>

        {/* Traditional Endless Knot (Đồng Tâm Kết) beneath */}
        <g stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Connector line */}
          <line x1="70" y1="120" x2="70" y2="128" />

          {/* Diamond loop */}
          <path d="M 70 128 L 84 142 L 70 156 L 56 142 Z" />
          <path d="M 70 134 L 78 142 L 70 150 L 62 142 Z" strokeWidth="2" />

          {/* Interlocking knot loops */}
          <path d="M 56 142 C 44 132 44 152 56 142" />
          <path d="M 84 142 C 96 132 96 152 84 142" />

          {/* Hanging silk tassels */}
          <line x1="70" y1="156" x2="70" y2="182" strokeWidth="3.5" />
          <circle cx="70" cy="184" r="3" fill={color} />
        </g>
      </svg>
    </div>
  );
};

/**
 * Watercolor Lotus Leaves & White Lotus Blossoms
 * (Exact match to the modern aesthetic in reference 2, 3, 4)
 */
export const WatercolorLotusCorner = ({ position = 'bottom-left' }) => {
  const isLeft = position === 'bottom-left';
  const style = {
    position: 'absolute',
    bottom: 0,
    [isLeft ? 'left' : 'right']: 0,
    width: 'clamp(280px, 32vw, 480px)',
    height: 'clamp(180px, 24vh, 320px)',
    pointerEvents: 'none',
    zIndex: 2,
    transform: isLeft ? 'none' : 'scaleX(-1)',
  };

  return (
    <div style={style} className="lotus-corner-decor">
      <svg
        viewBox="0 0 450 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Soft green lotus leaf gradient */}
          <radialGradient id="lotusLeafGrad1" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#9ecba6" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#679e75" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3d6f4b" stopOpacity="0.65" />
          </radialGradient>

          <radialGradient id="lotusLeafGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#badfc1" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#7ba887" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4f7c59" stopOpacity="0.6" />
          </radialGradient>

          {/* White lotus petal gradient */}
          <linearGradient id="whitePetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e8f3ea" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fff8e7" stopOpacity="0.9" />
          </linearGradient>

          <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Large Lotus Leaf at the corner */}
        <path
          d="M -40 320 C -20 200 80 180 180 210 C 260 235 270 320 220 340 Z"
          fill="url(#lotusLeafGrad1)"
          filter="url(#softBlur)"
        />
        {/* Leaf veins */}
        <path d="M 80 230 C 50 210 0 240 -20 260" stroke="#7eb88e" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M 80 230 C 110 200 160 210 200 220" stroke="#7eb88e" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M 80 230 C 100 260 140 280 180 300" stroke="#7eb88e" strokeWidth="1.5" strokeOpacity="0.5" />

        {/* Smaller secondary leaf floating higher */}
        <path
          d="M 160 190 C 180 130 250 120 310 150 C 360 175 350 230 300 240 C 240 250 180 230 160 190 Z"
          fill="url(#lotusLeafGrad2)"
          filter="url(#softBlur)"
        />

        {/* White Lotus Blossom (Hoa sen trắng tinh khôi) */}
        <g transform="translate(190, 80)">
          {/* Back petals */}
          <path d="M 40 90 C 20 60 10 30 40 0 C 70 30 60 60 40 90 Z" fill="url(#whitePetalGrad)" />
          <path d="M 25 85 C -5 65 -15 35 10 15 C 35 35 35 65 25 85 Z" fill="url(#whitePetalGrad)" />
          <path d="M 55 85 C 85 65 95 35 70 15 C 45 35 45 65 55 85 Z" fill="url(#whitePetalGrad)" />

          {/* Front petals */}
          <path d="M 35 88 C 15 70 5 45 30 25 C 50 45 45 70 35 88 Z" fill="#ffffff" fillOpacity="0.95" />
          <path d="M 45 88 C 65 70 75 45 50 25 C 30 45 35 70 45 88 Z" fill="#ffffff" fillOpacity="0.95" />

          {/* Lotus pod / center pistil */}
          <ellipse cx="40" cy="55" rx="8" ry="6" fill="#fcd34d" />
        </g>

        {/* Small lotus bud stem */}
        <path d="M 340 320 Q 360 220 370 170" stroke="#679e75" strokeWidth="3" strokeLinecap="round" />
        <path d="M 370 170 C 360 150 365 135 375 130 C 385 135 390 150 380 170 Z" fill="url(#whitePetalGrad)" />
      </svg>
    </div>
  );
};
