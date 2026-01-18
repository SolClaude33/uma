"use client";

import { useState, useEffect, useRef } from "react";
import { FaVolumeUp, FaVolumeDown, FaPause, FaPlay } from "react-icons/fa";

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
          console.log("Autoplay bloqueado por el navegador:", error);
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

  const decreaseVolume = () => {
    const newVolume = Math.max(0, volume - 0.1);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-white/20"
      style={{
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Botón Play/Pause */}
      <button
        onClick={togglePlayPause}
        className="text-white hover:text-pink-400 transition-colors flex items-center justify-center w-8 h-8"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
      </button>

      {/* Indicador de volumen */}
      <div className="flex items-center gap-2">
        <FaVolumeUp className="text-white text-sm" style={{ opacity: 0.8 }} />
        <span className="text-white text-xs" style={{ minWidth: '30px', textAlign: 'right' }}>
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Botón para bajar volumen */}
      <button
        onClick={decreaseVolume}
        className="text-white hover:text-pink-400 transition-colors flex items-center justify-center w-8 h-8"
        aria-label="Bajar volumen"
      >
        <FaVolumeDown className="text-lg" />
      </button>
    </div>
  );
}
