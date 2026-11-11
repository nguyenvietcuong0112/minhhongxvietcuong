import React from 'react';

/**
 * CoupleIntroSection: The Groom & The Bride
 * Styled after baoquyenwedding.net #about section:
 * Arch-shaped portrait cards with frosted glass bottom banners,
 * calligraphy roles, full names, parents info, and contact links.
 */
const CoupleIntroSection = ({ groom, bride }) => {
  return (
    <section className="invitation-section couple-intro-section" id="about" data-aos="fade-up">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-badge">CẶP ĐÔI UYÊN ƯƠNG</span>
        <h2 className="section-title">Đám Cưới Của</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">囍</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          "Trải qua những ngày mưa gió và nắng ấm, tình yêu ấy vẫn luôn dịu dàng,
          như chính cách họ dành cho nhau từng quan tâm nhỏ nhặt nhất."
        </p>
      </div>

      {/* Two Arched Portrait Cards */}
      <div className="couple-cards-grid">
        {/* The Groom Card */}
        <div className="couple-arch-card groom-card" data-aos="fade-left">
          <div className="arch-media-wrap">
            <img
              src={groom.avatar || process.env.PUBLIC_URL + '/anh1.jpg'}
              alt={groom.fullName || 'Nguyễn Việt Cường'}
              className="arch-portrait-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = process.env.PUBLIC_URL + '/anh1.jpg';
              }}
            />
            {/* Frosted Glass Banner Overlay */}
            <div className="arch-glass-banner groom-banner">
              <span className="arch-role-script">The Groom</span>
              <h3 className="arch-person-name">{groom.fullName || 'Nguyễn Việt Cường'}</h3>
              <p className="arch-person-subrole">{groom.role || 'Trưởng Nam'}</p>
              <div className="arch-parents-info">
                <p>Con ông: <strong>{groom.father || 'Nguyễn Văn Hùng'}</strong></p>
                <p>Con bà: <strong>{groom.mother || 'Lê Thị Thu'}</strong></p>
              </div>
              {groom.phone && (
                <a href={`tel:${groom.phone.replace(/\s+/g, '')}`} className="arch-contact-btn">
                  <span className="btn-icon">📞</span>
                  <span>{groom.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* The Bride Card */}
        <div className="couple-arch-card bride-card" data-aos="fade-right">
          <div className="arch-media-wrap">
            <img
              src={bride.avatar || process.env.PUBLIC_URL + '/anh2.jpg'}
              alt={bride.fullName || 'Trần Minh Hồng'}
              className="arch-portrait-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = process.env.PUBLIC_URL + '/anh2.jpg';
              }}
            />
            {/* Frosted Glass Banner Overlay */}
            <div className="arch-glass-banner bride-banner">
              <span className="arch-role-script">The Bride</span>
              <h3 className="arch-person-name">{bride.fullName || 'Trần Minh Hồng'}</h3>
              <p className="arch-person-subrole">{bride.role || 'Út Nữ'}</p>
              <div className="arch-parents-info">
                <p>Con ông: <strong>{bride.father || 'Trần Đình Kiên'}</strong></p>
                <p>Con bà: <strong>{bride.mother || 'Phạm Thị Lan'}</strong></p>
              </div>
              {bride.phone && (
                <a href={`tel:${bride.phone.replace(/\s+/g, '')}`} className="arch-contact-btn">
                  <span className="btn-icon">📞</span>
                  <span>{bride.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleIntroSection;
