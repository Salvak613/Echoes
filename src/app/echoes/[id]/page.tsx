import styles from "./EchoPage.module.css";
import { getOne } from "@/lib/card/getCard";
import { EchoModel } from "@/model/EchoModel";
import { notFound } from "next/navigation";
import { echoMessages } from "@/data/responseMessages";
import EchoViewer from "@/ui/components/EchoSound";
import LikeHandler from "@/ui/mainPage/LikeHandler";

interface PageParams {
  params: {
    id: string;
  };
}

export default async function EchoPage({ params }: PageParams) {
  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) {
    notFound();
  }

  let Echo: EchoModel;
  try {
    Echo = await getOne(idNum);
  } catch (err: unknown) {
    console.error(echoMessages.error, err);
    return notFound();
  }

  if (Echo.is_private === 1) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.previewContainer}>
          <img
            src={`/Gif/${Echo.picture_image_path}`}
            alt="Votre Echo"
            className={styles.previewImage}
          />
          {Echo.text_content && (
            <div
              className={`${styles.textOverlay} ${
                styles[Echo.text_position || "center"]
              }`}
            >
              {Echo.text_content}
            </div>
          )}
        </div>
        <div className={styles.descriptionContainer}>
          <LikeHandler Echo={Echo} />
          <div className={styles.itemHeader}>
            <p>
              Le{" "}
              {new Date(Echo.created_at).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}{" "}
              par {Echo.user_name}
            </p>
            {Echo.is_private ? (
              <span className={styles.privateBadge}>🔒</span>
            ) : (
              ""
            )}
          </div>
          <p className={styles.description}>{Echo.description}</p>
        </div>
      </div>
      <EchoViewer Echo={Echo} />
    </div>
  );
}
