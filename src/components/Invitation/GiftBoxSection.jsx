import React, { useState } from 'react';

/**
 * GiftBoxSection: Respectful wedding gift box & VietQR transfer
 * (Hộp Mừng Cưới & Gửi Mừng Hạnh Phúc)
 */
const GiftBoxSection = ({ groom, bride, dressCode }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }).catch(() => {
      // Fallback
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  return (
    <section className="invitation-section gift-box-section" id="gift">
      <div className="section-header">
        <span className="section-badge">HỘP MỪNG CƯỚI</span>
        <h2 className="section-title">Gửi Mừng Hạnh Phúc</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">🎁</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          Sự hiện diện và lời chúc phúc của quý khách là niềm vinh hạnh lớn nhất của chúng mình.
          Dành cho những người thân, bạn bè ở xa không thể tham dự trực tiếp:
        </p>
      </div>

      <div className="gift-cards-row">
        {/* Groom Card */}
        <div className="gift-account-card groom-card">
          <div className="gift-card-badge">👑 CHÚ RỂ</div>
          <h3 className="gift-person-name">{groom.fullName}</h3>

          <div className="gift-qr-wrapper">
            <img
              src={groom.qrUrl}
              alt="Mã QR Chú rể"
              className="gift-qr-img"
              loading="lazy"
            />
          </div>

          <div className="gift-bank-details">
            <p className="bank-name">Ngân hàng: <strong>{groom.bank}</strong></p>
            <p className="account-number">
              STK: <strong className="stk-highlight">{groom.accountNumber}</strong>
            </p>
            <p className="account-holder">Chủ TK: {groom.accountName}</p>
          </div>

          <button
            type="button"
            className={`copy-stk-btn ${copiedKey === 'groom' ? 'copied' : ''}`}
            onClick={() => handleCopy(groom.accountNumber, 'groom')}
          >
            {copiedKey === 'groom' ? '✓ Đã sao chép STK!' : '📋 Sao Chép Số Tài Khoản'}
          </button>
        </div>

        {/* Bride Card */}
        <div className="gift-account-card bride-card">
          <div className="gift-card-badge">🌸 CÔ DÂU</div>
          <h3 className="gift-person-name">{bride.fullName}</h3>

          <div className="gift-qr-wrapper">
            <img
              src={bride.qrUrl}
              alt="Mã QR Cô dâu"
              className="gift-qr-img"
              loading="lazy"
            />
          </div>

          <div className="gift-bank-details">
            <p className="bank-name">Ngân hàng: <strong>{bride.bank}</strong></p>
            <p className="account-number">
              STK: <strong className="stk-highlight">{bride.accountNumber}</strong>
            </p>
            <p className="account-holder">Chủ TK: {bride.accountName}</p>
          </div>

          <button
            type="button"
            className={`copy-stk-btn ${copiedKey === 'bride' ? 'copied' : ''}`}
            onClick={() => handleCopy(bride.accountNumber, 'bride')}
          >
            {copiedKey === 'bride' ? '✓ Đã sao chép STK!' : '📋 Sao Chép Số Tài Khoản'}
          </button>
        </div>
      </div>

      {/* Dress Code Section */}
      {dressCode && dressCode.length > 0 && (
        <div className="dress-code-box">
          <h4 className="dress-code-title">👗 GỢI Ý MÀU SẮC TRANG PHỤC (DRESS CODE)</h4>
          <p className="dress-code-subtitle">Để có những bức ảnh kỷ niệm tuyệt đẹp và đồng điệu cùng concept đám cưới:</p>
          <div className="dress-palette-row">
            {dressCode.map((item, idx) => (
              <div key={idx} className="palette-item">
                <span
                  className="palette-color-circle"
                  style={{
                    backgroundColor: item.color,
                    border: `2px solid ${item.border || '#cbd5e1'}`,
                  }}
                />
                <span className="palette-color-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftBoxSection;
