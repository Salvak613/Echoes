"use client";

import styles from "./LikeHandler.module.css";
import { useEffect, useState } from "react";

import { getLikes } from "@/lib/like/getLikes";
import { addLike } from "@/lib/like/addLike";
import { deleteLike } from "@/lib/like/deleteLike";
import { LikeModel } from "@/model/LikeModel";
import { EchoModel } from "@/model/EchoModel";
import { useUserContext } from "@/context/UserContext";
import { UserModel } from "@/model/UserModel";

export default function LikeHandler({ Echo }: { Echo: EchoModel }) {
  const [likes, setLikes] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchLikes = async () => {
      if (!user) {
        setLikes(0);
        setIsLike(false);
        return;
      }
      try {
        const res = await getLikes(Echo.id, user.id);
        setLikes(res.likeCount ?? 0);
        setIsLike(!!res.isLiked);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [Echo.id, user]);

  const handleToggleLike = async () => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }
    try {
      if (isLike) {
        await deleteLike(Echo, user.id);
        setLikes((prev) => Math.max(prev - 1, 0));
        setIsLike(false);
      } else {
        await addLike(Echo, user.id);
        setLikes((prev) => prev + 1);
        setIsLike(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className={styles.likeHandler}>
      <h2>Likes: {likes}</h2>
      <button onClick={handleToggleLike} className={styles.likeButton}>
        {isLike ? "Unlike" : "Like"}
      </button>
    </div>
  );
}
