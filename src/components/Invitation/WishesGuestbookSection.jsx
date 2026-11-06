import React, { useState, useEffect, useCallback } from 'react';

/**
 * Default starter wishes if Google Sheet is initially empty or offline
 */
const SEED_WISHES = [
  {
    id: 'seed-1',
    name: 'Gia đình Bác Hùng',
    message: 'Chúc hai cháu Việt Cường & Minh Hồng trăm năm hòa hợp, đầu bạc răng long, cùng nhau xây đắp tổ ấm ngập tràn hạnh phúc và tiếng cười! 💕',
    side: 'trai',
    createdAt: 'Hôm qua',
    likes: 12,
  },
  {
    id: 'seed-2',
    name: 'Dì Thu Trang',
    message: 'Mừng ngày vui của hai cháu! Chúc cô dâu Minh Hồng luôn rạng ngời xinh đẹp, chúc chú rể Việt Cường luôn vững vàng chở che cho gia đình nhỏ. Hẹn gặp cả nhà ngày 26 và 27/12 nhé! 🌸',
    side: 'gai',
    createdAt: 'Hôm qua',
    likes: 9,
  },
  {
    id: 'seed-3',
    name: 'Hội Bạn Cấp 3',
    message: 'Cuối cùng thì anh bạn thân Việt Cường cũng rước được nàng về dinh rồi! Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nha 🎉🥂',
    side: 'chung',
    createdAt: 'Vừa xong',
    likes: 15,
  },
];

const QUICK_WISHES = [
  'Trăm năm hạnh phúc, vẹn tròn yêu thương! 💖',
  'Chúc hai bạn sớm đón thiên thần nhỏ! 👶💕',
  'Chúc tân lang tân nương mãi mãi ngọt ngào như ngày đầu! 🥂',
  'Một đời an yên, cùng nhau đi đến đầu bạc răng long! 💐',
];

/**
 * WishesGuestbookSection: Real-time public guestbook connected to Google Sheets
 */
