import pool from '../config/db.js';


export const getCars = async () => {
    const result = await pool.query('SELECT * FROM cars');
    return result.rows;
};

export const getCarbyId = async (id) => {
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    return result.rows[0];
};


export const createCar = async ({ brand, model, price, avatar }) => {
    const result = await pool.query(
        'INSERT INTO cars (brand, model, price , avatar) VALUES ($1, $2, $3, $4) RETURNING *',
        [brand, model, price, avatar]
    );
    return result.rows[0];
};
export const updateCarById = async (id, brand, model, price, avatar) => {
    const result = await pool.query(
        `UPDATE cars
       SET brand = $1, model = $2, price = $3 , avatar = $4
       WHERE id = $5
       RETURNING *`,
        [brand, model, price, id, avatar]
    );
    return result.rows[0];
};

export const deleteCarById = async (id) => {
    const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
}

export const searchCarsModel = async ({ brand, model, priceMin, priceMax }) => {
    let query = 'SELECT * FROM cars WHERE 1=1';
    const values = [];

    if (brand) {
        values.push(`%${brand}%`);
        query += ` AND brand ILIKE $${values.length}`;
    }

    if (model) {
        values.push(`%${model}%`);
        query += ` AND model ILIKE $${values.length}`;
    }

    if (priceMin) {
        values.push(priceMin);
        query += ` AND price >= $${values.length}`;
    }

    if (priceMax) {
        values.push(priceMax);
        query += ` AND price <= $${values.length}`;
    }

    const result = await pool.query(query, values);
    return result.rows;
};