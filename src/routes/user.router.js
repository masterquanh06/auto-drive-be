import express from 'express';
import { getAllUsers, getMe, login, register } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// 👇 Route cần thêm để lấy user từ token
router.get('/me', authenticateToken, getMe);
router.get('/users',  getAllUsers);
export default router;