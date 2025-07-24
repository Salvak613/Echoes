import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { LikeModel } from "@/model/LikeModel";

export async function getLikes(
  cardId: number,
  userId?: number
): Promise<{ likeCount: number; isLiked: boolean }> {
  const url =
    userId !== undefined
      ? `${apiRoutes.LIKES(cardId)}?user_id=${userId}`
      : apiRoutes.LIKES(cardId);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(infoMessages.error);
  return res.json();
}
