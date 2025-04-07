import pool from '../config/db.js';

export const getAllCars = async () => {
    const result = await pool.query('SELECT * FROM cars');
    return result.rows;
};

export const createCar = async (brand, model, price) => {
    const result = await pool.query(
        'INSERT INTO cars (brand, model, price) VALUES ($1, $2, $3) RETURNING *',
        [brand, model, price]
    );
    return result.rows[0];
};