import { echoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteEcho(id: number) {
  const res = await fetch(`${apiRoutes.ALLECHOES}?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(echoMessages.deleteFail);
  return { response: res.json(), status: 200 };
}
