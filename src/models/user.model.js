import pool from '../config/db.js';

export const createUser = async (username, hashedPassword, email, role) => {
    const result = await pool.query(
        "INSERT INTO users (username, password, email, role ) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, hashedPassword, email, role]
    );
    return result.rows[0];
};

export const findUserByUserName = async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1",
        [username]
    );
    return result.rows[0]
}           