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

export const findUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
}

export const updateUser = async (id, username, email, role) => {
    const result = await pool.query("UPDATE users SET username = $2, email = $3, role = $4 WHERE id = $1 RETURNING *",
        [id, username, email, role]
    );
    return result.rows[0];
}

export const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
}   

export const getAllUser = async () => { 
    const result = await pool.query("SELECT * FROM users"); 
    return result.rows;
}