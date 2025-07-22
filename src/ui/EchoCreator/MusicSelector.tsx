import React, { useRef, useEffect } from "react";
import styles from "./MusicSelector.module.css";
import { MusicModel } from "@/model/MusicModel";

type MusicSelectorProps = {
  musics: MusicModel[];
  selectedMusic: MusicModel | null;
  onSelect: (music: MusicModel | null) => void;
};

export default function MusicSelector({
  musics,
  selectedMusic,
  onSelect,
}: MusicSelectorProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (selectedMusic && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [selectedMusic]);

  return (
    <div className={styles.container}>
      {musics.length === 0 ? (
        <p className={styles.noMusic}>Aucune musique disponible</p>
      ) : (
        <div className={styles.musicList}>
          {musics.map((music) => (
            <div
              key={music.id}
              className={`${styles.musicItem} ${
                selectedMusic?.id === music.id ? styles.selected : ""
              }`}
              onClick={() => {
                if (selectedMusic?.id === music.id) {
                  onSelect(null);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                } else {
                  onSelect(music);
                }
              }}
            >
              <div className={styles.musicEmoji}>🎵</div>
              <span className={styles.musicName}>{music.name}</span>
            </div>
          ))}
        </div>
      )}

      <audio ref={audioRef} style={{ display: "none" }} controls>
        {selectedMusic && <source src={`/Lofi/${selectedMusic.music_path}`} />}
        Votre navigateur ne supporte pas l'audio.
      </audio>
    </div>
  );
}
