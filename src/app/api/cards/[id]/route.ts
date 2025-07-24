import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoMessages } from "@/data/responseMessages";
import { EchoModel } from "@/model/EchoModel";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const [rows] = await db.query(
      `SELECT
        card.id,
        card.description,
        card.created_at,
        card.is_private,
        picture.name AS picture_name,
        picture.image_path AS picture_image_path,
        picture.miniature_path AS picture_miniature_path,
        music.name AS music_name,
        music.music_path AS music_path,
        text.content AS text_content,
        text.position AS text_position,
        user.name AS user_name,
        user.email AS user_email
      FROM card
      LEFT JOIN picture ON card.picture_id = picture.id
      LEFT JOIN music ON card.music_id = music.id
      LEFT JOIN text ON card.text_id = text.id
      LEFT JOIN user ON card.user_id = user.id
      WHERE card.id = ? AND is_private=false`,
      [id]
    );
    const results = Array.isArray(rows) ? rows : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: echoMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/echoes/[id]) :", error);
    return NextResponse.json({ error: echoMessages.error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = (await req.json()) as EchoModel;
    const { id, description, is_private } = payload;
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: echoMessages.invalidId },
        { status: 400 }
      );
    }
    if (
      typeof description !== "string" ||
      typeof is_private !== "boolean" ||
      description.length > 1000
    ) {
      return NextResponse.json(
        { error: echoMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "UPDATE card SET description = ?, is_private = ? WHERE id = ?",
      [description.trim(), is_private, id]
    )) as [import("mysql2").ResultSetHeader, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: echoMessages.notFound || "Info non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: echoMessages.updateSuccess });
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error);
    return NextResponse.json({ error: echoMessages.error }, { status: 500 });
  }
}
