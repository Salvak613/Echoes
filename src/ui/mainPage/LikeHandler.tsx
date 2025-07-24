"use client";

import styles from "./LikeHandler.module.css";
import { useEffect, useState, useRef } from "react";

import { getLikes } from "@/lib/like/getLikes";
import { addLike } from "@/lib/like/addLike";
import { deleteLike } from "@/lib/like/deleteLike";
import { EchoModel } from "@/model/EchoModel";
import { useUserContext } from "@/context/UserContext";

export default function LikeHandler({ Echo }: { Echo: EchoModel }) {
  const [likes, setLikes] = useState<number>(0);
  const [displayedLikes, setDisplayedLikes] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { user } = useUserContext();
  const animationRef = useRef<number | null>(null);

  const animateCounter = (from: number, to: number, duration: number = 800) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsAnimating(true);
    const startTime = Date.now();
    const difference = to - from;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(from + difference * easeOutCubic);
      setDisplayedLikes(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      if (!user) {
        setLikes(0);
        setDisplayedLikes(0);
        setIsLike(false);
        return;
      }
      try {
        const res = await getLikes(Echo.id, user.id);
        const newLikes = res.likeCount ?? 0;
        setLikes(newLikes);
        setIsLike(!!res.isLiked);

        if (newLikes > 0) {
          animateCounter(0, newLikes, 1200);
        } else {
          setDisplayedLikes(0);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [Echo.id, user]);

  useEffect(() => {
    if (displayedLikes !== likes && !isAnimating) {
      animateCounter(displayedLikes, likes, 600);
    }
  }, [likes]);

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

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.likeHandler}>
      <div className={styles.likeContainer}>
        <p
          className={`${styles.likeCount} ${
            isAnimating ? styles.animating : ""
          }`}
        >
          {displayedLikes}
        </p>
        <button
          onClick={handleToggleLike}
          className={`${styles.likeButton} ${isLike ? styles.liked : ""}`}
          disabled={!user ? true : isAnimating}
        >
          {isLike ? "❤️" : "🖤"}
        </button>
      </div>
    </div>
  );
}
