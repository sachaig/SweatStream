const mysql = require("mysql2/promise");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

const AbstractRepository = require("./AbstractRepository");

class VideoRepository extends AbstractRepository {
  constructor() {
    super({ table: "video" });
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async update(video) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, description=?, upload_date=?, duration=?, video_url=?, img_url=?, category_id=?, user_id=? WHERE id=?`,
      [
        video.title,
        video.description,
        video.upload_date,
        video.duration,
        video.video_url,
        video.img_url,
        video.access,
        video.category_id,
        video.user_id,
        video.id,
      ]
    );

    return result.affectedRows;
  }

  async create(video) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        `INSERT INTO ${this.table} (title, description, duration, video_url, img_url, access, category_id, user_id) VALUES (?,?,?,?,?,?,?,?)`,
        [
          video.title,
          video.description,
          video.duration,
          video.video_url,
          video.img_url,
          video.access,
          video.category_id,
          video.user_id,
        ]
      );

      if (Array.isArray(video.tags_id)) {
        video.tags_id.forEach((tag) => {
          connection.query(
            `INSERT INTO video_tag (video_id, tag_id) VALUES (?,?)`,
            [result.insertId, tag]
          );
        });
      } else {
        throw new Error("tags_id is not an array");
      }

      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = VideoRepository;
