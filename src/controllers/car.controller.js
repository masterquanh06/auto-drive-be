import { createCar, deleteCarById, getAllCars, getCarbyId, updateCarById } from '../models/car.model.js';

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

// update car
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, price } = req.body;
    const updatedCar = await updateCarById(id, brand, model, price);
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await deleteCarById(id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(deletedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}