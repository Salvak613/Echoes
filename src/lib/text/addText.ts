import { echoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { UserModel } from "@/model/UserModel";

export async function addTxt(text: {
  text: string;
  textPosition: "top" | "mid" | "bottom";
  user: UserModel | null;
}) {
  const res = await fetch(
    `${apiRoutes.USERS}/${text.user?.email}/collection?text=true`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    }
  );

  if (!res.ok) throw new Error(echoMessages.addFail);
  return res.json();
}
