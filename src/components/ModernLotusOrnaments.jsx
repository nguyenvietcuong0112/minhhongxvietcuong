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
 * Realistic Botanical Watercolor Lotus Ornaments (Sen 2 Bên)
 * - Bottom-Left: Blooming pink lotus blossom, budding lotus on stem, and dewy pads
 * - Bottom-Right: Blooming pink lotus blossom, budding lotus on stem, and dewy pads (mirrored)
 */
export const RealisticLotusOrnaments = ({ layoutMode = 'center' }) => {
  const isDuo = layoutMode === 'duo';

  return (
    <>
      {/* Bottom-Left Blooming Lotus Blossom & Leaves (đầm sen góc trái) */}
      <div
        className="lotus-ornament-wrap lotus-blossom-left-decor"
        style={{
          position: 'absolute',
          bottom: isDuo ? '-10px' : '-15px',
          left: isDuo ? '-10px' : '-15px',
          width: isDuo ? 'clamp(210px, 19vw, 300px)' : 'clamp(260px, 25vw, 400px)',
          height: isDuo ? 'clamp(235px, 21vw, 380px)' : 'clamp(286px, 27vw, 495px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/assets/lotus/lotus_blooming_corner.png'}
          alt="Hoa sen hồng nở rộ góc trái"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transformOrigin: 'bottom left',
            transform: 'scale(0.85, 0.95)',
            filter: 'drop-shadow(0 14px 34px rgba(0, 0, 0, 0.28))',
            display: 'block',
          }}
        />
      </div>

      {/* Bottom-Right Blooming Lotus Blossom & Leaves (đầm sen góc phải) */}
      <div
        className="lotus-ornament-wrap lotus-blossom-right-decor"
        style={{
          position: 'absolute',
          bottom: isDuo ? '-10px' : '-15px',
          right: isDuo ? '-10px' : '-15px',
          width: isDuo ? 'clamp(210px, 19vw, 300px)' : 'clamp(260px, 25vw, 400px)',
          height: isDuo ? 'clamp(235px, 21vw, 380px)' : 'clamp(286px, 27vw, 495px)',
          pointerEvents: 'none',
          zIndex: 2, // Behind .modern-duo-stage (z-index: 4)
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/assets/lotus/lotus_blooming_corner.png'}
          alt="Hoa sen hồng nở rộ góc phải"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transformOrigin: 'center',
            transform: 'scaleX(-1) scale(0.85, 0.95)',
            filter: 'drop-shadow(0 14px 34px rgba(0, 0, 0, 0.28))',
            display: 'block',
          }}
        />
      </div>
    </>
  );
};

