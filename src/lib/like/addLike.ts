import { likeMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { LikeModel } from "@/model/LikeModel";
import { EchoModel } from "@/model/EchoModel";

interface AddLikeParams {
  echo: EchoModel;
  userId: number;
}

interface AddLikeResponse extends LikeModel {}

export async function addLike(
  echo: EchoModel,
  userId: number
): Promise<AddLikeResponse> {
  const res = await fetch(apiRoutes.LIKES(echo.id), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ echo, user_id: userId }),
  });

  if (!res.ok) throw new Error(likeMessages.addFail);
  return res.json();
}
