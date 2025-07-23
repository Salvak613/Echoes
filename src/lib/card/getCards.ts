import { echoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getEchoes() {
  const res = await fetch(apiRoutes.ALLECHOES, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(echoMessages.error);
  return res.json();
}
