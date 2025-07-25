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
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Réponse du serveur invalide (pas du JSON)");
  }
  return res.json();
}
