"use client";

import styles from "./Collection.module.css";
import { EchoModel } from "@/model/EchoModel";
import LINK from "next/link";
import { useState, useRef, useEffect } from "react";
import { useMute } from "@/context/MuteContext";

export default function Collection({ echoes }: { echoes: EchoModel[] }) {
  const { muted } = useMute();
  return (
    <div className={styles.page}>
      {echoes.length === 0 ? (
        <p>Aucun écho disponible dans votre collection.</p>
      ) : (
        <ul className={styles.echoesList}>
          {echoes.map((echo, idx) => {
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
              <LINK href={`/collection/${echo.id}`} key={echo.id}>
                <li
                  className={styles.echoItem}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={styles.itemHeader}>
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
                      <span className={styles.privateBadge}>🔒</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles.echoImageWrapper}>
                    <img
                      src={`/GIF/${
                        isHovered
                          ? echo.picture_image_path
                          : echo.picture_miniature_path
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
                </li>
              </LINK>
            );
          })}
        </ul>
      )}
    </div>
  );
}
