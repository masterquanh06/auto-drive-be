import express from 'express';
import { addCar, deleteCar, getCar, getCars, updateCar } from '../controllers/car.controller.js';

const router = express.Router();

router.get('/', getCars);
router.post('/', addCar);
router.get('/:id', getCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar)
export default router;