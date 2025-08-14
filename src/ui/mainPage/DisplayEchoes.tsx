"use client";

import styles from "./DisplayEchoes.module.css";
import { EchoModel } from "@/model/EchoModel";
import EchoItem from "./EchoItem";
import { useState, useTransition } from "react";
import { useUserContext } from "@/context/UserContext";
import { getEchoesILike } from "@/lib/card/getCardsILike";
import Loader from "@/ui/Loader";

export default function DisplayEchoes({
  echoes: initialEchoes,
  userId,
}: {
  echoes: EchoModel[];
  userId: number | null;
}) {
  const [sort, setSort] = useState("recent");
  const [showLikedEchoes, setShowLikedEchoes] = useState(false);
  const [likedEchoes, setLikedEchoes] = useState<EchoModel[]>([]);
  const [isPending, startTransition] = useTransition();
  const { user } = useUserContext();

  const handleToggleLikedEchoes = () => {
    if (!showLikedEchoes && likedEchoes.length === 0 && userId) {
      startTransition(async () => {
        try {
          const fetchedLikedEchoes = await getEchoesILike(userId);
          setLikedEchoes(fetchedLikedEchoes);
          setShowLikedEchoes(true);
        } catch (error) {
          console.error("Erreur lors du chargement des echoes likés:", error);
        }
      });
    } else {
      setShowLikedEchoes(!showLikedEchoes);
    }
  };

  let echoes = initialEchoes;
  if (showLikedEchoes) {
    echoes = initialEchoes.filter((echo) =>
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
        {user! ? (
          <button
            onClick={handleToggleLikedEchoes}
            className={styles.showLikedButton}
            disabled={isPending}
          >
            {isPending ? <Loader /> : showLikedEchoes ? "❤️" : "🖤"}
          </button>
        ) : null}
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
