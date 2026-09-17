import React, { useState } from 'react';
import { THEMES } from '../config/weddingData';

/**
 * SettingsModal: Allows live editing of couple names, dates, quotes, themes, and slide durations.
 */
const SettingsModal = ({ isOpen, onClose, data, onSave, onReset }) => {
  const [formData, setFormData] = useState({ ...data });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop pastel-modal-backdrop" onClick={onClose}>
      <div className="modal-dialog pastel-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">🌸 Tuỳ Chỉnh Lễ Dạm Ngõ (Hồng Pastel)</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Ceremony Title */}
          <div className="form-group">
            <label className="form-label">Tiêu Đề Nghi Lễ</label>
            <input
              type="text"
              className="form-input"
              value={formData.ceremonyTitle || ''}
              onChange={(e) => handleChange('ceremonyTitle', e.target.value)}
              placeholder="VD: LỄ DẠM NGÕ"
              required
            />
          </div>

          {/* Couple Names */}
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                value={formData.groomName || ''}
                onChange={(e) => handleChange('groomName', e.target.value)}
                placeholder="VD: Việt Cường"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                value={formData.brideName || ''}
                onChange={(e) => handleChange('brideName', e.target.value)}
                placeholder="VD: Minh Hồng"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ngày Dương Lịch</label>
              <input
                type="text"
                className="form-input"
                value={formData.dateSolar || ''}
                onChange={(e) => handleChange('dateSolar', e.target.value)}
                placeholder="VD: 18.09.2026"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Ngày Âm Lịch</label>
              <input
                type="text"
                className="form-input"
                value={formData.dateLunar || ''}
                onChange={(e) => handleChange('dateLunar', e.target.value)}
                placeholder="VD: (08.08 Bính Ngọ)"
                required
              />
            </div>
          </div>

          {/* Slide Duration */}
          <div className="form-group">
            <label className="form-label">Thời Gian Mỗi Trang / Slide (Giây)</label>
            <input
              type="number"
              min="5"
              max="60"
              className="form-input"
              value={formData.slideDuration || 12}
              onChange={(e) => handleChange('slideDuration', parseInt(e.target.value, 10) || 12)}
            />
            <small style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
              Mặc định chuẩn 12 giây cho mỗi cảnh (Toàn cảnh hoặc Kèm ảnh).
            </small>
          </div>

          {/* Slideshow Cycle Mode */}
          <div className="form-group">
            <label className="form-label">Kiểu Lặp Trình Chiếu Slideshow Trên TV</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', color: '#4a091c', fontWeight: '500' }}>
                <input
                  type="radio"
                  name="slideshowCycleMode"
                  value="alternate"
                  checked={(formData.slideshowCycleMode || 'alternate') === 'alternate'}
                  onChange={() => handleChange('slideshowCycleMode', 'alternate')}
                />
                <span>🔀 <strong>Xen kẽ 1 Toàn Cảnh (12s) ⮂ 1 Kèm Ảnh (12s)</strong> (Khuyên dùng)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', color: '#4a091c', fontWeight: '500' }}>
                <input
                  type="radio"
                  name="slideshowCycleMode"
                  value="batch"
                  checked={formData.slideshowCycleMode === 'batch'}
                  onChange={() => handleChange('slideshowCycleMode', 'batch')}
                />
                <span>🎞️ <strong>1 Toàn Cảnh (12s) ➔ Chiếu trọn 6 ảnh (12s/ảnh) ➔ Toàn Cảnh</strong></span>
              </label>
            </div>
          </div>

          {/* Music Configuration */}
          <div className="form-group">
            <label className="form-label">🎵 Nhạc Nền Trình Chiếu (Link MP3 hoặc Chọn File từ máy)</label>
            <input
              type="text"
              className="form-input"
              value={formData.musicUrl || ''}
              onChange={(e) => handleChange('musicUrl', e.target.value)}
              placeholder="Dán link file MP3 online (hoặc để trống để dùng nhạc êm dịu mặc định)"
            />
            <div className="music-helper-row" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label className="file-upload-label" style={{
                cursor: 'pointer',
                background: 'rgba(201, 136, 66, 0.15)',
                border: '1px solid rgba(201, 136, 66, 0.4)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: '#6a1a2b',
                fontWeight: '600',
              }}>
                📂 Chọn File MP3 từ máy tính
                <input
                  type="file"
                  accept="audio/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const objectUrl = URL.createObjectURL(file);
                      handleChange('musicUrl', objectUrl);
                    }
                  }}
                />
              </label>
              {formData.musicUrl && (
                <button
                  type="button"
                  onClick={() => handleChange('musicUrl', '')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#8c3b4a',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Xóa link (Dùng nhạc mặc định)
                </button>
              )}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#8c3b4a', marginTop: '4px' }}>
              💡 Gợi ý: Bạn có thể sao chép file nhạc vào thư mục <code>public/nhac.mp3</code> và điền <code>/nhac.mp3</code>, hoặc dán link MP3 từ web.
            </div>
          </div>

          {/* Theme selection */}
          <div className="form-group">
            <label className="form-label">Tông Màu Giao Diện (Hồng Pastel)</label>
            <div className="theme-options">
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleChange('theme', t.id)}
                  className={`theme-badge-btn pastel-theme-btn ${formData.theme === t.id ? 'selected' : ''}`}
                >
                  <span
                    className="theme-color-dot"
                    style={{ background: t.roseColor || t.accentColor }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Modern Animated Thank-you & Blessing Messages Edit */}
          <div className="form-group">
            <label className="form-label">Lời Cảm Ơn & Câu Chúc (Tự Động Chuyển Động Mượt)</label>
            <div className="slides-edit-list">
              {(formData.messages || []).map((msg, idx) => (
                <div key={idx} className="slide-edit-item" style={{ marginBottom: '8px' }}>
                  <div className="slide-edit-header">
                    <span className="slide-num">Thông điệp {idx + 1}</span>
                  </div>
                  <div className="slide-edit-inputs">
                    <input
                      type="text"
                      className="form-input"
                      value={msg || ''}
                      onChange={(e) => {
                        const nextMsgs = [...(formData.messages || [])];
                        nextMsgs[idx] = e.target.value;
                        handleChange('messages', nextMsgs);
                      }}
                      placeholder={`Nội dung câu chúc / cảm ơn ${idx + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onReset}
              className="btn-secondary pastel-btn-sec"
            >
              Đặt Lại Mặc Định
            </button>
            <div className="footer-right">
              <button
                type="button"
                onClick={onClose}
                className="btn-cancel pastel-btn-cancel"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn-primary pastel-btn-pri"
              >
                ✓ Lưu Thay Đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
