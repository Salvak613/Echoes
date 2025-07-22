import { musicMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addMusic(music: { name: string; music_path: string }) {
  const res = await fetch(apiRoutes.MUSICS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(music),
  });

  if (!res.ok) throw new Error(musicMessages.addFail);
  return res.json();
}
