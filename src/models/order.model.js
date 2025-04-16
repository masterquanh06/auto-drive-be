import pool from '../config/db.js';

export const createOrder = async (userId, total) => {
    const result = await pool.query(
        'INSERT INTO orders (user_id, total, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [userId, total]
    );
    return result.rows[0];
};

export const createOrderItem = async (orderId, carId, quantity, price) => {
    await pool.query(
        'INSERT INTO order_items (order_id, car_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, carId, quantity, price]
    );
};

export const getOrdersByUser = async (userId) => {
    const result = await pool.query(`
      SELECT 
        o.id AS order_id,
        o.total,
        o.created_at,
        json_agg(json_build_object(
          'car_id', oi.car_id,
          'quantity', oi.quantity,
          'price', oi.price,
          'brand', c.brand,
          'model', c.model
        )) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN cars c ON oi.car_id = c.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [userId]);

    return result.rows;
};

export const getOrderById = async (userId, orderId) => {
    const result = await pool.query(`
      SELECT 
        o.id AS order_id,
        o.total,
        o.created_at,
        json_agg(json_build_object(
          'car_id', oi.car_id,
          'quantity', oi.quantity,
          'price', oi.price,
          'brand', c.brand,
          'model', c.model
        )) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN cars c ON oi.car_id = c.id
      WHERE o.user_id = $1 AND o.id = $2
      GROUP BY o.id
    `, [userId, orderId]);

    return result.rows[0];
};