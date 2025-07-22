"use client";

import { useUserContext } from "@/context/UserContext";
import LINK from "next/link";
import GoogleConnexion from "./GoogleConnexion";
import GoogleDeconnexion from "./GoogleDeconnexion";
import { useSession } from "next-auth/react";
import styles from "./Header.module.css";
import { useState } from "react";

export default function Header() {
  const { user } = useUserContext();
  const { data: session, status } = useSession();
  const [showLogout, setShowLogout] = useState(false);

  if (status === "loading") {
    return null;
  }

  if (!user)
    return (
      <header className={styles.globalHeader}>
        <h1>Echoes</h1>
        <nav className={styles.nav}>
          <LINK href="/">Explorer</LINK>
          <GoogleConnexion />
        </nav>
      </header>
    );

  return (
    <header className={styles.globalHeader}>
      <p className={styles.title}>Echoes</p>
      <div className={styles.navigationContainer}>
        <nav className={styles.nav}>
          <LINK href="/">Explorer</LINK>
          <LINK href="/creer">Créer</LINK>
          <LINK href="/collection">Ma Collection</LINK>
        </nav>
        {session?.user?.image && (
          <span
            className={`${styles.profileWrapper} ${
              showLogout ? styles.showLogout : ""
            }`}
          >
            <img
              src={session.user.image}
              className={styles.profileImage}
              alt="Profil Google"
              onClick={() => setShowLogout(!showLogout)}
            />
            <span className={styles.logoutButton}>
              <GoogleDeconnexion />
            </span>
          </span>
        )}
      </div>
    </header>
  );
}
