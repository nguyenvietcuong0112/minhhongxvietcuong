import React from 'react';

/**
 * Shared SVG Gradients Definition
 */
export const GoldSvgDefs = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
    <defs>
      {/* Premium Metallic Gold Linear Gradient */}
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="25%" stopColor="#F5D061" />
        <stop offset="50%" stopColor="#E5B233" />
        <stop offset="75%" stopColor="#FCE794" />
        <stop offset="100%" stopColor="#C99420" />
      </linearGradient>

      {/* Radiant Rose Gold Gradient */}
      <linearGradient id="roseGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFDEE9" />
        <stop offset="35%" stopColor="#F5A3B7" />
        <stop offset="70%" stopColor="#DF738D" />
        <stop offset="100%" stopColor="#B33951" />
      </linearGradient>

      {/* Radiant Gold Horizontal Gradient */}
      <linearGradient id="goldHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E5B233" stopOpacity="0" />
        <stop offset="20%" stopColor="#F5D061" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#FFF8D6" stopOpacity="1" />
        <stop offset="80%" stopColor="#F5D061" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#E5B233" stopOpacity="0" />
      </linearGradient>

      {/* Soft Rose Glow */}
      <radialGradient id="roseGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#F48FB1" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#C2185B" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Botanical Leaf & Floral Branch Ornament for Corners
 * (Exact match to the luxury TV wedding backdrop in user uploaded reference)
 */
