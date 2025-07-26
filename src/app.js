import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import carRoutes from './routes/car.router.js';
import cartRoutes from './routes/cart.router.js';
import orderRoutes from './routes/order.router.js';
import userRoutes from './routes/user.router.js';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // Để đọc req.body

// route
// ROUTES
// SET STORAGE

//server.js


app.use('/api/cars', carRoutes);
app.use('/api/', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});