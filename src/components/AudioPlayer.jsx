import React, { useEffect, useRef, useState } from 'react';

/**
 * Extracts YouTube Video ID from standard YouTube URLs
 */
export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
};

/**
 * AudioPlayer: Seamlessly plays YouTube music (with loop support) or direct MP3 files,
 * with fallbacks and volume control.
 */
const AudioPlayer = ({ isPlaying, musicUrl }) => {
  const [isYTReady, setIsYTReady] = useState(false);
  const ytPlayerRef = useRef(null);
  const audioElemRef = useRef(null);
  const ytIframeRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const ytVideoId = getYouTubeVideoId(musicUrl);

  // 1. YouTube IFrame API Integration
  useEffect(() => {
    if (!ytVideoId) return;

    // Load YouTube API script if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      try {
        ytPlayerRef.current = new window.YT.Player('yt-player-container', {
          height: '10',
          width: '10',
          videoId: ytVideoId,
          playerVars: {
            autoplay: isPlayingRef.current ? 1 : 0,
            loop: 1,
            playlist: ytVideoId,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
          },
          events: {
            onReady: (event) => {
              setIsYTReady(true);
              event.target.setVolume(80);
              if (isPlayingRef.current) {
                event.target.playVideo();
              }
            },
          },
        });
      } catch (e) {
        console.warn('YT init error:', e);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (ytPlayerRef.current && ytPlayerRef.current.destroy) {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [ytVideoId]);

  // Sync isPlaying with YouTube player
  useEffect(() => {
    if (!ytVideoId) return;

    if (ytPlayerRef.current && isYTReady && ytPlayerRef.current.playVideo) {
      try {
        if (isPlaying) {
          ytPlayerRef.current.playVideo();
        } else {
          ytPlayerRef.current.pauseVideo();
        }
      } catch (e) {
        console.warn('YT play/pause error:', e);
      }
    }

    // Also send postMessage to fallback iframe
    if (ytIframeRef.current && ytIframeRef.current.contentWindow) {
      const func = isPlaying ? 'playVideo' : 'pauseVideo';
      ytIframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: '' }),
        '*'
      );
    }
  }, [isPlaying, ytVideoId, isYTReady]);

  // 2. Direct MP3 Audio Element (if musicUrl is not a YouTube URL)
  useEffect(() => {
    if (ytVideoId || !musicUrl || !musicUrl.trim()) return;

    if (!audioElemRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audioElemRef.current = audio;
    }

    const audio = audioElemRef.current;
    audio.src = musicUrl;
    audio.volume = 0.6;

    if (isPlaying) {
      audio.play().catch((err) => console.warn('MP3 play prevented:', err));
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [musicUrl, isPlaying, ytVideoId]);

  return (
    <div
      style={{
        position: 'fixed',
        top: -9999,
        left: -9999,
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* YouTube Player Container */}
      <div id="yt-player-container" />

      {/* Fallback Direct Iframe for YouTube if API script is delayed */}
      {ytVideoId && (
        <iframe
          ref={ytIframeRef}
          src={`https://www.youtube.com/embed/${ytVideoId}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${ytVideoId}&controls=0`}
          title="YouTube Wedding Music"
          allow="autoplay"
        />
      )}
    </div>
  );
};

export default AudioPlayer;