export const WatercolorLotusCorner = ({ position = 'bottom-left' }) => {
  const isLeft = position === 'bottom-left';
  return (
    <div
      className={`lotus-corner-decor ${isLeft ? 'lotus-blossom-left-decor' : 'lotus-blossom-right-decor'}`}
      style={{
        position: 'absolute',
        bottom: '-12px',
        [isLeft ? 'left' : 'right']: '-12px',
        width: 'clamp(260px, 25vw, 440px)',
        height: 'clamp(286px, 27vw, 495px)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <img
        src={process.env.PUBLIC_URL + '/assets/lotus/lotus_blooming_corner.png'}
        alt={isLeft ? 'Hoa sen hồng góc trái' : 'Hoa sen hồng góc phải'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transformOrigin: isLeft ? 'bottom left' : 'bottom right',
          transform: isLeft ? 'scale(1.05, 1.15)' : 'scaleX(-1) scale(1.05, 1.15)',
          filter: 'drop-shadow(0 14px 32px rgba(0, 0, 0, 0.25))',
          display: 'block',
        }}
      />
    </div>
  );
};

/**
 * Royal Gold Circular Medallion with Chữ Hỷ 囍
 * (Exact match to Reference 1: TV Red Theme Đức Duy - Lệ Quyên)
 */
export const RoyalHappinessMedallion = ({ size = 110, color = '#F5D061' }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.5))' }}
      >
        <defs>
          <radialGradient id="medallionBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#871224" />
            <stop offset="70%" stopColor="#520512" />
            <stop offset="100%" stopColor="#300108" />
          </radialGradient>
        </defs>

        {/* Outer Gold Scalloped Ring */}
        <circle cx="70" cy="70" r="66" fill="url(#medallionBg)" stroke={color} strokeWidth="3" />
        <circle cx="70" cy="70" r="60" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />

        {/* Chữ Hỷ 囍 centered inside */}
        <g fill={color} transform="translate(14, 18) scale(0.8)">
          {/* LEFT 喜 */}
          <rect x="24" y="24" width="40" height="5" rx="1.5" />
          <rect x="41.5" y="16" width="5" height="18" rx="1.5" />
          <rect x="28" y="38" width="32" height="18" rx="2" fill="none" stroke={color} strokeWidth="4.5" />
          <rect x="22" y="62" width="44" height="5" rx="1.5" />
          <rect x="30" y="65" width="4.5" height="15" rx="1" />
          <rect x="53" y="65" width="4.5" height="15" rx="1" />
          <rect x="24" y="78" width="40" height="5" rx="1.5" />
          <rect x="26" y="89" width="36" height="22" rx="2" fill="none" stroke={color} strokeWidth="5" />

          {/* RIGHT 喜 */}
          <rect x="76" y="24" width="40" height="5" rx="1.5" />
          <rect x="93.5" y="16" width="5" height="18" rx="1.5" />
          <rect x="80" y="38" width="32" height="18" rx="2" fill="none" stroke={color} strokeWidth="4.5" />
          <rect x="74" y="62" width="44" height="5" rx="1.5" />
          <rect x="82" y="65" width="4.5" height="15" rx="1" />
          <rect x="105" y="65" width="4.5" height="15" rx="1" />
          <rect x="76" y="78" width="40" height="5" rx="1.5" />
          <rect x="78" y="89" width="36" height="22" rx="2" fill="none" stroke={color} strokeWidth="5" />

          {/* Bridges */}
          <rect x="62" y="44" width="16" height="5" rx="1.5" />
          <rect x="62" y="70" width="16" height="5" rx="1.5" />
          <rect x="62" y="96" width="16" height="5" rx="1.5" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Golden Botanical Filigree Corner
 * (Exact match to Reference 1: TV Red Theme Đức Duy - Lệ Quyên)
 */
