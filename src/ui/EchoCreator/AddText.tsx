import styles from "./AddText.module.css";

type GifSelectorProps = {
  text: string;
  setText: (text: string) => void;
  textPosition: "top" | "center" | "bottom";
  setTextPosition: (position: "top" | "center" | "bottom") => void;
};
export default function AddText({
  text,
  setText,
  textPosition,
  setTextPosition,
}: GifSelectorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.textInput}>
        <textarea
          className={styles.textArea}
          rows={2}
          maxLength={70}
          value={text}
          onChange={(e) => {
            const value = e.target.value
              .split("\n")
              .slice(0, 2)
              .join("\n")
              .slice(0, 70);
            setText(value);
          }}
          placeholder="Écrivez votre texte ici..."
        />
        <div className={styles.textFooter}>
          <span
            className={
              text.length >= 70 ? styles.charCountLimit : styles.charCount
            }
          >
            {text.length}/70
          </span>
          <button
            className={styles.positionButton}
            onClick={() => setTextPosition("top")}
          >
            Haut
          </button>
          <button
            className={styles.positionButton}
            onClick={() => setTextPosition("center")}
          >
            Centre
          </button>
          <button
            className={styles.positionButton}
            onClick={() => setTextPosition("bottom")}
          >
            Bas
          </button>
        </div>
      </div>
    </div>
  );
}
