import { musicMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getMusics() {
  const res = await fetch(apiRoutes.MUSICS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(musicMessages.error);
  return res.json();
}
