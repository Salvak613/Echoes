import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoMessages } from "@/data/responseMessages";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; email: string }> }
) {
  const { id, email } = await params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) {
    return NextResponse.json({ error: echoMessages.notFound }, { status: 404 });
  }

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
      WHERE card.id = ? AND user.email = ?`,
      [id, email]
    );
    const results = Array.isArray(rows) ? rows : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: echoMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch {
    return NextResponse.json({ error: echoMessages }, { status: 500 });
  }
}
