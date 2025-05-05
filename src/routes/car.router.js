import express from "express";
import {
  addCar,
  deleteCar,
  getAllCars,
  getCar,
  searchCars,
  updateCar,
} from "../controllers/car.controller.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCar);
router.post("/", upload.single("avatar"), addCar); // Middleware upload.single('avatar')
router.put(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  upload.single("avatar"),
  updateCar
);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteCar);
router.get("/search", searchCars);

export default router;
