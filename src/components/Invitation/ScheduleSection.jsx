import React from 'react';
import CountdownTimer from './CountdownTimer';

/**
 * ScheduleSection: 2-Day Wedding Event Schedule
 * Supports switching between:
 * - Ngày 26/12/2026: LỄ ĂN HỎI & TIỆC MỪNG TẠI NHÀ GÁI (18.11 Âm Lịch)
 * - Ngày 27/12/2026: ĐẠI LỄ THÀNH HÔN & TIỆC CƯỚI TẠI NHÀ TRAI (19.11 Âm Lịch)
 */
const ScheduleSection = ({ schedule, activeTab, onTabChange }) => {
  const currentKey = activeTab || 'trai'; // 'trai' or 'gai'
  const activeDay = currentKey === 'gai' ? schedule.day1 : schedule.day2;

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (day) => {
    const isDay1 = day.key === 'gai';
    const title = encodeURIComponent(
      isDay1
        ? 'Lễ Ăn Hỏi & Dự Tiệc - Việt Cường & Minh Hồng'
        : 'Đại Lễ Thành Hôn & Tiệc Cưới - Việt Cường & Minh Hồng'
    );
    const details = encodeURIComponent(
      `Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi tại ${day.venueName}.`
    );
    const location = encodeURIComponent(day.venueAddress);
    // 2026-12-26 or 2026-12-27
    const dates = isDay1
      ? '20261226T013000Z/20261226T070000Z'
      : '20261227T040000Z/20261227T080000Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  return (
    <section className="invitation-section schedule-section" id="schedule">
      <div className="section-header">
        <span className="section-badge">LỊCH TRÌNH HÔN LỄ</span>
        <h2 className="section-title">Thời Gian & Địa Điểm Tổ Chức</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">囍</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          Đám cưới của chúng mình diễn ra trong 2 ngày thiêng liêng. Quý khách vui lòng chọn xem tiệc phù hợp bên dưới:
        </p>
      </div>

      {/* 2-Day Tab Switcher */}
      <div className="schedule-tabs-container">
        <button
          type="button"
          className={`schedule-tab-btn ${currentKey === 'trai' ? 'active' : ''}`}
          onClick={() => onTabChange('trai')}
        >
          <span className="tab-icon">👑</span>
          <div className="tab-text-wrap">
            <span className="tab-label">TIỆC NHÀ TRAI</span>
            <span className="tab-date">27.12.2026 (19.11 ÂL)</span>
          </div>
          {currentKey === 'trai' && <span className="tab-active-dot" />}
        </button>

        <button
          type="button"
          className={`schedule-tab-btn ${currentKey === 'gai' ? 'active' : ''}`}
          onClick={() => onTabChange('gai')}
        >
          <span className="tab-icon">🌸</span>
          <div className="tab-text-wrap">
            <span className="tab-label">TIỆC NHÀ GÁI</span>
            <span className="tab-date">26.12.2026 (18.11 ÂL)</span>
          </div>
          {currentKey === 'gai' && <span className="tab-active-dot" />}
        </button>
      </div>

      {/* Main Schedule Showcase Card */}
      <div className="schedule-card-main">
        {/* Date Header Banner */}
        <div className="schedule-card-header">
          <span className="schedule-day-badge">{activeDay.badge}</span>
          <h3 className="schedule-card-title">{activeDay.title}</h3>
          
          <div className="schedule-date-badge-row">
            <div className="solar-date-highlight">
              <span className="weekday">{activeDay.dayOfWeek}</span>
              <span className="date-number">{activeDay.solarDate}</span>
            </div>
            <div className="lunar-date-sub">
              (Tức ngày {activeDay.lunarDate})
            </div>
          </div>
        </div>

        {/* Live Countdown Clock for this specific day */}
        <div className="schedule-countdown-wrapper">
          <CountdownTimer
            targetDate={activeDay.targetDate}
            title={`Đếm ngược đến ${activeDay.dayOfWeek}, ${activeDay.solarDate}`}
          />
        </div>

        {/* Timeline Events Breakdown */}
        <div className="schedule-timeline-list">
          <h4 className="timeline-block-title">CHƯƠNG TRÌNH NGÀY LỄ</h4>
          <div className="timeline-items">
            {activeDay.events.map((ev, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-time-col">
                  <span className="time-bubble">{ev.time}</span>
                  {i < activeDay.events.length - 1 && <span className="timeline-connector-bar" />}
                </div>
                <div className="timeline-content-col">
                  <h5 className="event-item-title">{ev.title}</h5>
                  <p className="event-item-desc">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Information Box */}
        <div className="schedule-venue-box">
          <div className="venue-icon-wrapper">
            <span className="venue-icon">🏰</span>
          </div>
          <div className="venue-info">
            <p className="venue-subtitle">ĐỊA ĐIỂM TỔ CHỨC</p>
            <h4 className="venue-name">{activeDay.venueName}</h4>
            <p className="venue-address">📍 {activeDay.venueAddress}</p>
          </div>
        </div>

        {/* Interactive Google Map Visual Embed */}
        <div className="schedule-map-embed-wrapper">
          <iframe
            title={`Bản đồ chỉ đường - ${activeDay.venueName}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(activeDay.venueAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="220"
            className="venue-map-iframe"
            allowFullScreen=""
            loading="lazy"
          />
        </div>

        {/* Action Buttons: Google Maps & Add to Calendar */}
        <div className="schedule-actions-row">
          <a
            href={activeDay.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="schedule-action-btn map-btn"
          >
            <span className="btn-icon">🗺️</span>
            <span>Mở Bản Đồ Chỉ Đường (Google Maps)</span>
          </a>

          <a
            href={getGoogleCalendarUrl(activeDay)}
            target="_blank"
            rel="noopener noreferrer"
            className="schedule-action-btn cal-btn"
          >
            <span className="btn-icon">📅</span>
            <span>Thêm Vào Lịch Điện Thoại</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
