import { getMusics } from "@/lib/music/getMusics";
import { addMusic } from "@/lib/music/addMusic";

export async function fetchMusics() {
  return getMusics();
}

export async function addOneMusic(music: { name: string; music_path: string }) {
  return addMusic(music);
}
