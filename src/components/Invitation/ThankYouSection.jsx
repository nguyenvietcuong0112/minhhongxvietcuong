import React from 'react';

/**
 * ThankYouSection: Fullscreen romantic gratitude closing banner
 * Styled after baoquyenwedding.net #thankyou:
 * Photo background with dark overlay, calligraphy "Lời Cảm Ơn",
 * heartfelt letter from couple, signature names, and TV stage switch button.
 */
const ThankYouSection = ({ groomName = 'Việt Cường', brideName = 'Minh Hồng', onSwitchToStage }) => {
  return (
    <section className="invitation-thank-you-section" id="thankyou" data-aos="fade-up">
      <div className="thankyou-bg-wrap">
        <img
          src={process.env.PUBLIC_URL + '/anh6.jpg'}
          alt="Lời Cảm Ơn"
          className="thankyou-bg-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = process.env.PUBLIC_URL + '/anh1.jpg';
          }}
        />
        <div className="thankyou-overlay" />
      </div>

      <div className="thankyou-content-card" data-aos="zoom-in">
        <span className="thankyou-knot">囍</span>
        <h2 className="thankyou-title font-title">Lời Cảm Ơn</h2>
        
        <div className="thankyou-divider">
          <span className="divider-line" />
          <span className="divider-star">✦</span>
          <span className="divider-line" />
        </div>

        <p className="thankyou-message">
          "Ngày hôm nay thật đặc biệt khi có sự góp mặt của những người bạn, người thân từ xa đến để chia sẻ niềm vui cùng chúng tôi. Chúng tôi xin gửi lời cảm ơn sâu sắc nhất vì sự quan tâm, tình cảm và những lời chúc tốt đẹp mà mọi người đã dành cho hai vợ chồng."
        </p>

        <div className="thankyou-signature">
          <p className="signature-intro">Trân trọng cảm ơn,</p>
          <h3 className="signature-names">{groomName} & {brideName}</h3>
          <p className="signature-date">26 • 27 Tháng 12, 2026</p>
        </div>
      </div>
    </section>
  );
};

export default ThankYouSection;
