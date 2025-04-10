import { createCar, getAllCars , getCarbyId } from '../models/car.model.js';

// Lấy all xe
export const getCars = async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

// lấy xe theo id 
export const getCar = async (req, res) => { 
  const { id } = req.params;
  try {
    const car = await getCarbyId(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car' });
  }
}

// Thêm xe mới
export const addCar = async (req, res) => {
  const { brand, model, price } = req.body;
  try {
    const newCar = await createCar({ brand, model, price });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add car' });
  }
};
