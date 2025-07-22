"use client";

import styles from "./GifSelector.module.css";
import { GifModel } from "@/model/GifModel";

type GifSelectorProps = {
  gifs: GifModel[];
  selectedGif: GifModel | null;
  onSelect: (gif: GifModel) => void;
};

export default function GifSelector({
  gifs,
  selectedGif,
  onSelect,
}: GifSelectorProps) {
  if (!gifs || gifs.length === 0) {
    return <div className={styles.noGifs}>Aucun GIF disponible</div>;
  }

  const handleGifSelection = (gif: GifModel) => {
    onSelect(gif);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gifList}>
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className={
              selectedGif?.id === gif.id
                ? `${styles.gifItem} ${styles.selected}`
                : styles.gifItem
            }
            onClick={() => handleGifSelection(gif)}
          >
            <img src={`/Gif/${gif.miniature_path}`} alt={gif.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
