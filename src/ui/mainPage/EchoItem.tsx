"use client";

import styles from "./DisplayEchoes.module.css";
import { EchoModel } from "@/model/EchoModel";
import { useMute } from "@/context/MuteContext";
import LINK from "next/link";
import React, { useState, useRef, useEffect } from "react";

export default function EchoItem({ echo }: { echo: EchoModel }) {
  const { muted } = useMute();
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  interface AudioWithFade extends HTMLAudioElement {
    _fadeInterval?: ReturnType<typeof setInterval>;
    _fadeOutInterval?: ReturnType<typeof setInterval>;
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const fadeInAudio = (audio: HTMLAudioElement, duration = 2000) => {
    const audioWithFade = audio as AudioWithFade;
    audioWithFade.volume = 0;
    audioWithFade.currentTime = 0;
    audioWithFade.play();
    const step = 0.01;
    const interval = duration / (1 / step);
    let currentVolume = 0;
    const fade = setInterval(() => {
      currentVolume += step;
      if (currentVolume >= 1) {
        audioWithFade.volume = 1;
        clearInterval(fade);
      } else {
        audioWithFade.volume = currentVolume;
      }
    }, interval);
    audioWithFade._fadeInterval = fade;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (echo.music_path && audioRef.current) {
      fadeInAudio(audioRef.current);
    }
  };

  const fadeOutAudio = (audio: HTMLAudioElement, duration = 1000) => {
    const audioWithFade = audio as AudioWithFade;
    if (audioWithFade._fadeInterval) {
      clearInterval(audioWithFade._fadeInterval);
      audioWithFade._fadeInterval = undefined;
    }
    const step = 0.01;
    const interval = duration / (1 / step);
    let currentVolume = audioWithFade.volume;
    const fade = setInterval(() => {
      currentVolume -= step;
      if (currentVolume <= 0) {
        audioWithFade.volume = 0;
        audioWithFade.pause();
        audioWithFade.currentTime = 0;
        clearInterval(fade);
      } else {
        audioWithFade.volume = currentVolume;
      }
    }, interval);
    audioWithFade._fadeOutInterval = fade;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (audioRef.current) {
      fadeOutAudio(audioRef.current);
    }
  };

  return (
    <li
      className={styles.echoItem}
      key={echo.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LINK href={`/echoes/${echo.id}`}>
        <div className={styles.echoImageWrapper}>
          <img
            src={`/GiF/${
              isHovered ? echo.picture_image_path : echo.picture_miniature_path
            }`}
            alt={echo.text_content ?? ""}
            className={styles.echoImage}
          />
          {echo.music_path && (
            <audio
              ref={audioRef}
              src={`/Lofi/${echo.music_path}`}
              preload="auto"
            />
          )}
          {echo.text_content && (
            <span
              className={
                `${styles.echoText} ` +
                (echo.text_position === "top"
                  ? styles.textTop
                  : echo.text_position === "bottom"
                  ? styles.textBottom
                  : styles.textCenter)
              }
            >
              {echo.text_content}
            </span>
          )}
        </div>
        <div className={styles.itemFooter}>
          <div className={styles.likeCount}>
            <p className={styles.heart}>♡{""}</p>
            <p>{echo.likeCount}</p>
          </div>
          <p>{echo.user_name || "Anonyme"}</p>
        </div>
      </LINK>
    </li>
  );
}
