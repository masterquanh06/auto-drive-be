import {
  createCar,
  deleteCarById,
  getCarById,
  getCars,
  searchCarsModel,
  updateCarById,
} from "../models/car.model.js";
import { extractPublicId } from '../utils/extractPublicId.js';
import deleteImage from '../utils/deleteImage.js';

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
    const car = await getCarById(id);
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
    const { brand, model, price, mileage, fuel, transmission } = req.body;
    console.log("req.body: ", req.body);
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Please upload a file" });
    }
    // Cloudinary trả về file.path hoặc file.url tuỳ config
    const avatar = file.path || file.url;
    const newCar = await createCar({
      brand, model, price, avatar, mileage,description,
      fuel,
      transmission
    });
    res.status(201).json(newCar);
  } catch (error) {
    console.log("Error adding car:", error);
    res.status(500).json({ error: "Failed to add car" });
  }
};

// update car
export const updateCar = async (req, res) => {
  const { id } = req.params;
  const getCar = await getCarById(id);
  if (!getCar) {
    return res.status(404).json({ error: "Car not found" });
  }

  const { brand, model, price,description, mileage, fuel, transmission } = req.body;
  const file = req.file;

  try {
    let avatar = getCar.avatar;

    // Nếu có file ảnh mới, thì xóa ảnh cũ trên Cloudinary
    if (file) {
      const publicId = extractPublicId(avatar);
      if (publicId) {
        await deleteImage(publicId);
      }
      avatar = file.path || file.url;
    }

    const updatedCar = await updateCarById(id,brand,model,price,avatar,description,
      mileage,
      fuel,
      transmission
    );

    res.json(updatedCar);
  } catch (error) {
    console.error("loi: " + error);
    res.status(500).json({ error: "Failed to update car" });
  }
};


// delete car
export const deleteCar = async (req, res) => {
  const { id } = req.params;
  const getCar = await getCarbyId(id);
  if (!getCar) {
    return res.status(404).json({ error: "Car not found" });
  }
  try {
    let avatar = getCar.avatar;
    const publicId = extractPublicId(avatar);
    console.log("publicId: ", publicId);
    if (publicId) {
      await deleteImage(publicId);
    }
    const deletedCar = await deleteCarById(id);
    res.json("Xoá xe thành công: " + id);
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
