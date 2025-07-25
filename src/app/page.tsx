import styles from "./page.module.css";
import { getEchoes } from "@/lib/card/getCards";
import DisplayEchoes from "@/ui/mainPage/DisplayEchoes";

export default async function Home() {
  let echoes = [];
  let fetchError = "";
  try {
    echoes = await getEchoes();
  } catch {
    fetchError = "Erreur lors du chargement des échos.";
  }

  if (fetchError) {
    return (
      <div className={styles.page}>
        <h1>EXPLORER</h1>
        <div style={{ color: "red", margin: "2rem 0" }}>{fetchError}</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>EXPLORER</h1>
      <DisplayEchoes echoes={echoes} />
    </div>
  );
}
