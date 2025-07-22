import styles from "./Create.module.css";
import { fetchMusics } from "@/service/MusicService";
import { fetchGifs } from "@/service/GifService";
import EchoCreator from "@/ui/EchoCreator/EchoCreator";

export default async function Creer() {
  const musics = await fetchMusics();
  const gifs = await fetchGifs();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Créer un écho</h1>
      <EchoCreator musics={musics} gifs={gifs} />
    </div>
  );
}
