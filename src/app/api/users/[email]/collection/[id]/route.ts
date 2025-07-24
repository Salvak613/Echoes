import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoMessages } from "@/data/responseMessages";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; email: string }> }
) {
  const { id, email } = await params;
  console.log("API GET /collection/[id] called with:", { id, email });
  const idNum = parseInt(id, 10);
  console.log("Parsed idNum:", idNum);
  if (isNaN(idNum)) {
    console.log("idNum is NaN, returning 404");
    return NextResponse.json({ error: echoMessages.notFound }, { status: 404 });
  }

  try {
    console.log("Running SQL query for card...");
    console.log("SQL query params:", { id, email });
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
    console.log("SQL query result rows:", rows);
    const results = Array.isArray(rows) ? rows : [];
    console.log("Results array:", results);

    if (results.length === 0) {
      console.log("No card found, returning 404");
      return NextResponse.json(
        { error: echoMessages.notFound },
        { status: 404 }
      );
    }

    console.log("Card found, returning result:", results[0]);
    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/echoes/[id]) :", error);
    return NextResponse.json({ error: echoMessages.error }, { status: 500 });
  }
}
