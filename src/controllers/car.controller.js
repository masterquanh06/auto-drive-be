import {
  createCar,
  deleteCarById,
  getCarbyId,
  getCars,
  searchCarsModel,
  updateCarById,
} from "../models/car.model.js";

// Lấy all xe
export const getAllCars = async (req, res) => {
  try {
    const cars = await getCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

// lấy xe theo id
export const getCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await getCarbyId(id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

// addcar
export const addCar = async (req, res) => {
  try {
    const { brand, model, price } = req.body;

    // Kiểm tra file upload
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    const avatar = file.path; // Lấy đường dẫn file từ multer

    // Tạo xe mới
    const newCar = await createCar({ brand, model, price, avatar });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: "Failed to add car" });
  }
};

// update car
export const updateCar = async (req, res) => {
  const { id } = req.params;
  const avatar = req.file ? req.file.path : null;
  const { brand, model, price } = req.body;
  try {
    const updatedCar = await updateCarById(id, brand, model, price, avatar);
    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: "Failed to update car" });
  }
};

// delete car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await deleteCarById(id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(deletedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search car
export const searchCars = async (req, res) => {
  try {
    const result = await searchCarsModel(req.query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search cars" });
  }
};
