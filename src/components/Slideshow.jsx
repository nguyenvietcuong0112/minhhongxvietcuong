import React, { useState, useEffect } from 'react';
import { RoyalCornerOrnament } from './Ornaments';

/**
 * Slideshow: Cinematic Love Story Photo Album with Ken Burns effect.
 * Perfect for projecting during welcoming guests or dinner party.
 */
const Slideshow = ({ data, theme }) => {
  const photos = data.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, photos.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!photos.length) {
    return (
      <div className="slideshow-empty">
        <p>Chưa có hình ảnh nào trong album.</p>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

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
                />
              </div>
            ))}
          </div>

          {/* Photo Info Banner */}
          <div className="slideshow-caption-bar">
            <div className="slideshow-couple-tag">
              {data.groomName} & {data.brideName}
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
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="slideshow-play-pause-btn"
            title={isPlaying ? 'Tạm dừng tự động chạy' : 'Tiếp tục tự động chạy'}
          >
            {isPlaying ? '⏸ Tự động phát' : '▶ Tiếp tục'}
          </button>

          <div className="slideshow-dots">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
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
