import styles from "./page.module.css";
import { getEchoes } from "@/lib/card/getCards";
import DisplayEchoes from "@/ui/mainPage/DisplayEchoes";

export default async function Home() {
  const echoes = await getEchoes();

  return (
    <div className={styles.page}>
      <DisplayEchoes echoes={echoes} />
    </div>
  );
}
