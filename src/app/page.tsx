export const dynamic = "force-dynamic";

import styles from "./page.module.css";
import { getEchoes } from "@/lib/card/getCards";
import DisplayEchoes from "@/ui/mainPage/DisplayEchoes";
import { EchoModel } from "@/model/EchoModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { getOne } from "@/lib/user/getUser";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let echoes: EchoModel[] = [];
  let userId: number | null = null;

  let fetchError = "";
  try {
    echoes = await getEchoes();
    if (session?.user?.email) {
      try {
        const user = await getOne(session.user.email);
        userId = user.id;
      } catch {
        userId = null;
      }
    }
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
      <DisplayEchoes echoes={echoes} userId={userId} />
    </div>
  );
}
