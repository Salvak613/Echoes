import { echoMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { GifModel } from "@/model/GifModel";
import { MusicModel } from "@/model/MusicModel";
import { UserModel } from "@/model/UserModel";
import { TextModel } from "@/model/TextModel";

export async function addEcho(echo: {
  selectedGif: GifModel | null;
  selectedMusic: MusicModel | null;
  textPosition: TextModel["position"];
  text: TextModel | null;
  user: UserModel | null;
}) {
  const res = await fetch(`${apiRoutes.USERS}/${echo.user?.email}/collection`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(echo),
  });

  if (!res.ok) throw new Error(echoMessages.addFail);
  return res.json();
}
