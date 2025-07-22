import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";
import path from "path";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const GifPath = path.join(__dirname, "../src/data/Gif.json");
const Gif = JSON.parse(fs.readFileSync(GifPath, "utf-8"));

const LofiPath = path.join(__dirname, "../src/data/Lofi.json");
const Lofi = JSON.parse(fs.readFileSync(LofiPath, "utf-8"));

const seed = async () => {
  try {
    const db = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    });
    await db.execute("SET FOREIGN_KEY_CHECKS = 0");
    await db.query("DELETE FROM picture");
    await db.query("DELETE FROM music");
    await db.query("DELETE FROM user");
    await db.query("ALTER TABLE picture AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE music AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE user AUTO_INCREMENT = 1");

    for (const { name, image_path, miniature_path } of Gif) {
      await db.query(
        "INSERT INTO picture (name, image_path, miniature_path) VALUES (?, ?, ?)",
        [name, image_path, miniature_path]
      );
    }

    for (const { name, music_path } of Lofi) {
      await db.query("INSERT INTO music (name, music_path) VALUES (?, ?)", [
        name,
        music_path,
      ]);
    }

    await db.execute("SET FOREIGN_KEY_CHECKS = 1");
    await db.end();
    console.log("🌱 Database seeded successfully");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
};

seed();
