import { gifMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getGifs() {
  const res = await fetch(apiRoutes.GIFS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(gifMessages.error);
  return res.json();
}
