interface AudioWithFade extends HTMLAudioElement {
  _fadeInterval?: ReturnType<typeof setInterval>;
  _fadeOutInterval?: ReturnType<typeof setInterval>;
}
import { useState, useRef, useEffect } from "react";
import LINK from "next/link";
import styles from "./Collection.module.css";
import { EchoModel } from "@/model/EchoModel";

interface EchoItemProps {
  echo: EchoModel;
  muted: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function EchoItem({
  echo,
  muted,
  onEdit,
  onDelete,
}: EchoItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    <li className={styles.echoItem} key={echo.id}>
      <div className={styles.itemHeader}>
        <div className={styles.itemHeaderLeft}>
          <img src="/coeur.png" alt="Cœur" className={styles.heartIcon} />
          <span className={styles.count}>{echo.likeCount}</span>
        </div>
        <p>
          {new Date(echo.created_at).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
        {echo.is_private ? (
          <img src="/cadenas.png" alt="Privé" className={styles.privateBadge} />
        ) : (
          <img src="/planete.png" alt="Public" className={styles.publicBadge} />
        )}
      </div>
      <LINK href={`/collection/${echo.id}`} key={echo.id}>
        <div className={styles.echoImageWrapper}>
          <img
            src={`/Gif/${
              isHovered ? echo.picture_image_path : echo.picture_miniature_path
            }`}
            alt={echo.text_content ?? ""}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
      </LINK>
      <div className={styles.itemActions}>
        <button onClick={() => onEdit(echo.id)}>Editer</button>
        <button onClick={() => onDelete(echo.id)}>Supprimer</button>
      </div>
    </li>
  );
}
