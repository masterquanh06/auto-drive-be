import express from 'express';
import { getOrder, getOrders, placeOrder } from '../controllers/order.controller.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, placeOrder);
router.get('/', authenticateToken, getOrders);
router.get('/:id', authenticateToken, getOrder);
export default router;