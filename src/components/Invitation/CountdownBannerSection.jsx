import React, { useState, useEffect } from 'react';

/**
 * CountdownBannerSection: Fullscreen/Wide Countdown Banner
 * Styled after baoquyenwedding.net #invitation .countdown:
 * Rounded top corners (48px), background photo with dark overlay,
 * pulsing heart icon, 4 glassmorphic countdown boxes, and romantic quote.
 */
const CountdownBannerSection = ({ targetDate = '2026-12-26T08:30:00+07:00' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="invitation-countdown-banner" id="countdown" data-aos="fade-up">
      {/* Background Image with Dark Tint */}
      <div className="countdown-banner-bg">
        <img
          src={process.env.PUBLIC_URL + '/anh5.jpg'}
          alt="Đếm ngược ngày cưới"
          className="countdown-bg-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = process.env.PUBLIC_URL + '/anh6.jpg';
          }}
        />
        <div className="countdown-bg-overlay" />
      </div>

      <div className="countdown-banner-content">
        {/* Pulsing Song Hỷ Medallion */}
        <div className="countdown-heart-wrap">
          <span className="countdown-heart-icon animate-pulse">🏮 囍 🏮</span>
        </div>

        <h3 className="countdown-banner-title font-script" data-aos="fade-up">
          Cùng Đếm Ngược Đến Giờ Phút Thiêng Liêng
        </h3>

        {/* 4 Glassmorphism Countdown Boxes with Gold Borders */}
        <div className="countdown-boxes-grid">
          <div className="countdown-box" data-aos="zoom-in" data-aos-delay="100">
            <span className="box-number">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="box-label">Ngày</span>
          </div>
          <div className="countdown-box" data-aos="zoom-in" data-aos-delay="200">
            <span className="box-number">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="box-label">Giờ</span>
          </div>
          <div className="countdown-box" data-aos="zoom-in" data-aos-delay="300">
            <span className="box-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="box-label">Phút</span>
          </div>
          <div className="countdown-box highlight" data-aos="zoom-in" data-aos-delay="400">
            <span className="box-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="box-label">Giây</span>
          </div>
        </div>

        {/* Auspicious Couple Quote */}
        <div className="countdown-quote-wrap" data-aos="fade-up">
          <p className="countdown-quote">
            "Trăm năm tình viên mãn • Bạc đầu nghĩa phu thê"<br />
            Hân hoan chào đón ngày vui trăm năm của Việt Cường & Minh Hồng
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountdownBannerSection;
