import styles from "./Create.module.css";
import { fetchMusics } from "@/service/MusicService";
import { fetchGifs } from "@/service/GifService";
import EchoCreator from "@/ui/EchoCreator/EchoCreator";

export default async function Creer() {
  let musics = [];
  let gifs = [];
  let fetchError = "";
  try {
    musics = await fetchMusics();
    gifs = await fetchGifs();
  } catch (_err: unknown) {
    fetchError = "Erreur lors du chargement des musiques ou des gifs.";
  }

  if (fetchError) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>CREER UN ECHO</h1>
        <div style={{ color: "red", margin: "2rem 0" }}>{fetchError}</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>CREER UN ECHO</h1>
      <EchoCreator musics={musics} gifs={gifs} />
    </div>
  );
}
