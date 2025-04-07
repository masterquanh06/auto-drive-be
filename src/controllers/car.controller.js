import { getAllCars, createCar } from '../models/car.model.js';

export const getCars = async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addCar = async (req, res) => {
  try {
    const { brand, model, price } = req.body;
    const newCar = await createCar(brand, model, price);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
