import React from 'react';

/**
 * CoupleIntroSection: Inspired by "Nét Ký Yêu Thương" editorial template:
 * - Warm paper negative space (no heavy borders or boxy overlays on photos)
 * - Handwritten couple signature + minimalist bow flourish
 * - True staggered side-by-side checkerboard: Groom photo left + open-paper family details right,
 *   followed by Bride family details left + Bride photo right (always hips-up framing).
 */
const CoupleIntroSection = ({ groom, bride }) => {
  return (
    <section className="invitation-section couple-intro-section nk-couple-section" id="about" data-aos="fade-up">
      {/* Minimalist Bow + Handwritten Couple Signature Opener */}
      <div className="nk-signature-header">
        <div className="nk-bow-wrap" data-aos="zoom-in" aria-hidden="true">
          <svg width="42" height="24" viewBox="0 0 42 24" fill="none">
            <path
              d="M21 12C15 5 4.5 2.5 3.5 9C2.6 14 12.2 15.5 21 12ZM21 12C27 5 37.5 2.5 38.5 9C39.4 14 29.8 15.5 21 12Z"
              stroke="#B07A7A"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M21 12L15.5 22M21 12L26.5 22" stroke="#B07A7A" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="21" cy="12" r="2.2" fill="#FAF6F0" stroke="#B07A7A" strokeWidth="1.3" />
          </svg>
        </div>

        <div className="nk-signature-names">
          <span className="nk-sig-word" data-aos="fade-down">
            {groom.shortName || 'Việt Cường'}
          </span>
          <span className="nk-sig-amp" data-aos="zoom-in" data-aos-delay="100">&amp;</span>
          <span className="nk-sig-word" data-aos="fade-up" data-aos-delay="150">
            {bride.shortName || 'Minh Hồng'}
          </span>
        </div>

        <p className="nk-journey-sub" data-aos="fade-up" data-aos-delay="200">
          Một hành trình mới lại bắt đầu
        </p>
      </div>

      {/* True Side-by-Side Staggered Editorial Checkerboard (Groom Left/Text Right -> Text Left/Bride Right) */}
      <div className="nk-staggered-grid">
        {/* ROW 1: Photo Left + Nhà Trai Open Paper Details Right */}
        <div className="nk-row nk-row-groom">
          <div className="nk-photo-frame" data-aos="fade-right">
            <img
              src={groom.avatar || process.env.PUBLIC_URL + '/photos/HUY02043.jpg'}
              alt={groom.fullName || 'Nguyễn Việt Cường'}
              className="nk-portrait-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = process.env.PUBLIC_URL + '/photos/HUY02043.jpg';
              }}
            />
          </div>

          <div className="nk-family-info" data-aos="fade-left" data-aos-delay="120">
            <h3 className="nk-house-heading">NHÀ TRAI</h3>
            <span className="nk-dotted-rule" aria-hidden="true" />
            <div className="nk-parents-lines">
              <p>Ông: <strong>{groom.father || 'Nguyễn Xuân Tường'}</strong></p>
              <p>Bà: <strong>{groom.mother || 'Nguyễn Thị Cương'}</strong></p>
            </div>
            <p className="nk-house-location">Thôn Bầu, Thiên Lộc, Hà Nội</p>
            <div className="nk-child-name-block">
              <span className="nk-role-caption">Chú Rể • Trưởng Nam</span>
              <strong className="nk-person-script">{groom.fullName || 'Nguyễn Việt Cường'}</strong>
            </div>
            {groom.phone && (
              <a href={`tel:${groom.phone.replace(/\s+/g, '')}`} className="nk-phone-link">
                <span>📞 {groom.phone}</span>
              </a>
            )}
          </div>
        </div>

        {/* ROW 2: Nhà Gái Open Paper Details Left + Photo Right (Staggered Reversed) */}
        <div className="nk-row nk-row-bride">
          <div className="nk-family-info align-right" data-aos="fade-right" data-aos-delay="120">
            <h3 className="nk-house-heading">NHÀ GÁI</h3>
            <span className="nk-dotted-rule" aria-hidden="true" />
            <div className="nk-parents-lines">
              <p>Ông: <strong>{bride.father || 'Lê Hồng Minh'}</strong></p>
              <p>Bà: <strong>{bride.mother || 'Lê Thị Mừng'}</strong></p>
            </div>
            <p className="nk-house-location">Thôn Bầu, Thiên Lộc, Hà Nội</p>
            <div className="nk-child-name-block">
              <span className="nk-role-caption">Cô Dâu • Út Nữ</span>
              <strong className="nk-person-script">{bride.fullName || 'Lê Minh Hồng'}</strong>
            </div>
            {bride.phone && (
              <a href={`tel:${bride.phone.replace(/\s+/g, '')}`} className="nk-phone-link">
                <span>📞 {bride.phone}</span>
              </a>
            )}
          </div>

          <div className="nk-photo-frame" data-aos="fade-left">
            <img
              src={bride.avatar || process.env.PUBLIC_URL + '/photos/HUY00367.jpg'}
              alt={bride.fullName || 'Lê Minh Hồng'}
              className="nk-portrait-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = process.env.PUBLIC_URL + '/photos/HUY00367.jpg';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleIntroSection;
