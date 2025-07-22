import { apiRoutes } from "@/data/ROUTES";
import { echoMessages } from "@/data/responseMessages";
import { EchoModel } from "@/model/EchoModel";

export async function publishCard(
  echo: EchoModel
): Promise<{ message: string }> {
  const res = await fetch(apiRoutes.ONEECHO(echo.id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(echo),
  });

  if (res.status === 404) {
    throw new Error(echoMessages.notFound || "Info non trouvée");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg = (data as { error?: string }).error || echoMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
