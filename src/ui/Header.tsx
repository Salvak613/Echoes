"use client";

import { useUserContext } from "@/context/UserContext";
import LINK from "next/link";
import GoogleConnexion from "./GoogleConnexion";
import GoogleDeconnexion from "./GoogleDeconnexion";
import { useSession } from "next-auth/react";
import styles from "./Header.module.css";

export default function Header() {
  const { user } = useUserContext();
  const { data: session } = useSession();

  if (!user)
    return (
      <header>
        <h1>Echoes</h1>
        <nav>
          <LINK href="/">Explorer</LINK>
          <GoogleConnexion />
        </nav>
      </header>
    );

  return (
    <header className={styles.globalHeader}>
      <p className={styles.title}>Echoes</p>
      <nav className={styles.nav}>
        <LINK href="/">Explorer</LINK>
        <LINK href="/creer">Créer</LINK>
        <LINK href="/collection">Ma Collection</LINK>
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="Profil Google"
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
        )}
        <GoogleDeconnexion />
      </nav>
    </header>
  );
}
