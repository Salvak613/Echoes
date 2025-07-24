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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (echo.music_path && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
            src={`/GIF/${
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
