import { echoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { EchoModel } from "@/model/EchoModel";

export async function getOne(email: string, id: number): Promise<EchoModel> {
  const res = await fetch(`${apiRoutes.MYECHO(email, id)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(echoMessages.notFound || "Information non trouvée");
  }

  if (!res.ok) {
    throw new Error(echoMessages.error);
  }

  return res.json();
}
