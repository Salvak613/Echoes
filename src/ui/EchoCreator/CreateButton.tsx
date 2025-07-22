"use client";
import { GifModel } from "@/model/GifModel";
import { MusicModel } from "@/model/MusicModel";
import { UserModel } from "@/model/UserModel";

type CreateButtonParams = {
  selectedGif: GifModel | null;
  selectedMusic: MusicModel | null;
  text: string;
  textPosition: "top" | "center" | "bottom";
  user: UserModel | null;
};

export default function CreateButton({
  selectedGif,
  selectedMusic,
  text,
  textPosition,
  user,
}: CreateButtonParams) {
  return <button onClick={undefined}>Créer</button>;
}
