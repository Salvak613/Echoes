"use client";

import styles from "./DisplayEchoes.module.css";
import { EchoModel } from "@/model/EchoModel";
import EchoItem from "./EchoItem";
import { useState } from "react";

export default function DisplayEchoes({
  echoes,
  likedEchoes,
}: {
  echoes: EchoModel[];
  likedEchoes: EchoModel[];
}) {
  const [sort, setSort] = useState("recent");
  const [showLikedEchoes, setShowLikedEchoes] = useState(false);

  if (showLikedEchoes) {
    echoes = echoes.filter((echo) =>
      likedEchoes.some((liked) => liked.id === echo.id)
    );
  }

  const sortedEchoes = [...echoes].sort((a, b) => {
    switch (sort) {
      case "recents":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "old":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "popular":
        return b.likeCount - a.likeCount;
      case "unpopular":
        return a.likeCount - b.likeCount;
      default:
        return 0;
    }
  });

  return (
    <div className={styles.page}>
      <div className={styles.sortContainer}>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="recents">Récents</option>
          <option value="old">Anciens</option>
          <option value="popular">Populaires</option>
          <option value="unpopular">Moins populaires</option>
        </select>
        <button
          onClick={() => setShowLikedEchoes(!showLikedEchoes)}
          className={styles.showLikedButton}
        >
          {showLikedEchoes ? "❤️" : "🖤"}
        </button>
      </div>
      <div className={styles.echoesContainer}>
        {echoes.length === 0 ? (
          <p>Aucun écho publié.</p>
        ) : (
          <ul className={styles.echoesList}>
            {sortedEchoes.map((echo) => (
              <EchoItem echo={echo} key={echo.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
