import pool from '../config/db.js';


export const getCars = async () => {
    const result = await pool.query(`
    SELECT 
      cars.*,
      specifications.mileage,
      specifications.fuel,
      specifications.transmission
    FROM cars
    LEFT JOIN specifications ON specifications.car_id = cars.id
  `);
    return result.rows;
};



export const getCarById = async (id) => {
  const result = await pool.query(
    `SELECT 
        cars.*,
        specifications.mileage,
        specifications.fuel,
        specifications.transmission
     FROM cars
     LEFT JOIN specifications ON specifications.car_id = cars.id
     WHERE cars.id = $1`,
    [id]
  );

  return result.rows[0];
};



// export const createCar = async ({ brand, model, price, avatar }) => {
//     const result = await pool.query(
//         'INSERT INTO cars (brand, model, price , avatar) VALUES ($1, $2, $3, $4) RETURNING *',
//         [brand, model, price, avatar]
//     );
//     return result.rows[0];
// };

export const createCar = async ({ brand, model, price, avatar, mileage, fuel, transmission }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Thêm vào bảng cars
        const carResult = await client.query(
            `INSERT INTO cars (brand, model, price, avatar,description) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [brand, model, price, avatar]
        );

        const car = carResult.rows[0];

        // 2. Thêm specifications với car_id
        await client.query(
            `INSERT INTO specifications (mileage, fuel, transmission, car_id) 
             VALUES ($1, $2, $3, $4)`,
            [mileage, fuel, transmission, car.id]
        );

        await client.query('COMMIT');

        return car;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export const updateCarById = async (id, brand, model, price, avatar, description, mileage, fuel, transmission) => {
  // Cập nhật bảng cars
  const carResult = await pool.query(
    `UPDATE cars
     SET brand = $1, model = $2, price = $3, avatar = $4, description = $5
     WHERE id = $6
     RETURNING *`,
    [brand, model, price, avatar, description, id]
  );

  // Cập nhật bảng specifications
  await pool.query(
    `UPDATE specifications
     SET mileage = $1, fuel = $2, transmission = $3
     WHERE car_id = $4`,
    [mileage, fuel, transmission, id]
  );

  return carResult.rows[0];
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