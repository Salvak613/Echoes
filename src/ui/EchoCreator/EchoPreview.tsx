import styles from "./EchoPreview.module.css";
import { GifModel } from "@/model/GifModel";

type EchoPreviewProps = {
  selectedGif: GifModel | null;
  text?: string;
  textPosition?: "top" | "center" | "bottom";
};

export default function EchoPreview({
  selectedGif,
  text,
  textPosition,
}: EchoPreviewProps) {
  if (!selectedGif) {
    return (
      <div className={styles.noPreview}>Aucune prévisualisation disponible</div>
    );
  }

  return (
    <div className={styles.previewContainer}>
      <h2 className={styles.previewTitle}>Prévisualisation de l'écho</h2>
      <img
        src={`/Gif/${selectedGif.image_path}`}
        alt={selectedGif.name}
        className={styles.previewImage}
      />
      {text && (
        <div
          className={`${styles.textOverlay} ${
            styles[textPosition || "center"]
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
