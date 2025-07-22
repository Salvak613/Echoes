import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { musicMessages } from "@/data/responseMessages";
import { MusicModel } from "@/model/MusicModel";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, music_path FROM music ORDER BY name ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: musicMessages.error }, { status: 500 });
  }
}
