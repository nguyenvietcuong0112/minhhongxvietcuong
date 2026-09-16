import React, { useEffect, useRef } from 'react';

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
 * AudioPlayer: Single-instance audio player.
 * Eliminates duplicate playing/echoing by maintaining strictly ONE player.
 */
const AudioPlayer = ({ isPlaying, musicUrl }) => {
  const ytVideoId = getYouTubeVideoId(musicUrl);
  const iframeRef = useRef(null);
  const audioRef = useRef(null);

  // Control YouTube playback via postMessage
  useEffect(() => {
    if (!ytVideoId || !iframeRef.current) return;
    const action = isPlaying ? 'playVideo' : 'pauseVideo';
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: action, args: [] }),
        '*'
      );
    } catch (e) {
      console.warn('Audio postMessage error:', e);
    }
  }, [isPlaying, ytVideoId]);

  // MP3 fallback if not YouTube URL
  useEffect(() => {
    if (ytVideoId || !musicUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.7;
    }
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, musicUrl, ytVideoId]);

  if (!musicUrl) return null;

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
      {ytVideoId && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${ytVideoId}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${ytVideoId}&controls=0`}
          title="YouTube Wedding Music"
          allow="autoplay"
        />
      )}
    </div>
  );
};

export default AudioPlayer;
