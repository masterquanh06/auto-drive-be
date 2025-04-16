import express from 'express';
import { getOrder, getOrders, placeOrder } from '../controllers/order.controller';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, placeOrder);
router.get('/', authenticateToken, getOrders);
router.get('/:id', authenticateToken, getOrder);
export default router;