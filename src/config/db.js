import pkg from "pg";
import pgtools from "pgtools";
import dotenv from "dotenv";
import { URL } from "url";

dotenv.config();
const { Pool } = pkg;

async function initDatabase() {
  try {
    const dbUrl = process.env.DATABASE_URL;
    const url = new URL(dbUrl);
    const dbName = url.pathname.slice(1);

    const config = {
      user: url.username,
      password: url.password,
      host: url.hostname,
      port: parseInt(url.port, 10),
    };

    await pgtools.createdb(config, dbName);
    console.log(`Database "${dbName}" đã được tạo thành công.`);
  } catch (error) {
    if (error.name === "duplicate_database" || error.code === "42P04") {
      console.log("Database đã tồn tại.");
    } else {
      console.error("Lỗi khi tạo database:", error);
      process.exit(1);
    }
  }
}

await initDatabase();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50),
        avatar VARCHAR(255)
      );
    `);
    console.log('Bảng "users" đã được tạo.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        brand VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        avatar VARCHAR(255) NOT NULL
      );
    `);
    console.log('Bảng "cars" đã được tạo.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        total NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Bảng "orders" đã được tạo.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        car_id INTEGER REFERENCES cars(id),
        quantity INTEGER NOT NULL,
        price NUMERIC(10,2) NOT NULL
      );
    `);
    console.log('Bảng "order_items" đã được tạo.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        car_id INTEGER REFERENCES cars(id),
        quantity INTEGER NOT NULL
      );
    `);
    console.log('Bảng "cart" đã được tạo.');
  } catch (error) {
    console.error("Lỗi khi tạo bảng:", error);
    process.exit(1);
  }
}

await initTables();

export default pool;
