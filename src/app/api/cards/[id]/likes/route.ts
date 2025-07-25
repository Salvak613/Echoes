import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { likeMessages } from "@/data/responseMessages";
import { RowDataPacket } from "mysql2";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const cardId = segments[segments.length - 2];
    const userId = url.searchParams.get("user_id");

    if (!cardId || isNaN(Number(cardId))) {
      return NextResponse.json(
        { error: likeMessages.invalidId },
        { status: 400 }
      );
    }

    const [rows] = (await db.query(
      "SELECT COUNT(*) AS likeCount FROM is_liked WHERE card_id = ?",
      [Number(cardId)]
    )) as [RowDataPacket[], unknown];

    const likeCount =
      Array.isArray(rows) &&
      rows.length > 0 &&
      typeof rows[0].likeCount === "number"
        ? rows[0].likeCount
        : 0;

    let isLiked = false;
    if (userId && !isNaN(Number(userId))) {
      const [userRows] = (await db.query(
        "SELECT 1 FROM is_liked WHERE card_id = ? AND user_id = ? LIMIT 1",
        [Number(cardId), Number(userId)]
      )) as [RowDataPacket[], unknown];
      isLiked = Array.isArray(userRows) && userRows.length > 0;
    }

    return NextResponse.json({ likeCount, isLiked });
  } catch {
    return NextResponse.json({ error: likeMessages.error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, echo } = await req.json();
    const echoId = echo?.id;
    if (typeof user_id !== "number" || typeof echoId !== "number") {
      return NextResponse.json(
        { error: likeMessages.invalidId },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "INSERT INTO is_liked (user_id, card_id) VALUES (?, ?)",
      [user_id, echoId]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: likeMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error: unknown) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json({ error: likeMessages.error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { user_id, echo } = await req.json();
  const echoId = echo?.id;

  try {
    if (isNaN(Number(echoId))) {
      return NextResponse.json(
        { error: likeMessages.invalidId },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM is_liked WHERE user_id = ? AND card_id = ?", [
      user_id,
      echoId,
    ]);
    return NextResponse.json({ message: likeMessages.deleteSuccess });
  } catch (error: unknown) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json({ error: likeMessages.error }, { status: 500 });
  }
}
