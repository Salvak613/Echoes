import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

  USE \`${MYSQL_DB_NAME}\`;

  CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS picture (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image_path TEXT NOT NULL,
    miniature_path TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS music (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    music_path TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS text (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    position ENUM('top', 'mid', 'bottom') NOT NULL
  );

  CREATE TABLE IF NOT EXISTS card (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    picture_id INT,
    text_id INT,
    music_id INT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_private BOOLEAN DEFAULT FALSE,
    like_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (picture_id) REFERENCES picture(id),
    FOREIGN KEY (text_id) REFERENCES text(id),
    FOREIGN KEY (music_id) REFERENCES music(id)
  );
`;

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(schema);
    await connection.end();

    console.log("✅ Database schema created successfully");
  } catch (err) {
    console.error("❌ Error during migration:", err);
  }
};

migrate();
