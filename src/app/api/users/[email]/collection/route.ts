import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoMessages } from "@/data/responseMessages";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
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
