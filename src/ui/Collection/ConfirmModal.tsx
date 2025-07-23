import React from "react";
import styles from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export default function ConfirmModal({
  open,
  onConfirm,
  onCancel,
  message,
}: ConfirmModalProps) {
  if (!open) return null;
  const isConfirmation =
    !message ||
    message === "Êtes-vous sûr de vouloir supprimer cet écho ?" ||
    message === "Êtes-vous sûr de vouloir supprimer cet élément ?";
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message || "Êtes-vous sûr de vouloir supprimer cet élément ?"}</p>
        {isConfirmation && (
          <div className={styles.actions}>
            <button onClick={onCancel}>Annuler</button>
            <button onClick={onConfirm} className={styles.confirm}>
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
