import React from 'react';

/**
 * SaveTheDateCalendar: Lịch đánh dấu ngày cưới (Tháng 12 / 2026)
 * - Ngày 26/12/2026: Lễ Ăn Hỏi & Dự Tiệc tại Nhà Gái (18/11 Âm Lịch)
 * - Ngày 27/12/2026: Đại Lễ Thành Hôn & Tiệc Cưới tại Nhà Trai (19/11 Âm Lịch)
 */
const SaveTheDateCalendar = ({ onSelectDate }) => {
  // Calendar structure for December 2026
  // Dec 1, 2026 is Tuesday. Monday (T2) is day index 0, Tuesday (T3) is day index 1...
  // Days of week: T2 (Mon), T3 (Tue), T4 (Wed), T5 (Thu), T6 (Fri), T7 (Sat), CN (Sun)
  const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // December 2026 days: 1 empty slot for Monday, then 1 to 31
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const leadingBlanks = [null]; // Dec 1 is Tuesday, so 1 blank for Monday

  const calendarGrid = [...leadingBlanks, ...daysInMonth];

  return (
    <section className="invitation-section save-the-date-section" id="calendar">
      <div className="section-header">
        <span className="section-badge">SAVE THE DATE</span>
        <h2 className="section-title">Lịch Đánh Dấu Ngày Cưới</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">📅</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          Hai ngày trọng đại nhất của chúng mình trong tháng 12 năm 2026. Hãy đánh dấu vào lịch để cùng chung vui nhé!
        </p>
      </div>

      <div className="calendar-card-wrapper">
        <div className="calendar-card">
          {/* Header */}
          <div className="calendar-card-header">
            <span className="calendar-month-title">THÁNG 12 • 2026</span>
            <span className="calendar-lunar-title">Tháng 11 năm Bính Ngọ (Âm Lịch)</span>
          </div>

          {/* Weekday Row */}
          <div className="calendar-weekdays-row">
            {weekdays.map((wd, i) => (
              <span key={i} className={`weekday-cell ${i >= 5 ? 'weekend' : ''}`}>
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="calendar-days-grid">
            {calendarGrid.map((day, idx) => {
              if (day === null) {
                return <span key={`blank-${idx}`} className="day-cell blank" />;
              }

              const isDay26 = day === 26; // Ăn hỏi Nhà Gái
              const isDay27 = day === 27; // Thành hôn Nhà Trai

              return (
                <div
                  key={`day-${day}`}
                  className={`day-cell ${isDay26 ? 'marked day-26' : ''} ${isDay27 ? 'marked day-27' : ''}`}
                  onClick={() => {
                    if (isDay26 && onSelectDate) onSelectDate('gai');
                    if (isDay27 && onSelectDate) onSelectDate('trai');
                  }}
                  title={
                    isDay26
                      ? 'Ngày 26/12/2026: Lễ Ăn Hỏi Nhà Gái (18/11 ÂL)'
                      : isDay27
                      ? 'Ngày 27/12/2026: Đại Lễ Thành Hôn Nhà Trai (19/11 ÂL)'
                      : `Ngày ${day} tháng 12`
                  }
                >
                  <span className="day-num">{day}</span>
                  {isDay26 && (
                    <div className="day-event-badge badge-gai">
                      <span className="badge-icon">🌸</span>
                      <span className="badge-txt">Nhà Gái</span>
                      <span className="badge-lunar">18 ÂL</span>
                    </div>
                  )}
                  {isDay27 && (
                    <div className="day-event-badge badge-trai">
                      <span className="badge-icon">👑</span>
                      <span className="badge-txt">Nhà Trai</span>
                      <span className="badge-lunar">19 ÂL</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Calendar Footnote / Legend */}
          <div className="calendar-legend-box">
            <div className="legend-item gai" onClick={() => onSelectDate && onSelectDate('gai')}>
              <span className="legend-icon">🌸</span>
              <div className="legend-info">
                <strong>Thứ Bảy, 26.12.2026 (18.11 ÂL)</strong>
                <p>Lễ Ăn Hỏi & Tiệc Mừng tại Tư gia Nhà Gái</p>
              </div>
            </div>

            <div className="legend-item trai" onClick={() => onSelectDate && onSelectDate('trai')}>
              <span className="legend-icon">👑</span>
              <div className="legend-info">
                <strong>Chủ Nhật, 27.12.2026 (19.11 ÂL)</strong>
                <p>Đại Lễ Thành Hôn & Tiệc Cưới tại Trống Đồng Palace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDateCalendar;
