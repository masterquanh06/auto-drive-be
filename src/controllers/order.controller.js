import { clearCartByUser, getCartByUser } from '../models/cart.model.js';
import { createOrder, createOrderItem, getOrderById, getOrdersByUser } from '../models/order.model.js';

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await getCartByUser(userId);

        if (!cartItems.length) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = await createOrder(userId, total);

        for (const item of cartItems) {
            await createOrderItem(order.id, item.car_id, item.quantity, item.price);
        }

        await clearCartByUser(userId);

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to place order' });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await getOrdersByUser(userId);
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get orders' });
    }
};

export const getOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id; // Order ID from the route parameter
        const order = await getOrderById(userId, orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get order details' });
    }
};