"use client";
import { GifModel } from "@/model/GifModel";
import { MusicModel } from "@/model/MusicModel";
import { UserModel } from "@/model/UserModel";
import { addEcho } from "@/lib/card/addCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextModel } from "@/model/TextModel";
import Loader from "@/ui/Loader";

type CreateButtonParams = {
  selectedGif: GifModel | null;
  selectedMusic: MusicModel | null;
  text: TextModel | null;
  textPosition: TextModel["position"];
  user: UserModel | null;
};

export default function CreateButton({
  selectedGif,
  selectedMusic,
  text,
  textPosition,
  user,
}: CreateButtonParams) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    if (!user || !selectedGif || !selectedMusic || !text || !textPosition)
      return;
    setIsLoading(true);
    try {
      const echo = {
        selectedGif,
        selectedMusic,
        text,
        textPosition,
        user,
      };
      const result = await addEcho(echo);
      if (result?.insertedId) {
        router.push(`/creer/${result.insertedId}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? <Loader /> : "Créer"}
    </button>
  );
}
