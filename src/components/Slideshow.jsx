import React, { useState, useEffect } from 'react';
import { RoyalCornerOrnament } from './Ornaments';

/**
 * Slideshow: Cinematic Love Story Photo Album with Ken Burns effect.
 * Can be driven by Master Auto-Loop or controlled manually.
 */
const Slideshow = ({ data, activePhotoIndex }) => {
  const photos = data.photos || [];
  const [internalIndex, setInternalIndex] = useState(0);

  // Sync with activePhotoIndex if provided by master auto-loop
  const currentIndex =
    typeof activePhotoIndex === 'number' && activePhotoIndex >= 0
      ? activePhotoIndex % photos.length
      : internalIndex;

  useEffect(() => {
    if (typeof activePhotoIndex === 'number') {
      setInternalIndex(activePhotoIndex % photos.length);
    }
  }, [activePhotoIndex, photos.length]);

  const handleNext = (e) => {
    e && e.stopPropagation();
    setInternalIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = (e) => {
    e && e.stopPropagation();
    setInternalIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!photos.length) {
    return (
      <div className="slideshow-empty">
        <p>Chưa có hình ảnh nào trong album.</p>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div className="slideshow-stage">
      <RoyalCornerOrnament position="top-left" />
      <RoyalCornerOrnament position="top-right" />
      <RoyalCornerOrnament position="bottom-left" />
      <RoyalCornerOrnament position="bottom-right" />

      {/* Background Blurred Ambient Image */}
      <div
        className="slideshow-ambient-bg"
        style={{
          backgroundImage: `url(${currentPhoto.url})`,
        }}
      />

      {/* Dark Ambient Overlay */}
      <div className="slideshow-ambient-overlay" />

      {/* Main Framed Photo Container */}
      <div className="slideshow-main-container">
        <div className="slideshow-frame">
          <div className="slideshow-gold-bezel">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`slideshow-slide ${index === currentIndex ? 'active' : ''}`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption || `Ảnh ${index + 1}`}
                  className="slideshow-image"
                  loading="eager"
                />
              </div>
            ))}
          </div>

          {/* Photo Info Banner */}
          <div className="slideshow-caption-bar">
            <div className="slideshow-couple-tag">
              {data.groomName} <span className="ampersand">&</span> {data.brideName}
            </div>
            {currentPhoto.caption && (
              <div className="slideshow-caption-text">
                “{currentPhoto.caption}”
              </div>
            )}
          </div>
        </div>

        {/* Slideshow Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="slideshow-nav-btn prev"
          title="Ảnh trước"
          aria-label="Previous photo"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="slideshow-nav-btn next"
          title="Ảnh tiếp theo"
          aria-label="Next photo"
        >
          ❯
        </button>

        {/* Slideshow Indicators & Status */}
        <div className="slideshow-footer-controls">
          <div className="slideshow-dots">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setInternalIndex(index);
                }}
                className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Đi tới ảnh ${index + 1}`}
              />
            ))}
          </div>

          <span className="slideshow-counter">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
