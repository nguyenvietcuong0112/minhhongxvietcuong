import React, { useState, useEffect } from 'react';

/**
 * CountdownTimer: Live countdown clock to the wedding date
 * Displays Days, Hours, Minutes, Seconds with soft glowing glass cards.
 */
const CountdownTimer = ({ targetDate, title = 'Cùng đếm ngược đến ngày chung đôi' }) => {
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
    <div className="countdown-container">
      {title && <p className="countdown-subtitle">{title}</p>}
      <div className="countdown-units-row">
        <div className="countdown-unit-card">
          <span className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">NGÀY</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-unit-card">
          <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">GIỜ</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-unit-card">
          <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">PHÚT</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-unit-card highlight">
          <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">GIÂY</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