export const BotanicalBranchOrnament = ({ position = 'top-left' }) => {
  let style = { position: 'absolute', zIndex: 1, pointerEvents: 'none', opacity: 0.85 };
  let transform = '';

  if (position === 'top-left') {
    style.top = '10px';
    style.left = '10px';
  } else if (position === 'top-right') {
    style.top = '10px';
    style.right = '10px';
    transform = 'scaleX(-1)';
  } else if (position === 'bottom-left') {
    style.bottom = '10px';
    style.left = '10px';
    transform = 'scaleY(-1)';
  } else if (position === 'bottom-right') {
    style.bottom = '10px';
    style.right = '10px';
    transform = 'scale(-1, -1)';
  }

  return (
    <div style={{ ...style, transform }} className="botanical-ornament">
      <svg
        width="160"
        height="160"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
      >
        {/* Main curved vine stem */}
        <path
          d="M 12 188 C 24 130 55 60 188 12"
          stroke="url(#goldGradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 8 192 C 16 145 42 75 160 20"
          stroke="url(#goldGradient)"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />

        {/* Intricate leaves sprouting along the branch */}
        {/* Leaf 1 */}
        <path
          d="M 50 110 C 35 95 36 78 54 82 C 68 85 64 102 50 110 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="url(#goldGradient)"
          fillOpacity="0.15"
        />
        <path d="M 50 110 L 46 86" stroke="url(#goldGradient)" strokeWidth="1" />

        {/* Leaf 2 */}
        <path
          d="M 75 88 C 70 68 82 54 95 65 C 102 74 94 92 75 88 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="url(#goldGradient)"
          fillOpacity="0.15"
        />
        <path d="M 75 88 L 86 66" stroke="url(#goldGradient)" strokeWidth="1" />

        {/* Leaf 3 */}
        <path
          d="M 112 62 C 105 42 120 28 135 40 C 142 50 132 68 112 62 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="url(#goldGradient)"
          fillOpacity="0.15"
        />
        <path d="M 112 62 L 124 40" stroke="url(#goldGradient)" strokeWidth="1" />

        {/* Leaf 4 */}
        <path
          d="M 148 38 C 146 20 162 10 174 22 C 180 32 168 46 148 38 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="url(#goldGradient)"
          fillOpacity="0.15"
        />

        {/* Delicate floral buds / berries */}
        <circle cx="34" cy="140" r="3.5" fill="url(#goldGradient)" />
        <circle cx="28" cy="155" r="2.5" fill="url(#goldGradient)" />
        <circle cx="168" cy="30" r="3" fill="url(#goldGradient)" />
        <circle cx="184" cy="18" r="2.5" fill="url(#goldGradient)" />
      </svg>
    </div>
  );
};

/**
 * Royal Corner Flourish
 */
export const RoyalCornerOrnament = ({ position = 'top-left' }) => {
  return <BotanicalBranchOrnament position={position} />;
};

/**
 * Double Happiness Symbol (囍) with Auspicious Tassel / Knot
 * (Exact match to reference photo 1, 2, and 3)
 */
export const DoubleHappinessSymbol = ({ size = 90 }) => {
  return (
    <div
      className="double-happiness-container"
      style={{
        width: size,
        height: size * 1.25,
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="happiness-svg"
        style={{ filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.45))' }}
      >
        {/* Outer Radiant Gold Medallion Halo */}
        <circle
          cx="80"
          cy="74"
          r="66"
          fill="rgba(168, 32, 53, 0.95)"
          stroke="url(#goldGradient)"
          strokeWidth="3.5"
        />
        <circle
          cx="80"
          cy="74"
          r="60"
          stroke="#F5D061"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <circle
          cx="80"
          cy="74"
          r="56"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          strokeOpacity="0.8"
        />

        {/* High-Contrast Bold Traditional Double Happiness 囍 */}
        <g fill="url(#goldGradient)" stroke="#FFF4B8" strokeWidth="0.8">
          {/* === LEFT 喜 === */}
          <rect x="40" y="44" width="34" height="4.5" rx="1.5" />
          <rect x="54.5" y="38" width="4.5" height="15" rx="1.5" />

          {/* Middle Mouth */}
          <path d="M 43 56 H 71 V 68 H 43 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
          <rect x="48" y="59" width="18" height="6" fill="#A82035" stroke="none" />

          {/* Middle Bar */}
          <rect x="38" y="71" width="38" height="4.5" rx="1.5" />
          <rect x="45" y="74" width="4" height="12" rx="1" />
          <rect x="64" y="74" width="4" height="12" rx="1" />
          <rect x="40" y="85" width="34" height="4.5" rx="1.5" />

          {/* Bottom Mouth */}
          <path d="M 42 93 H 72 V 109 H 42 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="3.2" />
          <rect x="47" y="98" width="20" height="8" fill="#A82035" stroke="none" />

          {/* === RIGHT 喜 === */}
          <rect x="86" y="44" width="34" height="4.5" rx="1.5" />
          <rect x="100.5" y="38" width="4.5" height="15" rx="1.5" />

          {/* Middle Mouth */}
          <path d="M 89 56 H 117 V 68 H 89 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />
          <rect x="94" y="59" width="18" height="6" fill="#A82035" stroke="none" />

          {/* Middle Bar */}
          <rect x="84" y="71" width="38" height="4.5" rx="1.5" />
          <rect x="91" y="74" width="4" height="12" rx="1" />
          <rect x="110" y="74" width="4" height="12" rx="1" />
          <rect x="86" y="85" width="34" height="4.5" rx="1.5" />

          {/* Bottom Mouth */}
          <path d="M 88 93 H 118 V 109 H 88 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="3.2" />
          <rect x="93" y="98" width="20" height="8" fill="#A82035" stroke="none" />

          {/* Connecting Links */}
          <rect x="73" y="58" width="14" height="4.5" rx="1" />
          <rect x="73" y="78" width="14" height="4.5" rx="1" />
          <rect x="73" y="98" width="14" height="4.5" rx="1" />
        </g>

        {/* Traditional Auspicious Knot (Nút thắt đồng tâm) hanging below */}
        <g stroke="url(#goldGradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Connector loop */}
          <line x1="80" y1="140" x2="80" y2="148" />

          {/* Interlocking Diamond Knot */}
          <path d="M 80 148 L 92 160 L 80 172 L 68 160 Z" fill="rgba(168, 32, 53, 0.8)" />
          <circle cx="80" cy="160" r="3" fill="url(#goldGradient)" />

          {/* Side loops */}
          <path d="M 68 160 C 58 152 58 168 68 160" />
          <path d="M 92 160 C 102 152 102 168 92 160" />

          {/* Silk Tassels */}
          <line x1="74" y1="172" x2="74" y2="194" strokeWidth="1.8" />
          <line x1="80" y1="172" x2="80" y2="198" strokeWidth="2.2" />
          <line x1="86" y1="172" x2="86" y2="194" strokeWidth="1.8" />

          {/* Tassel beads */}
          <circle cx="74" cy="194" r="2" fill="url(#goldGradient)" />
          <circle cx="80" cy="198" r="2.5" fill="url(#goldGradient)" />
          <circle cx="86" cy="194" r="2" fill="url(#goldGradient)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Lotus Crown Flourish with Horizontal Gold Line
 * (Exact match above/below 'Lễ Dạm Ngõ' in user reference 1)
 */
export const LotusCrownFlourish = ({ width = '360px' }) => {
  return (
    <div
      style={{
        width,
        maxWidth: '85vw',
        height: '24px',
        margin: '6px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="100%"
        height="24"
        viewBox="0 0 360 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left gold line */}
        <line
          x1="10"
          y1="12"
          x2="150"
          y2="12"
          stroke="url(#goldHorizontal)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Right gold line */}
        <line
          x1="210"
          y1="12"
          x2="350"
          y2="12"
          stroke="url(#goldHorizontal)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Central Royal Lotus Petal Motif */}
        <path
          d="M 180 3 C 176 8 174 12 174 15 C 174 18 177 20 180 21 C 183 20 186 18 186 15 C 186 12 184 8 180 3 Z"
          fill="url(#goldGradient)"
        />
        {/* Left petal */}
        <path
          d="M 174 10 C 168 12 165 16 166 19 C 169 20 173 18 175 16 Z"
          fill="url(#goldGradient)"
        />
        {/* Right petal */}
        <path
          d="M 186 10 C 192 12 195 16 194 19 C 191 20 187 18 185 16 Z"
          fill="url(#goldGradient)"
        />

        {/* Accompanying pearls */}
        <circle cx="160" cy="12" r="2.2" fill="url(#goldGradient)" />
        <circle cx="200" cy="12" r="2.2" fill="url(#goldGradient)" />
      </svg>
    </div>
  );
};

export const DividerFlourish = ({ width = '360px' }) => {
  return <LotusCrownFlourish width={width} />;
};
