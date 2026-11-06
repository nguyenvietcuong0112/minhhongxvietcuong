import React from 'react';
import AnimatedWeddingRings from '../AnimatedWeddingRings';

/**
 * InvitationHero: The grand entrance hero banner of the wedding invitation
 */
const InvitationHero = ({ data, onScrollTo, guestName = '' }) => {
  const groom = data.groom || {};
  const bride = data.bride || {};

  return (
    <header className="invitation-hero">
      {/* Background radial gradient & ambient bokeh lights */}
      <div className="hero-ambient-lights" />

      {/* Decorative Traditional Border Ornament */}
      <div className="hero-top-badge">
        <span className="badge-flourish">❖</span>
        <span className="badge-text">THIỆP MỜI BÁO HỶ</span>
        <span className="badge-flourish">❖</span>
      </div>

      {/* Formal Family Introduction */}
      <div className="hero-family-grid">
        <div className="family-col groom-family">
          <p className="family-label">NHÀ TRAI</p>
          <p className="parents-name">Ông: <strong>{groom.father}</strong></p>
          <p className="parents-name">Bà: <strong>{groom.mother}</strong></p>
        </div>

        <div className="family-knot-divider">
          <span className="gold-knot">囍</span>
        </div>

        <div className="family-col bride-family">
          <p className="family-label">NHÀ GÁI</p>
          <p className="parents-name">Ông: <strong>{bride.father}</strong></p>
          <p className="parents-name">Bà: <strong>{bride.mother}</strong></p>
        </div>
      </div>

      {/* Personalized Guest Invitation Card */}
      <div className="hero-guest-invitation-card">
        <span className="guest-card-label">TRÂN TRỌNG KÍNH MỜI</span>
        <h2 className="guest-card-name">
          {guestName || 'Quý Khách & Gia Đình'}
        </h2>
        <p className="guest-card-sub">
          Đến chung vui cùng gia đình chúng tôi tại lễ thành hôn của
        </p>
      </div>

      {/* Couple Showcase Centerpiece */}
      <div className="hero-couple-showcase">
        <div className="hero-person groom-side">
          <span className="person-role">{groom.role || 'Trưởng Nam'}</span>
          <h1 className="person-fullname">{groom.fullName || 'Nguyễn Việt Cường'}</h1>
        </div>

        <div className="hero-rings-emblem">
          <AnimatedWeddingRings size={95} />
        </div>

        <div className="hero-person bride-side">
          <span className="person-role">{bride.role || 'Út Nữ'}</span>
          <h1 className="person-fullname">{bride.fullName || 'Trần Minh Hồng'}</h1>
        </div>
      </div>

      {/* Hero Featured Photo Arch */}
      <div className="hero-photo-arch-wrap">
        <div className="hero-arch-frame">
          <img
            src={process.env.PUBLIC_URL + '/anh6.jpg'}
            alt="Việt Cường & Minh Hồng"
            className="hero-couple-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = process.env.PUBLIC_URL + '/anh1.jpg';
            }}
          />
        </div>
        <div className="hero-date-ribbon">
          <span className="ribbon-solar">26 • 27 THÁNG 12, 2026</span>
          <span className="ribbon-lunar">(18 • 19 Tháng 11 Bính Ngọ)</span>
        </div>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <nav className="hero-quick-nav">
        <button type="button" onClick={() => onScrollTo('calendar')} className="nav-chip">
          <span>📅 Lịch Đánh Dấu</span>
        </button>
        <button type="button" onClick={() => onScrollTo('schedule')} className="nav-chip">
          <span>⏰ Lịch Trình</span>
        </button>
        <button type="button" onClick={() => onScrollTo('rsvp')} className="nav-chip rsvp-chip">
          <span>✍️ Xác Nhận RSVP</span>
        </button>
        <button type="button" onClick={() => onScrollTo('story')} className="nav-chip">
          <span>💍 Chuyện Tình Yêu</span>
        </button>
        <button type="button" onClick={() => onScrollTo('gallery')} className="nav-chip">
          <span>📸 Album Ảnh</span>
        </button>
        <button type="button" onClick={() => onScrollTo('wishes')} className="nav-chip highlight">
          <span>💌 Gửi Lời Chúc</span>
        </button>
        <button type="button" onClick={() => onScrollTo('gift')} className="nav-chip">
          <span>🎁 Mừng Cưới</span>
        </button>
      </nav>
    </header>
  );
};

export default InvitationHero;
