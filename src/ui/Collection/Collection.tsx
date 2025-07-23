"use client";

import styles from "./Collection.module.css";
import { EchoModel } from "@/model/EchoModel";
import LINK from "next/link";
import { useState, useRef, useEffect } from "react";
import ConfirmModal from "@/ui/Collection/ConfirmModal";
import { useMute } from "@/context/MuteContext";
import { deleteEcho } from "@/lib/card/deleteCard";
import { echoMessages } from "@/data/responseMessages";
import { useRouter } from "next/navigation";

export default function Collection({ echoes }: { echoes: EchoModel[] }) {
  const { muted } = useMute();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
    setModalMessage("Êtes-vous sûr de vouloir supprimer cet écho ?");
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (pendingDeleteId !== null) {
      const { response, status } = await deleteEcho(pendingDeleteId);
      if (status === 200) {
        setModalMessage(echoMessages.deleteSuccess);
        setTimeout(() => {
          setModalOpen(false);
          setPendingDeleteId(null);
          setModalMessage(null);
        }, 1500);
      } else {
        setModalMessage(echoMessages.deleteFail);
        setTimeout(() => {
          setModalOpen(false);
          setPendingDeleteId(null);
          setModalMessage(null);
        }, 1500);
      }
    }
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setPendingDeleteId(null);
    setModalMessage(null);
  };

  const handleEditClick = (id: number) => {
    router.push(`/creer/${id}`);
  };

  return (
    <div className={styles.page}>
      {echoes.length === 0 ? (
        <p>Aucun écho disponible dans votre collection.</p>
      ) : (
        <ul className={styles.echoesList}>
          {echoes.map((echo: EchoModel, idx: number) => {
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
                key={echo.id || idx}
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
                <LINK href={`/collection/${echo.id}`} key={echo.id}>
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
                </LINK>
                <div className={styles.itemActions}>
                  <button onClick={() => handleEditClick(echo.id)}>
                    Editer
                  </button>
                  <button onClick={() => handleDeleteClick(echo.id)}>
                    Supprimer
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <ConfirmModal
        open={modalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={
          modalMessage || "Êtes-vous sûr de vouloir supprimer cet écho ?"
        }
      />
    </div>
  );
}
