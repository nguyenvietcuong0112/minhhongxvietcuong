import React from 'react';

/**
 * LoveStorySection: Romantic timeline of the couple's relationship
 * (Chuyện Tình Yêu - Hành Trình Yêu Thương)
 */
const LoveStorySection = ({ stories }) => {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="invitation-section love-story-section" id="story">
      <div className="section-header">
        <span className="section-badge">OUR LOVE STORY</span>
        <h2 className="section-title">Chuyện Tình Yêu Chúng Mình</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">💍</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          "Hạnh phúc không phải là điểm đến, mà là từng khoảnh khắc chúng mình cùng nắm chặt tay nhau đi suốt cuộc đời."
        </p>
      </div>

      <div className="love-story-timeline">
        {stories.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={idx} className={`story-timeline-node ${isEven ? 'left-node' : 'right-node'}`}>
              {/* Center Dot */}
              <div className="story-center-marker">
                <span className="marker-dot" />
              </div>

              {/* Story Content Card */}
              <div className="story-card">
                <div className="story-photo-frame">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="story-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = process.env.PUBLIC_URL + '/anh1.jpg';
                    }}
                  />
                  <div className="story-year-badge">{item.year}</div>
                </div>

                <div className="story-card-body">
                  <h4 className="story-card-title">{item.title}</h4>
                  <p className="story-card-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LoveStorySection;
