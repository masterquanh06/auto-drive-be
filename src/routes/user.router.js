import express from 'express';
import { getMe, login, register, getUserById, updateUserById , deleteUserById} from '../controllers/user.controller.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// 👇 Route cần thêm để lấy user từ token
router.get('/me', authenticateToken, getMe);
router.get('/users/:id', authenticateToken, authorizeAdmin, getUserById);
router.put('/users/:id', authenticateToken, authorizeAdmin, updateUserById);
router.delete('/users/:id', authenticateToken, authorizeAdmin, deleteUserById);
export default router;