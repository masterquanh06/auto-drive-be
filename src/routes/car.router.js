import express from 'express';
import { addCar, deleteCar, getAllCars, getCar, updateCar } from '../controllers/car.controller.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCar);
router.post('/', authenticateToken, authorizeAdmin, addCar);
router.put('/:id', authenticateToken, authorizeAdmin, updateCar);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteCar);
router.get('/search', searchCars);
export default router;


