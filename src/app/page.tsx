import Image from "next/image"
import styles from "./page.module.css"
import { appRoutes } from "@/data/ROUTES"
import Link from "next/link"
import GoogleConnexion from "@/ui/GoogleConnexion"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GoogleConnexion />
        
        <h1 className={styles.title}>Welcome to Next.js!</h1>
        <div className={styles.coucou}>
        <p className={styles.description}>
          Get started by editing <code>src/app/page.tsx</code>.
        </p>
        </div>
      </main>
    </div>
  )
}
