"use client";

import { useUserContext } from "@/context/UserContext";
import LINK from "next/link";
import GoogleConnexion from "@/ui/Google/GoogleConnexion";
import GoogleDeconnexion from "@/ui/Google/GoogleDeconnexion";
import { useSession } from "next-auth/react";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { useMute } from "@/context/MuteContext";
import MuteButton from "@/ui/components/MuteButton";

export default function Header() {
  const { user } = useUserContext();
  const { data: session, status } = useSession();
  const [showLogout, setShowLogout] = useState(false);
  const { muted, setMuted } = useMute();

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (session?.user?.image) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = session.user.image;
    }
  }, [session?.user?.image]);

  if (status === "loading") {
    return null;
  }

  if (!user)
    return (
      <header className={styles.globalHeader}>
        <LINK href="/" className={styles.title}>
          ECHOES
        </LINK>
        <MuteButton
          muted={muted}
          setMuted={setMuted}
          className={styles.muteButton}
        />
        <div className={styles.navigationContainer}>
          <nav className={styles.nav}>
            <LINK href="/">Explorer</LINK>
            <GoogleConnexion />
          </nav>
        </div>
      </header>
    );

  return (
    <header className={styles.globalHeader}>
      <LINK href="/" className={styles.title}>
        Echoes
      </LINK>
      <MuteButton
        muted={muted}
        setMuted={setMuted}
        className={styles.muteButton}
      />
      <div className={styles.navigationContainer}>
        <nav className={styles.nav}>
          <LINK href="/">Explorer</LINK>
          <LINK href="/creer">Créer</LINK>
          <LINK href="/collection">Collection</LINK>
        </nav>
        {session?.user?.image && (
          <span
            className={`${styles.profileWrapper} ${
              showLogout ? styles.showLogout : ""
            }`}
          >
            {imageLoaded ? (
              <img
                src={session.user.image}
                className={styles.profileImage}
                alt="Profil Google"
                onClick={() => setShowLogout(!showLogout)}
              />
            ) : (
              <div
                className={styles.avatarPlaceholder}
                onClick={() => setShowLogout(!showLogout)}
              >
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <span className={styles.logoutButton}>
              <GoogleDeconnexion />
            </span>
          </span>
        )}
      </div>
    </header>
  );
}
