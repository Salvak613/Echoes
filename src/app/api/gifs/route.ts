import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gifMessages } from "@/data/responseMessages";
import { GifModel } from "@/model/GifModel";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, image_path FROM picture ORDER BY name ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: gifMessages.error }, { status: 500 });
  }
}
