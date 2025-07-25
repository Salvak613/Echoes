import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { musicMessages } from "@/data/responseMessages";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

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

export async function POST(req: Request) {
  try {
    const { name, music_path } = await req.json();

    if (
      typeof name !== "string" ||
      typeof music_path !== "string" ||
      name.trim() === "" ||
      music_path.trim() === "" ||
      name.length > 100
    ) {
      return NextResponse.json(
        { error: musicMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "INSERT INTO music (name, music_path) VALUES (?, ?)",
      [name.trim(), music_path.trim()]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: musicMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json({ error: musicMessages.error }, { status: 500 });
  }
}
