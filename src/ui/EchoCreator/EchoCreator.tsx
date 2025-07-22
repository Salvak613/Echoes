"use client";

import styles from "./EchoCreator.module.css";
import { GifModel } from "@/model/GifModel";
import { MusicModel } from "@/model/MusicModel";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";

import GifSelector from "./GifSelector";
import MusicSelector from "./MusicSelector";
import EchoPreview from "./EchoPreview";
import AddText from "./AddText";
import CreateButton from "./CreateButton";

type EchoCreatorProps = {
  musics: MusicModel[];
  gifs: GifModel[];
};

export default function EchoCreator({ musics, gifs }: EchoCreatorProps) {
  const [selectedGif, setSelectedGif] = useState<GifModel | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<MusicModel | null>(null);
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState<"top" | "mid" | "bottom">(
    "mid"
  );
  const { user } = useUserContext();

  return (
    <div className={styles.container}>
      <section className={styles.form}>
        <div className={styles.gifSelector}>
          <GifSelector
            gifs={gifs}
            selectedGif={selectedGif}
            onSelect={setSelectedGif}
          />
          <MusicSelector
            musics={musics}
            selectedMusic={selectedMusic}
            onSelect={setSelectedMusic}
          />
          <AddText
            text={text}
            setText={setText}
            textPosition={textPosition}
            setTextPosition={setTextPosition}
          />
        </div>
        <div className={styles.musicSelector}></div>
        <div className={styles.textInput}></div>
      </section>
      <section className={styles.previewSection}>
        <div className={styles.preview}>
          <EchoPreview
            selectedGif={selectedGif}
            text={text}
            textPosition={textPosition}
          />
        </div>
        <div className={styles.createButton}>
          <CreateButton
            selectedGif={selectedGif}
            selectedMusic={selectedMusic}
            text={text}
            textPosition={textPosition}
            user={user}
          />
        </div>
      </section>
    </div>
  );
}