export const GoldenBotanicalCorner = ({ position = 'bottom-left' }) => {
  const isLeft = position === 'bottom-left';
  const isTop = position === 'top-right';

  const style = {
    position: 'absolute',
    ...(isTop ? { top: 0, right: 0 } : isLeft ? { bottom: 0, left: 0 } : { bottom: 0, right: 0 }),
    width: 'clamp(260px, 30vw, 440px)',
    height: 'clamp(200px, 26vh, 360px)',
    pointerEvents: 'none',
    zIndex: 2,
    transform: isTop ? 'scale(-1, -1)' : isLeft ? 'none' : 'scaleX(-1)',
    opacity: 0.75,
  };

  return (
    <div style={style} className="golden-botanical-decor">
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <g stroke="#F5D061" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          {/* Main graceful curved stem */}
          <path d="M 10 310 C 60 240 120 180 240 140 C 320 115 380 70 390 20" strokeWidth="2.2" />

          {/* Secondary branching stems */}
          <path d="M 80 240 C 130 200 170 190 220 190" />
          <path d="M 150 180 C 190 140 230 110 270 90" />
          <path d="M 230 145 C 270 110 320 100 350 90" />

          {/* Delicate Leaves along stems */}
          <path d="M 90 230 C 90 205 110 195 125 200 C 120 220 105 230 90 230 Z" fill="#F5D061" fillOpacity="0.18" />
          <line x1="90" y1="230" x2="115" y2="205" strokeWidth="1" />

          <path d="M 140 190 C 150 165 175 160 185 170 C 175 188 155 195 140 190 Z" fill="#F5D061" fillOpacity="0.18" />
          <line x1="140" y1="190" x2="175" y2="170" strokeWidth="1" />

          <path d="M 190 155 C 210 130 235 130 245 145 C 230 160 205 165 190 155 Z" fill="#F5D061" fillOpacity="0.18" />
          <line x1="190" y1="155" x2="230" y2="140" strokeWidth="1" />

          <path d="M 270 115 C 295 90 320 95 330 110 C 310 125 285 125 270 115 Z" fill="#F5D061" fillOpacity="0.18" />
          <line x1="270" y1="115" x2="310" y2="105" strokeWidth="1" />

          {/* Delicate peony / chrysanthemum outline flower */}
          <g transform="translate(290, 40) scale(0.65)">
            <circle cx="50" cy="50" r="12" fill="#F5D061" fillOpacity="0.3" />
            <path d="M 50 20 C 40 35 40 45 50 50 C 60 45 60 35 50 20 Z" />
            <path d="M 50 80 C 40 65 40 55 50 50 C 60 55 60 65 50 80 Z" />
            <path d="M 20 50 C 35 40 45 40 50 50 C 45 60 35 60 20 50 Z" />
            <path d="M 80 50 C 65 40 55 40 50 50 C 55 60 65 60 80 50 Z" />
            <path d="M 28 28 C 42 38 48 44 50 50 C 44 48 38 42 28 28 Z" />
            <path d="M 72 72 C 58 62 52 56 50 50 C 56 52 62 58 72 72 Z" />
            <path d="M 72 28 C 58 38 52 44 50 50 C 56 48 62 42 72 28 Z" />
            <path d="M 28 72 C 42 62 48 56 50 50 C 44 52 38 58 28 72 Z" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 1. Luxury White & Blush Orchid Branch with Eucalyptus (Hoa Lan Hồ Điệp & Cành Khuynh Diệp)
 * Modern, youthful, high-end wedding floral decor.
 */
export const LuxuryOrchidCorner = ({ position = 'bottom-left' }) => {
  const isLeft = position === 'bottom-left';
  const style = {
    position: 'absolute',
    bottom: 0,
    ...(isLeft ? { left: 0 } : { right: 0 }),
    width: 'clamp(280px, 32vw, 480px)',
    height: 'clamp(240px, 28vh, 400px)',
    pointerEvents: 'none',
    zIndex: 2,
    transform: isLeft ? 'none' : 'scaleX(-1)',
  };

  return (
    <div style={style} className="lotus-corner-decor">
      <svg
        viewBox="0 0 460 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`orchidPetal_${position}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="72%" stopColor="#fdf2f4" />
            <stop offset="100%" stopColor="#f9a8d4" />
          </radialGradient>
          <linearGradient id={`orchidLip_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
          <linearGradient id={`eucaLeaf_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="45%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id={`goldBranch_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          <filter id={`orchidShadow_${position}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="8" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
          </filter>
        </defs>

        {/* Arching Stems with Eucalyptus Coin Leaves & Golden Accent Sprigs */}
        <g filter={`url(#orchidShadow_${position})`}>
          {/* Golden accent sprig */}
          <path d="M 0 380 Q 70 300 130 250 T 230 190" stroke={`url(#goldBranch_${position})`} strokeWidth="2.5" fill="none" opacity="0.8" />
          <circle cx="170" cy="225" r="5" fill={`url(#goldBranch_${position})`} />
          <circle cx="210" cy="200" r="4" fill={`url(#goldBranch_${position})`} />

          {/* Main Orchid Stem */}
          <path d="M 0 380 Q 90 270 170 200 T 290 100 T 360 40" stroke="#375545" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Eucalyptus Silver Leaves */}
          <circle cx="55" cy="335" r="28" fill={`url(#eucaLeaf_${position})`} opacity="0.85" />
          <circle cx="95" cy="295" r="25" fill={`url(#eucaLeaf_${position})`} opacity="0.88" />
          <circle cx="130" cy="255" r="22" fill={`url(#eucaLeaf_${position})`} opacity="0.85" />
          <circle cx="70" cy="265" r="20" fill={`url(#eucaLeaf_${position})`} opacity="0.8" />
          <circle cx="170" cy="245" r="18" fill={`url(#eucaLeaf_${position})`} opacity="0.8" />
        </g>

        {/* Orchid Flower 1 (Large Full Bloom at 170, 200) */}
        <g transform="translate(170, 200)" filter={`url(#orchidShadow_${position})`}>
          {/* Top Sepal */}
          <ellipse cx="0" cy="-38" rx="20" ry="30" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.6" />
          {/* Lower Sepals */}
          <ellipse cx="-28" cy="20" rx="18" ry="26" transform="rotate(-30, -28, 20)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.6" />
          <ellipse cx="28" cy="20" rx="18" ry="26" transform="rotate(30, 28, 20)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.6" />
          {/* Left & Right Main Lateral Petals */}
          <ellipse cx="-38" cy="-10" rx="32" ry="25" transform="rotate(-15, -38, -10)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.7" />
          <ellipse cx="38" cy="-10" rx="32" ry="25" transform="rotate(15, 38, -10)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.7" />
          {/* Center Lip (Labellum) */}
          <path d="M -14 0 C -20 14 -14 28 0 32 C 14 28 20 14 14 0 Z" fill={`url(#orchidLip_${position})`} />
          <circle cx="0" cy="8" r="5" fill="#fde047" />
          <circle cx="-2.5" cy="7" r="1.8" fill="#991b1b" />
          <circle cx="2.5" cy="7" r="1.8" fill="#991b1b" />
        </g>

        {/* Orchid Flower 2 (Medium Bloom at 265, 120) */}
        <g transform="translate(265, 120) scale(0.8)" filter={`url(#orchidShadow_${position})`}>
          <ellipse cx="0" cy="-38" rx="20" ry="30" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.6" />
          <ellipse cx="-28" cy="20" rx="18" ry="26" transform="rotate(-30, -28, 20)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.6" />
          <ellipse cx="28" cy="20" rx="18" ry="26" transform="rotate(30, 28, 20)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.6" />
          <ellipse cx="-38" cy="-10" rx="32" ry="25" transform="rotate(-15, -38, -10)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.7" />
          <ellipse cx="38" cy="-10" rx="32" ry="25" transform="rotate(15, 38, -10)" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.7" />
          <path d="M -14 0 C -20 14 -14 28 0 32 C 14 28 20 14 14 0 Z" fill={`url(#orchidLip_${position})`} />
          <circle cx="0" cy="8" r="5" fill="#fde047" />
        </g>

        {/* Orchid Flower 3 (Bud at 345, 55) */}
        <g transform="translate(345, 55) scale(0.62)" filter={`url(#orchidShadow_${position})`}>
          <ellipse cx="0" cy="0" rx="16" ry="22" fill={`url(#orchidPetal_${position})`} stroke="#f472b6" strokeWidth="0.8" />
          <path d="M 0 -22 Q 10 0 0 22" stroke="#4ade80" strokeWidth="2" fill="none" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Auspicious Pleated Paper Fans & Golden Ginkgo (Quạt Xếp Ly & Lá Bạch Quả Kim Tuyến)
 * Trending modern Vietnamese & Asian fusion wedding decor.
 */
export const WeddingFansCorner = ({ position = 'bottom-left' }) => {
  const isLeft = position === 'bottom-left';
  const style = {
    position: 'absolute',
    bottom: 0,
    ...(isLeft ? { left: 0 } : { right: 0 }),
    width: 'clamp(260px, 29vw, 440px)',
    height: 'clamp(220px, 26vh, 380px)',
    pointerEvents: 'none',
    zIndex: 2,
    transform: isLeft ? 'none' : 'scaleX(-1)',
  };

  return (
    <div style={style} className="lotus-corner-decor">
      <svg
        viewBox="0 0 420 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`goldGinkgo_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          <linearGradient id={`fanCream_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fcf9f2" />
            <stop offset="100%" stopColor="#e5d8be" />
          </linearGradient>
          <linearGradient id={`fanBlush_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="60%" stopColor="#fecdd3" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <filter id={`fanShadow_${position}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="8" stdDeviation="8" floodColor="#78350f" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Ginkgo Golden Leaves & Sprigs behind */}
        <g filter={`url(#fanShadow_${position})`}>
          <path d="M 0 360 Q 80 230 190 170" stroke={`url(#goldGinkgo_${position})`} strokeWidth="3" fill="none" />
          {/* Ginkgo Fan Leaves */}
          <path d="M 190 170 Q 235 125 255 160 Q 230 195 190 170 Z" fill={`url(#goldGinkgo_${position})`} opacity="0.9" />
          <path d="M 145 205 Q 190 150 215 185 Q 180 220 145 205 Z" fill={`url(#goldGinkgo_${position})`} opacity="0.85" />
          <path d="M 95 250 Q 140 205 165 235 Q 130 265 95 250 Z" fill={`url(#goldGinkgo_${position})`} opacity="0.8" />
        </g>

        {/* Fan 1: Large Cream Pleated Fan */}
        <g transform="translate(110, 275)" filter={`url(#fanShadow_${position})`}>
          <path d="M 0 0 L -130 -40 A 140 140 0 0 1 45 -130 Z" fill={`url(#fanCream_${position})`} stroke="#e2d4b7" strokeWidth="1" />
          <line x1="0" y1="0" x2="-125" y2="-45" stroke="#d5c39e" strokeWidth="1.6" />
          <line x1="0" y1="0" x2="-105" y2="-80" stroke="#d5c39e" strokeWidth="1.6" />
          <line x1="0" y1="0" x2="-75" y2="-110" stroke="#d5c39e" strokeWidth="1.6" />
          <line x1="0" y1="0" x2="-40" y2="-128" stroke="#d5c39e" strokeWidth="1.6" />
          <line x1="0" y1="0" x2="5" y2="-135" stroke="#d5c39e" strokeWidth="1.6" />
          <line x1="0" y1="0" x2="45" y2="-125" stroke="#d5c39e" strokeWidth="1.6" />
          {/* Gold Center Medallion */}
          <circle cx="0" cy="0" r="16" fill={`url(#goldGinkgo_${position})`} />
          <circle cx="0" cy="0" r="8" fill="#ffffff" />
        </g>

        {/* Fan 2: Soft Blush Pink Fan in front */}
        <g transform="translate(45, 315)" filter={`url(#fanShadow_${position})`}>
          <path d="M 0 0 L 10 -95 A 100 100 0 0 1 95 -10 Z" fill={`url(#fanBlush_${position})`} stroke="#f472b6" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="32" y2="-90" stroke="#fb7185" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="60" y2="-75" stroke="#fb7185" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="80" y2="-50" stroke="#fb7185" strokeWidth="1.4" />
            <circle cx="0" cy="0" r="12" fill={`url(#goldGinkgo_${position})`} />
        </g>
      </svg>
    </div>
  );
};

/**
 * Photorealistic High-End Wedding Floral Arrangement
 * Created from real luxury wedding floral studio photography (Phalaenopsis, Peonies, English Roses, Eucalyptus)
 * 100% photorealistic texture, organic petals, natural lighting.
 */
export const PhotorealisticFloralCorner = ({ 
  position = 'top-left', 
  theme = 'ivory',
  size = 'clamp(250px, 23vw, 400px)'
}) => {
  const isRed = theme === 'royalRed';
  const flowerSrc = isRed 
    ? (process.env.PUBLIC_URL + '/assets/flowers/real_red_roses.png')
    : (process.env.PUBLIC_URL + '/assets/flowers/real_wedding_orchids.png');

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return {
          top: '-22px',
          left: '-22px',
          transform: 'none',
        };
      case 'top-right':
        return {
          top: '-22px',
          right: '-22px',
          transform: 'scaleX(-1)',
        };
      case 'bottom-left':
        return {
          bottom: '-22px',
          left: '-22px',
          transform: 'scaleY(-1)',
        };
      case 'bottom-right':
        return {
          bottom: '-22px',
          right: '-22px',
          transform: 'scale(-1, -1)',
        };
      default:
        return { top: 0, left: 0 };
    }
  };

  const posStyle = getPositionStyles();

  return (
    <div
      className={`photorealistic-flower-wrap pos-${position}`}
      style={{
        position: 'absolute',
        ...posStyle,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 12,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s ease',
      }}
    >
      <img
        src={flowerSrc}
        alt="Hoa cưới thật 100%"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: isRed
            ? 'drop-shadow(0 18px 40px rgba(0, 0, 0, 0.45))'
            : 'drop-shadow(0 14px 32px rgba(80, 50, 40, 0.12))',
          display: 'block',
        }}
      />
    </div>
  );
};

