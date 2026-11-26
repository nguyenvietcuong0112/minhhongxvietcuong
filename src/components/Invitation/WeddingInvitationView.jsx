import React, { useState, useEffect, useRef } from 'react';
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

  // Cover screen open state & curtain parting state
  const [isOpened, setIsOpened] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('opened') === 'true';
  });
  const [isRevealingCurtains, setIsRevealingCurtains] = useState(false);

  // Activate AOS-style scroll reveal hook
  useScrollReveal('[data-aos], .reveal-on-scroll', isOpened || isRevealingCurtains);

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

  const scrollProgressRef = useRef(null);

  // Smooth scroll progress bar via requestAnimationFrame (zero reflow)
  useEffect(() => {
    if (!isOpened) return undefined;
    let ticking = false;
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpened]);

  // Synchronous on-click handler: start music inside browser gesture & reveal content under parting curtains
  const handleStartOpening = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsRevealingCurtains(true);
    if (!audioPlaying && onToggleAudio) {
      onToggleAudio();
    }
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsRevealingCurtains(false);
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
      {/* Top Delicate Scroll Progress Line */}
      {isOpened && (
        <div className="scroll-progress-track" aria-hidden="true">
          <div ref={scrollProgressRef} className="scroll-progress-fill" />
        </div>
      )}

      {/* 1. Fullscreen Royal Song Phụng Preload Cover Screen */}
      {!isOpened && (
        <CoverPreloadSection
          data={invitationData}
          onStartOpening={handleStartOpening}
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

      {/* 3. Main Wedding Content (Visible right underneath parting curtains!) */}
      <main
        className={`invitation-main-content ${
          isOpened ? 'is-revealed' : isRevealingCurtains ? 'is-revealing-under-curtains' : 'envelope-sealed-behind'
        }`}
      >
        {/* Editorial Brown Luxury Hero Greeting & Feature Photography */}
        <header className="invitation-header-greeting" data-aos="fade-down">
          {/* Botanical Gold Laurel & Wedding Crest */}
          <div className="hero-editorial-crest">
            <span className="crest-hairline" />
            <div className="crest-monogram-seal" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <circle cx="12.5" cy="17.5" r="7" stroke="#C5A36A" strokeWidth="1.7" />
                <circle cx="19.5" cy="17.5" r="7" stroke="#C5A36A" strokeWidth="1.7" />
                <path
                  d="M16 9.6C16 9.6 18.8 7.1 20.5 8.5C21.8 9.6 20.8 11.7 16 14.3C11.2 11.7 10.2 9.6 11.5 8.5C13.2 7.1 16 9.6 16 9.6Z"
                  fill="#C5A36A"
                />
              </svg>
            </div>
            <span className="crest-hairline" />
          </div>

          <div className="header-greeting-badge">TRÂN TRỌNG KÍNH MỜI</div>
          <p className="header-wedding-title">LỄ THÀNH HÔN &amp; LỄ VU QUY</p>

          <div className="header-couple-script">
            <span className="script-name">{invitationData.groom?.shortName || 'Việt Cường'}</span>
            <span className="script-amp">&amp;</span>
            <span className="script-name">{invitationData.bride?.shortName || 'Minh Hồng'}</span>
          </div>

          <div className="header-dates-ribbon">
            <span>26 • 27 THÁNG 12, 2026</span>
          </div>

          {/* Clean Borderless Warm Editorial Hero Photograph */}
          <div className="hero-editorial-photo-wrap" data-aos="fade-up" data-aos-delay="100">
            <div className="hero-editorial-arch">
              <div className="hero-photo-stage">
                <img
                  src={process.env.PUBLIC_URL + '/photos/HUY01657.jpg'}
                  alt="Nguyễn Việt Cường & Lê Minh Hồng"
                  className="hero-editorial-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = process.env.PUBLIC_URL + '/photos/HUY01786.jpg';
                  }}
                />
                <div className="hero-photo-note-overlay">
                  <span className="hero-note-date">26 • 27.12.2026</span>
                  <p className="hero-note-quote">
                    “Chúng ta đã cùng nhau đi qua nhiều thăng trầm để nhận ra rằng được ở bên nhau là điều quý giá nhất.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personalized Guest Welcome Banner */}
          {guestName && (
            <div className="header-personalized-guest-box" data-aos="zoom-in" data-aos-delay="150">
              <span className="guest-box-label">KÍNH MỜI QUÝ KHÁCH</span>
              <h2 className="guest-box-name">{guestName}</h2>
              <p className="guest-box-sub">Đến chung vui cùng gia đình chúng tôi trong ngày trọng đại</p>
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
          targetDate={invitationData.schedule?.day1?.targetDate || '2026-12-26T09:00:00+07:00'}
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
