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
