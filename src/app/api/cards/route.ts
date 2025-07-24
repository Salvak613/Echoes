import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoMessages } from "@/data/responseMessages";

export async function GET() {
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
        user.email AS user_email,
        (SELECT COUNT(*) FROM is_liked WHERE is_liked.card_id = card.id) AS likeCount
      FROM card
      LEFT JOIN picture ON card.picture_id = picture.id
      LEFT JOIN music ON card.music_id = music.id
      LEFT JOIN text ON card.text_id = text.id
      LEFT JOIN user ON card.user_id = user.id
      WHERE card.is_private = 0
      ORDER BY card.created_at DESC`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: echoMessages.error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const echoId = idParam !== null ? parseInt(idParam, 10) : NaN;

    if (isNaN(echoId)) {
      return NextResponse.json(
        { error: echoMessages.invalidId },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM card WHERE id = ?", [echoId]);
    return NextResponse.json(
      { message: echoMessages.deleteSuccess },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json({ error: echoMessages.error }, { status: 500 });
  }
}
