import React, { useState } from 'react';

/**
 * PhotoGallerySection: 15 Vị Trí Ảnh Cưới (Có thể thay thế)
 * Hỗ trợ bộ lọc danh mục (Tất Cả, Ngoại Cảnh, Studio, Khoảnh Khắc, Lễ Đường)
 * và Lightbox chuyển ảnh trước/sau thông minh.
 */
const PhotoGallerySection = ({ gallery }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const photos = gallery || [];

  const categories = [
    { key: 'all', label: `Tất Cả (${photos.length})` },
    { key: 'Ngoại Cảnh', label: 'Ngoại Cảnh' },
    { key: 'Studio', label: 'Studio' },
    { key: 'Khoảnh Khắc', label: 'Khoảnh Khắc' },
    { key: 'Lễ Đường', label: 'Lễ Đường' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const selectedPhoto = selectedIdx !== null ? photos[selectedIdx] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="invitation-section gallery-section" id="gallery">
      <div className="section-header">
        <span className="section-badge">ALBUM ẢNH CƯỚI (15 VỊ TRÍ)</span>
        <h2 className="section-title">Khoảnh Khắc Ngọt Ngào</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">📸</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          Bộ sưu tập 15 khoảnh khắc đẹp nhất của Việt Cường & Minh Hồng. Bạn có thể dễ dàng thay thế ảnh bất cứ lúc nào trong file cấu hình.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="gallery-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`gallery-filter-pill ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="gallery-masonry-grid">
        {filteredPhotos.map((photo, i) => {
          const actualIndex = photos.indexOf(photo);
          return (
            <div
              key={photo.id || i}
              className={`gallery-card-item item-${i % 6}`}
              onClick={() => setSelectedIdx(actualIndex)}
            >
              <div className="gallery-card-img-wrap">
                <img
                  src={photo.url}
                  alt={photo.title || 'Ảnh cưới'}
                  className="gallery-thumb-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = process.env.PUBLIC_URL + '/anh1.jpg';
                  }}
                />
                <div className="gallery-card-overlay">
                  {photo.category && (
                    <span className="gallery-card-badge">{photo.category}</span>
                  )}
                  <span className="gallery-zoom-icon">🔍 Xem ảnh</span>
                  <span className="gallery-card-caption">{photo.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Next/Prev Controls */}
      {selectedPhoto && (
        <div className="gallery-lightbox-backdrop" onClick={() => setSelectedIdx(null)}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedIdx(null)}
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              type="button"
              className="lightbox-nav-btn prev"
              onClick={handlePrev}
              title="Ảnh trước"
            >
              ‹
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="lightbox-full-img"
            />

            {/* Next Button */}
            <button
              type="button"
              className="lightbox-nav-btn next"
              onClick={handleNext}
              title="Ảnh sau"
            >
              ›
            </button>

            <div className="lightbox-info-bar">
              <span className="lightbox-counter">
                {selectedIdx + 1} / {photos.length}
              </span>
              <p className="lightbox-caption-text">{selectedPhoto.title}</p>
              {selectedPhoto.caption && (
                <p className="lightbox-sub-text">{selectedPhoto.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallerySection;
