import React, { useState, useEffect } from 'react';
import InteractiveEnvelope from './InteractiveEnvelope';
import InvitationHero from './InvitationHero';
import SaveTheDateCalendar from './SaveTheDateCalendar';
import ScheduleSection from './ScheduleSection';
import RsvpSection from './RsvpSection';
import LoveStorySection from './LoveStorySection';
import PhotoGallerySection from './PhotoGallerySection';
import WishesGuestbookSection from './WishesGuestbookSection';
import GiftBoxSection from './GiftBoxSection';
import './Invitation.css';

/**
 * WeddingInvitationView: Complete interactive online wedding invitation suite
 * for Việt Cường & Minh Hồng (26 & 27.12.2026)
 */
const WeddingInvitationView = ({
  invitationData,
  onSwitchToStage,
  audioPlaying,
  onToggleAudio,
}) => {
  // Check URL params for preselected tab: ?nha=trai or ?nha=gai
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const side = params.get('nha') || params.get('side');
    if (side === 'gai' || side === 'nhagai' || side === 'bride') return 'gai';
    return 'trai';
  });

  // Extract personalized guest name from URL: ?to=Anh+Nam or ?guest=Gia+dinh+Bac+Hung
  const [guestName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('to') || params.get('guest') || params.get('k') || params.get('khach') || params.get('name') || '';
  });

  // Envelope state: opened or sealed
  const [isOpened, setIsOpened] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('opened') === 'true';
  });

  // When envelope is sealed, lock body scroll so envelope is perfectly centered.
  // When opened, enable vertical smooth scroll.
  useEffect(() => {
    if (isOpened) {
      document.body.classList.add('is-invitation-mode');
      document.documentElement.classList.add('is-invitation-mode');
    } else {
      document.body.classList.remove('is-invitation-mode');
      document.documentElement.classList.remove('is-invitation-mode');
    }
    return () => {
      document.body.classList.remove('is-invitation-mode');
      document.documentElement.classList.remove('is-invitation-mode');
    };
  }, [isOpened]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    // Auto start music when opening envelope if not playing
    if (!audioPlaying && onToggleAudio) {
      onToggleAudio();
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDateFromCalendar = (key) => {
    setActiveTab(key);
    scrollToSection('schedule');
  };

  return (
    <div className="wedding-invitation-app">
      {/* 3D Wax Seal Envelope Entrance */}
      {!isOpened && (
        <InteractiveEnvelope
          data={invitationData}
          onOpen={handleOpenEnvelope}
          isOpened={isOpened}
          guestName={guestName}
        />
      )}

      {/* Floating Control Bar: Audio toggle & Switch to Stage mode */}
      {isOpened && (
        <div className="invitation-floating-bar">
          <button
            type="button"
            className="floating-audio-btn"
            onClick={onToggleAudio}
            title={audioPlaying ? 'Tắt nhạc: Dắt Anh Về Nhà' : 'Bật nhạc: Dắt Anh Về Nhà'}
          >
            <span className={`audio-icon ${audioPlaying ? 'playing' : ''}`}>
              {audioPlaying ? '🎵' : '🔇'}
            </span>
            <span className="audio-label">
              {audioPlaying ? 'Dắt Anh Về Nhà' : 'Nhạc: TẮT'}
            </span>
          </button>

          <button
            type="button"
            className="floating-stage-btn"
            onClick={onSwitchToStage}
            title="Chuyển sang chế độ Màn Hình Sân Khấu TV"
          >
            <span>📺 Sân Khấu TV</span>
          </button>
        </div>
      )}

      {/* Main Wedding Invitation Document */}
      <main className={`invitation-main-content ${!isOpened ? 'envelope-sealed-behind' : ''}`}>
        {/* 1. Hero Section */}
        <InvitationHero
          data={invitationData}
          onScrollTo={scrollToSection}
          guestName={guestName}
        />

        {/* 2. Lịch Đánh Dấu Ngày Cưới (Save The Date Calendar - Tháng 12/2026) */}
        <SaveTheDateCalendar
          onSelectDate={handleSelectDateFromCalendar}
        />

        {/* 3. Lịch Trình 2 Ngày Chi Tiết & Bản Đồ Chỉ Đường */}
        <ScheduleSection
          schedule={invitationData.schedule}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 4. Xác Nhận Tham Dự (RSVP Form) */}
        <RsvpSection
          scriptUrl={invitationData.wishesScriptUrl}
          defaultGuestName={guestName}
        />

        {/* 5. Chuyện Tình Yêu Của Cặp Đôi */}
        <LoveStorySection
          stories={invitationData.loveStory}
        />

        {/* 6. Album 15 Ảnh Cưới Tuyển Chọn (Có bộ lọc & Lightbox) */}
        <PhotoGallerySection
          gallery={invitationData.gallery}
        />

        {/* 7. Sổ Lưu Bút Online & Lời Chúc (Kết nối trực tiếp Google Sheets) */}
        <WishesGuestbookSection
          scriptUrl={invitationData.wishesScriptUrl}
        />

        {/* 8. Hộp Mừng Cưới VietQR & Bảng Màu Trang Phục */}
        <GiftBoxSection
          groom={invitationData.groom}
          bride={invitationData.bride}
          dressCode={invitationData.dressCode}
        />

        {/* Footer */}
        <footer className="invitation-footer">
          <div className="footer-content">
            <span className="footer-knot">囍</span>
            <h3 className="footer-names">Việt Cường & Minh Hồng</h3>
            <p className="footer-gratitude">
              Cảm ơn quý khách đã luôn yêu thương và chia sẻ niềm hạnh phúc cùng chúng tôi!
            </p>
            <p className="footer-date">26 • 27.12.2026 (18 • 19.11 Bính Ngọ)</p>

            <div className="footer-switch-box">
              <button
                type="button"
                className="footer-tv-btn"
                onClick={onSwitchToStage}
              >
                📺 Mở Chế Độ Trình Chiếu Cho Màn Hình TV / Sân Khấu
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default WeddingInvitationView;
