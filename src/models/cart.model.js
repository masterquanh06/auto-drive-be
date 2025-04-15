import pool from '../config/db.js';

export const addToCart = async (userId, CarId, quantity = 1) => {
    const result = await pool.query(
        `INSERT INTO cart(user_id, car_id ,quantity)
            VALUES ($1 , $2 , $3 ) RETURNING *`,
        [userId, CarId, quantity]
    )
    return result.rows[0];
}

export const getCartByUserId = async (userId) => {
    const result = await pool.query(
        `SELECT cart.id as cart_id, cars.*, cart.quantity
        FROM cart 
        JOIN cars ON cart.car_id = cars.id
        WHERE cart.user_id = $1`,
        [userId]
    );
    return result.rows;
}

export const deleteCartItem = async (cartItemId, userId) => {
    const result = await pool.query(
        `DElETE FROM cart 
        WHERE id = $1 and user_id = $2
        RETURNING *`,
        [cartItemId, userId]
    );
    return result.rows[0];
}