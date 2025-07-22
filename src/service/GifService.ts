import { getGifs } from "@/lib/gif/getGifs";

export async function fetchGifs() {
  return getGifs();
}
