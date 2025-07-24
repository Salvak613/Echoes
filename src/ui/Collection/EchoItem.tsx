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
    audio.volume = 0;
    audio.currentTime = 0;
    audio.play();
    const step = 0.01;
    const interval = duration / (1 / step);
    let currentVolume = 0;
    const fade = setInterval(() => {
      currentVolume += step;
      if (currentVolume >= 1) {
        audio.volume = 1;
        clearInterval(fade);
      } else {
        audio.volume = currentVolume;
      }
    }, interval);

    (audio as any)._fadeInterval = fade;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (echo.music_path && audioRef.current) {
      fadeInAudio(audioRef.current);
    }
  };

  const fadeOutAudio = (audio: HTMLAudioElement, duration = 1000) => {
    if ((audio as any)._fadeInterval) {
      clearInterval((audio as any)._fadeInterval);
      (audio as any)._fadeInterval = null;
    }
    const step = 0.01;
    const interval = duration / (1 / step);
    let currentVolume = audio.volume;
    const fade = setInterval(() => {
      currentVolume -= step;
      if (currentVolume <= 0) {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fade);
      } else {
        audio.volume = currentVolume;
      }
    }, interval);
    (audio as any)._fadeOutInterval = fade;
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={echo.id}
    >
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
      </LINK>
      <div className={styles.itemActions}>
        <button onClick={() => onEdit(echo.id)}>Editer</button>
        <button onClick={() => onDelete(echo.id)}>Supprimer</button>
      </div>
    </li>
  );
}
