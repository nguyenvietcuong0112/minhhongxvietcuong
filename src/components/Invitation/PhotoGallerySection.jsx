import React, { useState, useEffect } from 'react';

/**
 * PhotoGallerySection: Curated Preview & Interactive Album Lightbox
 * - Shows a curated preview of 4 signature moments on the page (no long scroll)
 * - Clicking any photo or "Xem Chi Tiết Album" opens the full Lightbox with thumbnail strip & keyboard navigation
 */
const PhotoGallerySection = ({ gallery }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const photos = gallery || [];
  const previewLimit = 4;
  const previewPhotos = photos.slice(0, previewLimit);
  const remainingCount = Math.max(0, photos.length - previewLimit);

  const selectedPhoto = selectedIdx !== null ? photos[selectedIdx] : null;

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (selectedIdx === null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') setSelectedIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
      if (e.key === 'ArrowRight') setSelectedIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIdx, photos.length]);

  return (
    <section className="invitation-section gallery-section" id="gallery">
      <div className="section-header" data-aos="fade-up">
        <span className="section-badge">ALBUM ẢNH CƯỚI</span>
        <h2 className="section-title">Khoảnh Khắc Ngọt Ngào</h2>
        <div className="section-ornament-line">
          <span className="line" />
          <span className="knot">✦</span>
          <span className="line" />
        </div>
        <p className="section-desc">
          Lưu giữ những khung hình hạnh phúc nhất trên hành trình chung đôi của Việt Cường &amp; Minh Hồng. Chạm vào ảnh để xem chi tiết album.
        </p>
      </div>

      {/* Curated 4-Photo Editorial Preview Grid */}
      <div className="gallery-masonry-grid gallery-preview-grid">
        {previewPhotos.map((photo, i) => {
          const isLastWithMore = i === previewPhotos.length - 1 && remainingCount > 0;
          return (
            <div
              key={photo.id || i}
              className={`gallery-card-item item-${i} ${isLastWithMore ? 'has-more-overlay' : ''}`}
              onClick={() => setSelectedIdx(i)}
              data-aos="zoom-in"
              data-aos-delay={i * 70}
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
                {photo.category && (
                  <span className="gallery-card-badge">{photo.category}</span>
                )}

                {isLastWithMore && (
                  <div className="gallery-more-pill">
                    +{remainingCount} khoảnh khắc
                  </div>
                )}

                <div className="gallery-card-overlay">
                  <span className="gallery-zoom-icon">✦ Xem chi tiết</span>
                  <span className="gallery-card-caption">{photo.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial CTA Button to Open Full Album Detail Lightbox */}
      {photos.length > 0 && (
        <div className="gallery-cta-wrap" data-aos="fade-up" data-aos-delay="120">
          <button
            type="button"
            className="gallery-open-album-btn"
            onClick={() => setSelectedIdx(0)}
          >
            <span>Xem Chi Tiết Album ({photos.length} Ảnh)</span>
            <span className="btn-sparkle">✦</span>
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Detail Viewer with Thumbnail Strip */}
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

            <div className="lightbox-stage">
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={handlePrev}
                title="Ảnh trước"
                aria-label="Ảnh trước"
              >
                ‹
              </button>

              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="lightbox-full-img"
              />

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={handleNext}
                title="Ảnh sau"
                aria-label="Ảnh sau"
              >
                ›
              </button>
            </div>

            <div className="lightbox-info-bar">
              <span className="lightbox-counter">
                {selectedIdx + 1} / {photos.length} {selectedPhoto.category ? `• ${selectedPhoto.category}` : ''}
              </span>
              <p className="lightbox-caption-text">{selectedPhoto.title}</p>
              {selectedPhoto.caption && (
                <p className="lightbox-sub-text">{selectedPhoto.caption}</p>
              )}
            </div>

            {/* Scrollable Thumbnail Strip for Quick Jumping */}
            <div className="lightbox-thumbs-strip" aria-label="Danh sách ảnh trong album">
              {photos.map((thumb, idx) => (
                <button
                  key={thumb.id || idx}
                  type="button"
                  className={`lightbox-thumb-btn ${idx === selectedIdx ? 'active' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                  aria-label={thumb.title || `Ảnh ${idx + 1}`}
                >
                  <img
                    src={thumb.url}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = process.env.PUBLIC_URL + '/anh1.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallerySection;
