"use client";

import styles from "./AddInfos.module.css";
import { useUserContext } from "@/context/UserContext";
import { EchoModel } from "@/model/EchoModel";
import { useState } from "react";
import Loader from "@/ui/Loader";
import { useRouter } from "next/navigation";
import { publishCard } from "@/lib/card/publishInfoCard";

interface AddInfosProps {
  Echo: EchoModel;
}
export default function AddInfos({ Echo }: AddInfosProps) {
  const { user } = useUserContext();
  const [isPrivate, setIsPrivate] = useState(!!Echo.is_private);
  const [description, setDescription] = useState(Echo.description || "");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (user?.email !== Echo.user_email) {
    return null;
  }

  const handleToggle = () => {
    setIsPrivate((prev) => !prev);
    Echo.is_private = !isPrivate;
  };

  async function handlePublish() {
    if (isLoading) return;
    if (description.length > 1000) {
      alert("La description ne peut pas dépasser 1000 caractères.");
      return;
    }
    Echo.description = description;
    Echo.is_private = !!isPrivate;
    setIsLoading(true);
    try {
      await publishCard(Echo);
      router.push("/collection");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Ajouter des informations</h2>
      <div className={styles.isPrivateItem}>
        <label htmlFor="isPrivate">
          Souhaitez vous garder cet écho privé ?
        </label>
        <label className={styles.switch}>
          <input
            type="checkbox"
            id="isPrivate"
            checked={isPrivate}
            onChange={handleToggle}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.descriptionItem}>
        <label htmlFor="description">Description :</label>
        <textarea
          className={styles.textArea}
          maxLength={1000}
          value={description}
          onChange={(e) => {
            const value = e.target.value.slice(0, 1000);
            setDescription(value);
          }}
          placeholder="Écrivez, bloguez, expliquez, exprimez-vous ici..."
        />
        <div className={styles.textFooter}>
          <button
            className={styles.publishButton}
            onClick={handlePublish}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Publier"}
          </button>
          <span
            className={
              description.length >= 1000
                ? styles.charCountLimit
                : styles.charCount
            }
          >
            {description.length}/1000
          </span>
        </div>
      </div>
    </div>
  );
}
