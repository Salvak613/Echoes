import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gifMessages } from "@/data/responseMessages";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, image_path, miniature_path FROM picture ORDER BY name ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: gifMessages.error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, image_path, miniature_path } = await req.json();

    if (
      typeof name !== "string" ||
      typeof image_path !== "string" ||
      typeof miniature_path !== "string" ||
      name.trim() === "" ||
      image_path.trim() === "" ||
      miniature_path.trim() === "" ||
      name.length > 100
    ) {
      return NextResponse.json(
        { error: gifMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "INSERT INTO picture (name, image_path, miniature_path) VALUES (?, ?, ?)",
      [name.trim(), image_path.trim(), miniature_path.trim()]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: gifMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json({ error: gifMessages.error }, { status: 500 });
  }
}
