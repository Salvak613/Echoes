import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoMessages } from "@/data/responseMessages";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { email: string } }
) {
  const { email } = context.params;
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
      WHERE user.email = ?`,
      [email]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: echoMessages.error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const { user, selectedGif, selectedMusic, text, textPosition } =
      await req.json();

    if (
      typeof user !== "object" ||
      typeof selectedGif !== "object" ||
      typeof selectedMusic !== "object" ||
      typeof text !== "string" ||
      typeof textPosition !== "string" ||
      text.trim() === "" ||
      !["top", "mid", "bottom"].includes(textPosition)
    ) {
      await conn.rollback();
      return NextResponse.json(
        { error: echoMessages.invalidData },
        { status: 400 }
      );
    }

    const [textResult] = (await conn.query(
      "INSERT INTO text (content, position) VALUES (?, ?)",
      [text, textPosition]
    )) as [InsertResult, unknown];
    const textId = textResult.insertId;

    const [cardResult] = (await conn.query(
      "INSERT INTO card (user_id, picture_id, text_id, music_id, description, is_private) VALUES (?, ?, ?, ?, ?, ?)",
      [user.id, selectedGif.id, textId, selectedMusic.id, "", true]
    )) as [InsertResult, unknown];

    await conn.commit();

    return NextResponse.json({
      message: echoMessages.addSuccess,
      insertedId: cardResult.insertId,
    });
  } catch (error) {
    await conn.rollback();
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json({ error: echoMessages.error }, { status: 500 });
  } finally {
    conn.release();
  }
}
