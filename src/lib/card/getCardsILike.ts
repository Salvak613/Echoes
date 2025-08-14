import { echoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { EchoModel } from "@/model/EchoModel";

export async function getEchoesILike(userId: number): Promise<EchoModel[]> {
  const res = await fetch(
    `${apiRoutes.ALLECHOES}?Liked=true&userId=${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(echoMessages.error);
  return res.json();
}
