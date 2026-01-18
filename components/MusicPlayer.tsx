"use client";

import { useState, useEffect, useRef } from "react";
import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // 30% volumen por defecto
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Crear elemento de audio dinámicamente
    const audio = new Audio("/Make debut! (2021 Remastered Version).mp3");
    audio.loop = true; // Repetir la canción
    audio.volume = volume;
    audioRef.current = audio;

    // Reproducir automáticamente al cargar (con manejo de errores)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
              console.log("Autoplay blocked by browser:", error);
          // El usuario deberá hacer clic para reproducir
        });
    }

    // Actualizar volumen cuando cambie
    audio.addEventListener("volumechange", () => {
      setVolume(audio.volume);
    });

    // Limpiar al desmontar
    return () => {
      audio.pause();
      audio.removeEventListener("volumechange", () => {});
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full px-4 py-3 shadow-lg"
      style={{
        fontFamily: 'Arial, sans-serif',
        background: 'rgb(255, 121, 208)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 10px 30px rgba(255, 121, 208, 0.5)'
      }}
    >
      {/* Botón Play/Pause */}
      <button
        onClick={togglePlayPause}
        className="text-white hover:text-white/80 transition-colors flex items-center justify-center w-8 h-8"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
      </button>

      {/* Icono de volumen y slider */}
      <div className="flex items-center gap-2">
        <FaVolumeUp className="text-white text-sm" style={{ opacity: 0.9 }} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="music-volume-slider"
          aria-label="Control de volumen"
        />
        <span className="text-white text-xs font-bold" style={{ minWidth: '35px', textAlign: 'right' }}>
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}
