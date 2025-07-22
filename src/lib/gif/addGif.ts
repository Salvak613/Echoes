import { gifMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addMusic(gif: {
  name: string;
  image_path: string;
  miniature_path: string;
}) {
  const res = await fetch(apiRoutes.GIFS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gif),
  });

  if (!res.ok) throw new Error(gifMessages.addFail);
  return res.json();
}
