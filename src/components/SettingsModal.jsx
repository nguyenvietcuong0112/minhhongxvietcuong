import React, { useState } from 'react';
import { THEMES } from '../config/weddingData';

/**
 * SettingsModal: Allows live editing of couple names, dates, quotes, themes, and photo URLs.
 */
const SettingsModal = ({ isOpen, onClose, data, onSave, onReset }) => {
  const [formData, setFormData] = useState({ ...data });
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const updatedPhotos = [
      ...(formData.photos || []),
      { url: newPhotoUrl.trim(), caption: newPhotoCaption.trim() },
    ];
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">⚙ Tuỳ Chỉnh Thông Tin Lễ Dạm Ngõ</h3>
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
              value={formData.ceremonyTitle}
              onChange={(e) => handleChange('ceremonyTitle', e.target.value)}
              placeholder="VD: LỄ DẠM NGÕ, LỄ ĐÍNH HÔN, LỄ ĂN HỎI..."
              required
            />
          </div>

          {/* Couple Names */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Tên Chú Rể</label>
              <input
                type="text"
                className="form-input"
                value={formData.groomName}
                onChange={(e) => handleChange('groomName', e.target.value)}
                placeholder="VD: Việt Cường"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tên Cô Dâu</label>
              <input
                type="text"
                className="form-input"
                value={formData.brideName}
                onChange={(e) => handleChange('brideName', e.target.value)}
                placeholder="VD: Minh Hồng"
                required
              />
            </div>
          </div>

          {/* Dates & Location */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ngày Dương Lịch</label>
              <input
                type="text"
                className="form-input"
                value={formData.dateSolar}
                onChange={(e) => handleChange('dateSolar', e.target.value)}
                placeholder="VD: 28 . 10 . 2026"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Ngày Âm Lịch</label>
              <input
                type="text"
                className="form-input"
                value={formData.dateLunar}
                onChange={(e) => handleChange('dateLunar', e.target.value)}
                placeholder="VD: Ngày 19 Tháng 09 Năm Bính Ngọ"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Địa Điểm / Nhà Trai/Gái</label>
              <input
                type="text"
                className="form-input"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="VD: Tư Gia Nhà Gái"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Thời Gian Đếm Ngược</label>
              <input
                type="datetime-local"
                className="form-input"
                value={formData.targetDate ? formData.targetDate.slice(0, 16) : ''}
                onChange={(e) => handleChange('targetDate', e.target.value)}
              />
            </div>
          </div>

          {/* Meaningful Quote */}
          <div className="form-group">
            <label className="form-label">Câu Chúc / Điểm Nhấn</label>
            <input
              type="text"
              className="form-input"
              value={formData.meaningfulQuote}
              onChange={(e) => handleChange('meaningfulQuote', e.target.value)}
              placeholder="VD: Trăm Năm Tình Viên Mãn • Bạc Đầu Nghĩa Phu Thê"
            />
          </div>

          {/* Theme selection */}
          <div className="form-group">
            <label className="form-label">Tông Màu Giao Diện</label>
            <div className="theme-options">
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleChange('theme', t.id)}
                  className={`theme-badge-btn ${formData.theme === t.id ? 'selected' : ''}`}
                >
                  <span
                    className="theme-color-dot"
                    style={{ background: t.accentColor }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Photos Management */}
          <div className="form-group">
            <label className="form-label">Danh Sách Ảnh Album Slideshow</label>
            <div className="photo-list-preview">
              {(formData.photos || []).map((p, idx) => (
                <div key={idx} className="photo-item-card">
                  <img src={p.url} alt="" className="photo-thumbnail" />
                  <div className="photo-caption-info">
                    <span className="photo-caption-label">{p.caption || '(Không chú thích)'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="photo-remove-btn"
                    title="Xóa ảnh này"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add Photo Inputs */}
            <div className="add-photo-inputs">
              <input
                type="url"
                className="form-input"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Dán link ảnh (URL https://...)"
              />
              <input
                type="text"
                className="form-input"
                value={newPhotoCaption}
                onChange={(e) => setNewPhotoCaption(e.target.value)}
                placeholder="Lời tựa ảnh (tuỳ chọn)"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="btn-add-photo"
              >
                + Thêm ảnh
              </button>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onReset}
              className="btn-secondary"
            >
              Đặt Lại Mặc Định
            </button>
            <div className="footer-right">
              <button
                type="button"
                onClick={onClose}
                className="btn-cancel"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn-primary"
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
