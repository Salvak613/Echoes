"use client";

import styles from "./Collection.module.css";
import { EchoModel } from "@/model/EchoModel";
import EchoItem from "./EchoItem";
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
          {echoes.map((echo: EchoModel) => (
            <EchoItem
              key={echo.id}
              echo={echo}
              muted={muted}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
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
