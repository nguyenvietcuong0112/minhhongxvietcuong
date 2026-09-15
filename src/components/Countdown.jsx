import React, { useState, useEffect } from 'react';
import {
  RoyalCornerOrnament,
  DoubleHappinessSymbol,
  DividerFlourish,
} from './Ornaments';

/**
 * Countdown: Real-time countdown timer to the ceremony with blessing couplets.
 */
const Countdown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(data.targetDate || '2026-10-28T09:00:00').getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.targetDate]);

  return (
    <div className="countdown-stage">
      <RoyalCornerOrnament position="top-left" />
      <RoyalCornerOrnament position="top-right" />
      <RoyalCornerOrnament position="bottom-left" />
      <RoyalCornerOrnament position="bottom-right" />

      <div className="countdown-content">
        <DoubleHappinessSymbol size={110} />

        <div className="ceremony-top-badge" style={{ marginTop: '12px' }}>
          <span className="badge-line" />
          <span className="badge-text">ĐẾM NGƯỢC NGÀY CHUNG ĐÔI</span>
          <span className="badge-line" />
        </div>

        <h2 className="countdown-names">
          {data.groomName} <span className="ampersand">&</span> {data.brideName}
        </h2>

        <div className="countdown-cards-container">
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="countdown-unit">NGÀY</div>
          </div>
          <div className="countdown-colon">:</div>
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="countdown-unit">GIỜ</div>
          </div>
          <div className="countdown-colon">:</div>
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="countdown-unit">PHÚT</div>
          </div>
          <div className="countdown-colon">:</div>
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="countdown-unit">GIÂY</div>
          </div>
        </div>

        <DividerFlourish width="360px" />

        <div className="countdown-dates-info">
          <div className="countdown-target-day">
            ✦ {data.dateSolar} ✦ ({data.dateLunar})
          </div>
          <div className="countdown-wish">
            {timeLeft.isPassed
              ? '✨ Hôm nay là ngày hạnh phúc thăng hoa của hai bạn! ✨'
              : '“Nguyện cùng nhau đi qua bao giông bão, trọn đời yêu thương gắn kết bền lâu”'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
