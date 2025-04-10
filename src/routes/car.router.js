import express from 'express';
import { addCar, getCar, getCars } from '../controllers/car.controller.js';

const router = express.Router();

router.get('/', getCars);
router.post('/', addCar);
router.get('/:id', getCar);
export default router;