/**
 * Sakura Blossom & Japanese Glass Windchime Ornaments
 * Exact match to user reference image (Thu Hường & Duy Mạnh pink wedding backdrop)
 */
export const SakuraOrnaments = ({ layoutMode = 'center' }) => {
  const isDuo = layoutMode === 'duo';

  return (
    <>
      {/* Top-Right Sakura Branch (in Duo mode, kept tight to corner and strictly behind arch photo) */}
      <div
        className="sakura-ornament-wrap branch-top-right"
        style={{
          position: 'absolute',
          top: isDuo ? '-10px' : '-20px',
          right: isDuo ? '-10px' : '-20px',
          width: isDuo ? 'clamp(180px, 16vw, 280px)' : 'clamp(280px, 26vw, 480px)',
          height: isDuo ? 'clamp(180px, 16vw, 280px)' : 'clamp(280px, 26vw, 480px)',
          pointerEvents: 'none',
          zIndex: 2, // Always behind .modern-duo-stage (z-index: 4) so it never covers the photo
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/assets/sakura/sakura_top_branch.png'}
          alt="Cành hoa anh đào rủ xuống"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 12px 28px rgba(220, 100, 130, 0.22))',
            display: 'block',
          }}
        />
      </div>

      {/* Bottom-Left Sakura Cluster with Flying Petals */}
      <div
        className="sakura-ornament-wrap cluster-bottom-left"
        style={{
          position: 'absolute',
          bottom: '-25px',
          left: '-25px',
          width: isDuo ? 'clamp(240px, 22vw, 380px)' : 'clamp(290px, 27vw, 490px)',
          height: isDuo ? 'clamp(240px, 22vw, 380px)' : 'clamp(290px, 27vw, 490px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/assets/sakura/sakura_bottom_corner.png'}
          alt="Cụm hoa anh đào góc dưới kèm cánh hoa bay"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 12px 28px rgba(220, 100, 130, 0.22))',
            display: 'block',
          }}
        />
      </div>

      {/* Top-Left Hanging Glass Windchimes */}
      <div
        className="sakura-ornament-wrap windchimes-top-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 'clamp(24px, 3.5vw, 65px)',
          width: 'clamp(110px, 11vw, 190px)',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'chimeSway 4.5s ease-in-out infinite alternate',
          transformOrigin: 'top center',
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/assets/sakura/sakura_windchimes.png'}
          alt="Chuông gió hoa đào"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 8px 20px rgba(200, 90, 120, 0.2))',
            display: 'block',
          }}
        />
      </div>
    </>
  );
};

