import React, { useState, useEffect } from 'react';
import CoverPreloadSection from './CoverPreloadSection';
import FloatingActions from './FloatingActions';
import CoupleIntroSection from './CoupleIntroSection';
import CountdownBannerSection from './CountdownBannerSection';
import SaveTheDateCalendar from './SaveTheDateCalendar';
import ScheduleSection from './ScheduleSection';
import LoveStorySection from './LoveStorySection';
import PhotoGallerySection from './PhotoGallerySection';
import RsvpSection from './RsvpSection';
import WishesGuestbookSection from './WishesGuestbookSection';
import GiftBoxSection from './GiftBoxSection';
import ThankYouSection from './ThankYouSection';
import useScrollReveal from './useScrollReveal';
import './Invitation.css';

/**
 * WeddingInvitationView:
 * Online Wedding Invitation Suite for Việt Cường & Minh Hồng
 * Styled after baoquyenwedding.net with:
 * - Arched-pill cover screen with Ken Burns background photo, botanical branches,
 *   double gold ring, calligraphy "Save The Date", and bouncing open button.
 * - Floating spinning music disc (top right) & floating bouncing gift button (bottom right) with modal.
 * - Arched Groom & Bride cards (#about).
 * - Rounded-arch countdown banner with pulsing heart (#countdown).
 * - 2-Day schedule with interactive Google Maps and wedding timeline (#invitation).
 * - 15-photo pre-wedding gallery with filters & Lightbox (#album).
 * - RSVP form & Live Wishes Guestbook with Google Sheets backend (#wish).
 * - Romantic Thank You closing section (#thankyou).
 * - Mobile-first layout (max-w-[480px]) and silky AOS scroll animations.
 */
const WeddingInvitationView = ({
  invitationData,
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
    return (
      params.get('to') ||
      params.get('guest') ||
      params.get('k') ||
      params.get('khach') ||
      params.get('name') ||
      ''
    );
  });

  // Detect mobile vs desktop view
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cover screen open state
  const [isOpened, setIsOpened] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('opened') === 'true';
  });

  // Activate AOS-style scroll reveal hook
  useScrollReveal('[data-aos], .reveal-on-scroll', isOpened);

  // Lock body scroll while cover is closed; unlock smoothly when opened
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

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Auto start music when opening if not already playing
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
    <div className={`wedding-invitation-app mobile-pro-theme ${isMobile ? 'device-mobile' : 'device-desktop'}`}>
      {/* 1. Fullscreen Arched-Pill Preload Cover Screen (Matches baoquyenwedding.net) */}
      {!isOpened && (
        <CoverPreloadSection
          data={invitationData}
          onOpen={handleOpenInvitation}
          isOpened={isOpened}
          guestName={guestName}
        />
      )}

      {/* 2. Floating Persistent Action Controls (Music Disc & Gift Button with Modal) */}
      {isOpened && (
        <FloatingActions
          audioPlaying={audioPlaying}
          onToggleAudio={onToggleAudio}
          groom={invitationData.groom}
          bride={invitationData.bride}
          songTitle={invitationData.songTitle || 'Dắt Anh Về Nhà'}
        />
      )}

      {/* 3. Main Wedding Content (Constrained to max-w-[480px] on desktop, edge-to-edge on mobile) */}
      <main className={`invitation-main-content ${!isOpened ? 'envelope-sealed-behind' : 'is-revealed'}`}>
        {/* Hero Banner / Header Greeting with Royal Song Phụng Crest */}
        <header className="invitation-header-greeting" data-aos="fade-down">
          <div className="header-songphung-crest">
            <img
              src={process.env.PUBLIC_URL + '/assets/songphung/Phuong line.webp'}
              alt=""
              aria-hidden="true"
              className="crest-phuong-left"
            />
            <div className="crest-hy-center">
              <img
                src={process.env.PUBLIC_URL + '/assets/songphung/chinese_happiness.webp'}
                alt="囍"
                className="crest-hy-icon"
              />
            </div>
            <img
              src={process.env.PUBLIC_URL + '/assets/songphung/Phuong line.webp'}
              alt=""
              aria-hidden="true"
              className="crest-phuong-right"
            />
          </div>
          <div className="header-greeting-badge">THIỆP MỜI BÁO HỶ</div>
          <p className="header-wedding-title">LỄ THÀNH HÔN & VU QUY</p>
          <div className="header-couple-script">
            <span>{invitationData.groom?.shortName || 'Việt Cường'}</span>
            <span className="script-amp">&</span>
            <span>{invitationData.bride?.shortName || 'Minh Hồng'}</span>
          </div>
          <div className="header-dates-ribbon">
            <span>26 • 27 THÁNG 12, 2026</span>
          </div>

          {/* Personalized Guest Welcome Banner */}
          {guestName && (
            <div className="header-personalized-guest-box" data-aos="zoom-in">
              <span className="guest-box-label">TRÂN TRỌNG KÍNH MỜI</span>
              <h2 className="guest-box-name">{guestName}</h2>
              <p className="guest-box-sub">Đến chung vui cùng gia đình chúng tôi</p>
            </div>
          )}
        </header>

        {/* Section 1: The Groom & The Bride (#about) */}
        <CoupleIntroSection
          groom={invitationData.groom}
          bride={invitationData.bride}
        />

        {/* Section 2: Countdown Banner with Rounded Arch & Pulsing Heart (#countdown) */}
        <CountdownBannerSection
          targetDate={invitationData.schedule?.day1?.targetDate || '2026-12-26T08:30:00+07:00'}
        />

        {/* Section 3: Save The Date Calendar (December 2026 with Days 26 & 27 Highlighted) */}
        <SaveTheDateCalendar
          onSelectDate={handleSelectDateFromCalendar}
        />

        {/* Section 4: 2-Day Schedule, Wedding Timeline & Google Maps (#schedule / #invitation) */}
        <ScheduleSection
          schedule={invitationData.schedule}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Section 5: Love Story (Chuyện Tình Yêu) */}
        <LoveStorySection
          stories={invitationData.loveStory}
        />

        {/* Section 6: Photo Album "Khoảnh Khắc Đáng Nhớ" (15 Photos with Filters & Lightbox) (#album) */}
        <PhotoGallerySection
          gallery={invitationData.gallery}
        />

        {/* Section 7: RSVP Attendance Confirmation Form (#rsvp / #wish) */}
        <RsvpSection
          scriptUrl={invitationData.wishesScriptUrl}
          defaultGuestName={guestName}
        />

        {/* Section 8: Live Wishes Guestbook Stream (#wishes / #wish) */}
        <WishesGuestbookSection
          scriptUrl={invitationData.wishesScriptUrl}
        />

        {/* Section 9: Gift Box & Dress Code Palette (#gift) */}
        <GiftBoxSection
          groom={invitationData.groom}
          bride={invitationData.bride}
          dressCode={invitationData.dressCode}
        />

        {/* Section 10: Thank You Closing (#thankyou) */}
        <ThankYouSection
          groomName={invitationData.groom?.shortName || 'Việt Cường'}
          brideName={invitationData.bride?.shortName || 'Minh Hồng'}
        />
      </main>
    </div>
  );
};

export default WeddingInvitationView;
