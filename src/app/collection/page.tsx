import styles from "./Collection.module.css";
import { getServerSession } from "next-auth";
import { getMyEchoes } from "@/lib/card/getMyCards";
import Collection from "@/ui/Collection/Collection";

export default async function CollectionPage() {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>MES ECHOS</h1>
        <p>Veuillez vous connecter pour voir votre collection.</p>
      </div>
    );
  }

  const echoes = await getMyEchoes(email);
  if (!echoes || echoes.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>MES ECHOS</h1>
        <p>Aucun écho disponible dans votre collection.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>MES ECHOS</h1>
      <Collection echoes={echoes} />
    </div>
  );
}
