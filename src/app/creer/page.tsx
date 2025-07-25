import styles from "./Create.module.css";
import { fetchMusics } from "@/service/MusicService";
import { fetchGifs } from "@/service/GifService";
import EchoCreator from "@/ui/EchoCreator/EchoCreator";

export default async function Creer() {
  let musics = [];
  let gifs = [];
  let error = "";
  try {
    musics = await fetchMusics();
    gifs = await fetchGifs();
  } catch (error: unknown) {
    error = "Erreur lors du chargement des musiques ou des gifs.";
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>CREER UN ECHO</h1>
        <div style={{ color: "red", margin: "2rem 0" }}>{error}</div>
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
