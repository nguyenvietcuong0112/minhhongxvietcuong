import React, { useState } from 'react';

/**
 * RsvpSection: Xác nhận tham dự đám cưới (RSVP)
 * Gửi thông tin trực tiếp về Google Sheets qua Apps Script Web App
 */
const RsvpSection = ({ scriptUrl, defaultGuestName = '' }) => {
  const [name, setName] = useState(defaultGuestName);
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('trai'); // 'trai', 'gai', 'both', 'decline'
  const [guestsCount, setGuestsCount] = useState('1'); // '1', '2', '3-4'
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      type: 'rsvp',
      name: trimmedName,
      phone: phone.trim() || 'Chưa cung cấp',
      attendance: attendance,
      guestsCount: guestsCount,
      note: note.trim() || 'Không có ghi chú',
      submittedAt: new Date().toLocaleString('vi-VN'),
    };

    // Optimistic UI confirmation
    setIsSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    // Send to Google Sheets Web App
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Could not post RSVP to Google Sheets:', err);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <section className="invitation-section rsvp-section" id="rsvp">
      {/* Confetti celebration burst */}
      {showConfetti && (
        <div className="confetti-burst-overlay">
          <div className="confetti-toast">
            <span className="toast-icon">💌</span>
            <span>Cảm ơn bạn! Gia đình đã ghi nhận xác nhận tham dự.</span>
          </div>
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className={`confetti-piece c${i % 6}`} style={{ left: `${(i * 3.3) % 100}%` }} />
          ))}
        </div>
      )}

      <div className="section-header">
        <span className="section-badge">RSVP • XÁC NHẬN THAM DỰ</span>
        <h2 className="section-title">Sự Hiện Diện Của Bạn Là Niềm Hạnh Phúc</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">✍️</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          Để hai bên gia đình chuẩn bị đón tiếp chu đáo và nồng hậu nhất, xin quý khách vui lòng xác nhận tham dự trước ngày <strong>15/12/2026</strong>.
        </p>
      </div>

      <div className="rsvp-card-wrapper">
        <div className="rsvp-form-card">
          {isSubmitted ? (
            <div className="rsvp-success-box">
              <span className="success-icon">🎉</span>
              <h3 className="success-title">Xác Nhận Thành Công!</h3>
              <p className="success-name">
                Cảm ơn <strong>{name}</strong> đã gửi phản hồi cho Việt Cường & Minh Hồng.
              </p>
              <div className="success-details">
                <p>
                  Sự kiện: <strong>{attendance === 'both' ? 'Cả 2 ngày (26 & 27/12)' : attendance === 'trai' ? 'Đại Lễ Nhà Trai (27/12)' : attendance === 'gai' ? 'Lễ Ăn Hỏi Nhà Gái (26/12)' : 'Gửi lời chúc mừng từ xa'}</strong>
                </p>
                {attendance !== 'decline' && (
                  <p>Số lượng: <strong>{guestsCount === '1' ? '1 người' : guestsCount === '2' ? '2 người' : 'Gia đình (3-4 người)'}</strong></p>
                )}
              </div>
              <p className="success-sub">Chúng mình rất vinh hạnh và mong chờ được đón tiếp bạn trong ngày vui!</p>
              <button
                type="button"
                className="rsvp-re-edit-btn"
                onClick={() => setIsSubmitted(false)}
              >
                ✏️ Chỉnh sửa lại thông tin
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rsvp-form">
              {/* Name */}
              <div className="rsvp-field">
                <label className="rsvp-label">
                  Họ và tên của bạn / Gia đình <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Anh Nam, Gia đình Bác Hùng..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rsvp-input"
                />
              </div>

              {/* Phone */}
              <div className="rsvp-field">
                <label className="rsvp-label">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  placeholder="Số điện thoại của bạn..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rsvp-input"
                />
              </div>

              {/* Attendance Choice */}
              <div className="rsvp-field">
                <label className="rsvp-label">
                  Bạn sẽ tham dự ngày nào? <span className="req">*</span>
                </label>
                <div className="rsvp-choice-grid">
                  <button
                    type="button"
                    className={`choice-btn ${attendance === 'trai' ? 'active' : ''}`}
                    onClick={() => setAttendance('trai')}
                  >
                    <span className="choice-icon">👑</span>
                    <div className="choice-text">
                      <span className="choice-title">Tiệc Nhà Trai</span>
                      <span className="choice-sub">27.12.2026 (Trống Đồng Palace)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`choice-btn ${attendance === 'gai' ? 'active' : ''}`}
                    onClick={() => setAttendance('gai')}
                  >
                    <span className="choice-icon">🌸</span>
                    <div className="choice-text">
                      <span className="choice-title">Tiệc Nhà Gái</span>
                      <span className="choice-sub">26.12.2026 (Tư gia Cầu Giấy)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`choice-btn ${attendance === 'both' ? 'active' : ''}`}
                    onClick={() => setAttendance('both')}
                  >
                    <span className="choice-icon">💕</span>
                    <div className="choice-text">
                      <span className="choice-title">Cả Hai Ngày</span>
                      <span className="choice-sub">Chung vui trọn vẹn 26 & 27/12</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`choice-btn decline ${attendance === 'decline' ? 'active' : ''}`}
                    onClick={() => setAttendance('decline')}
                  >
                    <span className="choice-icon">💐</span>
                    <div className="choice-text">
                      <span className="choice-title">Không thể tham dự</span>
                      <span className="choice-sub">Gửi lời chúc phúc từ xa</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Guests Count (hidden if decline) */}
              {attendance !== 'decline' && (
                <div className="rsvp-field">
                  <label className="rsvp-label">Số người tham dự</label>
                  <div className="guest-count-options">
                    <button
                      type="button"
                      className={`count-pill ${guestsCount === '1' ? 'active' : ''}`}
                      onClick={() => setGuestsCount('1')}
                    >
                      1 người (Đi một mình)
                    </button>
                    <button
                      type="button"
                      className={`count-pill ${guestsCount === '2' ? 'active' : ''}`}
                      onClick={() => setGuestsCount('2')}
                    >
                      2 người (Đi cùng người thương)
                    </button>
                    <button
                      type="button"
                      className={`count-pill ${guestsCount === '3-4' ? 'active' : ''}`}
                      onClick={() => setGuestsCount('3-4')}
                    >
                      3 - 4 người (Cả gia đình)
                    </button>
                  </div>
                </div>
              )}

              {/* Note / Message */}
              <div className="rsvp-field">
                <label className="rsvp-label">Lời nhắn / Ghi chú gửi Dâu Rể</label>
                <textarea
                  rows={3}
                  placeholder="Gửi lời nhắn hoặc ghi chú cho cô dâu chú rể..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="rsvp-textarea"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="rsvp-submit-btn"
              >
                <span>{isSubmitting ? 'Đang gửi xác nhận...' : '💌 Gửi Xác Nhận Tham Dự'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