const WishesGuestbookSection = ({ scriptUrl }) => {
  const [wishes, setWishes] = useState(SEED_WISHES);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [likedMap, setLikedMap] = useState({});

  // Form state
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [side, setSide] = useState('chung'); // 'trai', 'gai', 'chung'

  // Fetch wishes from Google Apps Script
  const fetchWishes = useCallback(async () => {
    if (!scriptUrl) return;
    try {
      setLoading(true);
      const res = await fetch(scriptUrl, { method: 'GET' });
      const json = await res.json();
      if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
        // Merge fetched wishes with initial seed wishes so there's always plenty of love
        setWishes(json.data);
      }
    } catch (e) {
      console.warn('Could not fetch wishes from Google Sheets, using cached/seed:', e);
    } finally {
      setLoading(false);
    }
  }, [scriptUrl]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  // Handle wish submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();
    if (!trimmedName || !trimmedMsg || submitting) return;

    setSubmitting(true);

    const newWish = {
      id: 'local-' + Date.now(),
      name: trimmedName,
      message: trimmedMsg,
      side: side,
      createdAt: 'Vừa xong',
      likes: 1,
    };

    // Optimistic UI update: put on top of list immediately
    setWishes((prev) => [newWish, ...prev]);
    setName('');
    setMessage('');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);

    // Send to Google Sheets backend
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Standard Google Apps Script cross-origin posting
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            name: trimmedName,
            message: trimmedMsg,
            side: side,
          }),
        });
        // Silent success: data is written into Google Sheet!
      } catch (err) {
        console.warn('Could not post wish to Google Sheets:', err);
      }
    }

    setSubmitting(false);
  };

  const handleLike = (id) => {
    setLikedMap((prev) => {
      const isLiked = !prev[id];
      setWishes((current) =>
        current.map((w) =>
          w.id === id ? { ...w, likes: (w.likes || 0) + (isLiked ? 1 : -1) } : w
        )
      );
      return { ...prev, [id]: isLiked };
    });
  };

  return (
    <section className="invitation-section wishes-section" id="wishes">
      {/* Confetti celebration bursts */}
      {showConfetti && (
        <div className="confetti-burst-overlay">
          <div className="confetti-toast">
            <span className="toast-icon">💖</span>
            <span>Cảm ơn bạn đã gửi lời chúc phúc ngọt ngào!</span>
          </div>
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className={`confetti-piece c${i % 6}`} style={{ left: `${(i * 3.3) % 100}%` }} />
          ))}
        </div>
      )}

      <div className="section-header">
        <span className="section-badge">SỔ LƯU BÚT YÊU THƯƠNG</span>
        <h2 className="section-title">Gửi Lời Chúc Phúc Đến Dâu Rể</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">💌</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          Mỗi lời chúc chân thành của quý khách là món quà quý giá đồng hành cùng Việt Cường & Minh Hồng trên hành trình hôn nhân.
        </p>
      </div>

      <div className="wishes-dual-grid">
        {/* Left Column: Form to Write Wish */}
        <div className="wish-form-card">
          <h3 className="form-card-title">
            <span>✍️</span> Để Lại Lời Chúc
          </h3>

          <form onSubmit={handleSubmit} className="wish-actual-form">
            <div className="wish-field-group">
              <label className="wish-label">Họ và tên của bạn / Gia đình *</label>
              <input
                type="text"
                className="wish-input"
                placeholder="VD: Tuấn Anh, Gia đình Bác Hùng..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="wish-field-group">
              <label className="wish-label">Bạn là khách của ai?</label>
              <div className="side-select-buttons">
                <button
                  type="button"
                  className={`side-chip-btn ${side === 'trai' ? 'active' : ''}`}
                  onClick={() => setSide('trai')}
                >
                  👑 Khách Nhà Trai
                </button>
                <button
                  type="button"
                  className={`side-chip-btn ${side === 'gai' ? 'active' : ''}`}
                  onClick={() => setSide('gai')}
                >
                  🌸 Khách Nhà Gái
                </button>
                <button
                  type="button"
                  className={`side-chip-btn ${side === 'chung' ? 'active' : ''}`}
                  onClick={() => setSide('chung')}
                >
                  💑 Bạn Chung
                </button>
              </div>
            </div>

            {/* Quick Wish Suggestion Chips */}
            <div className="wish-field-group">
              <label className="wish-label">Gợi ý câu chúc nhanh:</label>
              <div className="quick-wishes-chips">
                {QUICK_WISHES.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quick-chip"
                    onClick={() => setMessage(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="wish-field-group">
              <label className="wish-label">Nội dung lời chúc *</label>
              <textarea
                className="wish-textarea"
                rows="4"
                placeholder="Gửi gắm những lời chúc tốt đẹp nhất đến tân lang và tân nương..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="wish-submit-btn"
              disabled={submitting || !name.trim() || !message.trim()}
            >
              {submitting ? 'Đang gửi...' : '💌 GỬI LỜI CHÚC MỪNG'}
            </button>
          </form>
        </div>

        {/* Right Column: Live Feed of Wishes */}
        <div className="wishes-feed-card">
          <div className="feed-header-row">
            <h3 className="feed-title">
              <span>📜</span> Lời Chúc Nhận Được
            </h3>
            <button
              type="button"
              className="feed-refresh-btn"
              onClick={fetchWishes}
              title="Làm mới lời chúc"
            >
              🔄 {loading ? 'Đang tải...' : 'Làm mới'}
            </button>
          </div>

          <div className="wishes-scroll-box">
            {wishes.map((item, idx) => {
              const isLiked = !!likedMap[item.id];
              return (
                <div key={item.id || idx} className="wish-bubble-card">
                  <div className="bubble-top-row">
                    <div className="author-wrap">
                      <span className="author-avatar-icon">
                        {item.side === 'trai' ? '👑' : item.side === 'gai' ? '🌸' : '💖'}
                      </span>
                      <div className="author-meta">
                        <span className="author-name">{item.name}</span>
                        <span className={`author-side-tag ${item.side || 'chung'}`}>
                          {item.side === 'trai' ? 'Nhà Trai' : item.side === 'gai' ? 'Nhà Gái' : 'Bạn Chung'}
                        </span>
                      </div>
                    </div>
                    <span className="wish-time-text">{item.createdAt || 'Vừa xong'}</span>
                  </div>

                  <p className="wish-text-content">{item.message}</p>

                  <div className="bubble-bottom-row">
                    <button
                      type="button"
                      className={`wish-like-btn ${isLiked ? 'liked' : ''}`}
                      onClick={() => handleLike(item.id)}
                    >
                      <span className="like-heart">{isLiked ? '❤️' : '🤍'}</span>
                      <span className="like-count">{item.likes || 1}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesGuestbookSection;
