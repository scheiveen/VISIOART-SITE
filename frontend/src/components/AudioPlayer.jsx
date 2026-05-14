import React, { useState, useRef, useEffect } from "react";
import { ambientMusicList } from "../data/mock";
import "./AudioPlayer.css";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMusic] = useState(() => {
    const randomIndex = Math.floor(Math.random() * ambientMusicList.length);
    return ambientMusicList[randomIndex];
  });
  const audioRef = useRef(null);

  useEffect(() => {
    const startAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current.volume = 1;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch((err) => {
            console.log("Autoplay prevented:", err);
            setIsPlaying(false);
          });
      }
    };

    const handleGesture = () => {
      startAudio();
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };

    startAudio();
    window.addEventListener("pointerdown", handleGesture, { once: true });
    window.addEventListener("touchstart", handleGesture, { once: true });
    window.addEventListener("keydown", handleGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        autoPlay
        playsInline
        preload="auto"
        loop
        muted={isMuted}
        src={encodeURI(currentMusic)}
      />

      <button
        className="audio-control"
        onClick={toggleMute}
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
