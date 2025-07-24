import { getOne } from "@/lib/card/getMyCard";
import { EchoModel } from "@/model/EchoModel";
import { notFound } from "next/navigation";
import { echoMessages } from "@/data/responseMessages";
import { getServerSession } from "next-auth";
import styles from "./OptionsPage.module.css";
import AddInfos from "@/ui/EchoCreator/AddInfos";

interface PageParams {
  params: {
    id: string;
  };
}

export default async function OptionsPage({ params }: PageParams) {
  const session = await getServerSession();
  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) {
    notFound();
  }

  let Echo: EchoModel;
  if (!session || !session.user?.email) {
    return notFound();
  }

  try {
    Echo = await getOne(session.user.email, idNum);
  } catch (err: unknown) {
    console.error(echoMessages.error, err);
    return notFound();
  }

  if (!session || Echo.user_email !== session.user?.email) {
    return notFound();
  }

  return (
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
      <div className={styles.addInfosContainer}>
        <AddInfos Echo={Echo} />
      </div>
    </div>
  );
}
