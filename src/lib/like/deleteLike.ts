import { infoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { LikeModel } from "@/model/LikeModel";
import { EchoModel } from "@/model/EchoModel";

export async function deleteLike(
  echo: EchoModel,
  userId: number
): Promise<LikeModel> {
  const res = await fetch(`${apiRoutes.LIKES(echo.id)}`, {
    method: "DELETE",
    body: JSON.stringify({ echo, user_id: userId }),
  });

  if (!res.ok) throw new Error(infoMessages.deleteFail);
  return (await res.json()) as LikeModel;
}
