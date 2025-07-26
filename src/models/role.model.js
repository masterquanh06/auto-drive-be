import pool from "../config/db.js";

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT * FROM roles");
    console.log("Roles in DB:", res.rows);
  } catch (err) {
    console.error("Lỗi khi kết nối hoặc truy vấn roles:", err);
  }
};

testConnection();

export const createRole = async (name) => {
  const result = await pool.query(
    "INSERT INTO roles (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
}

