import dotenv from 'dotenv';
import express from 'express';
import carRoutes from './routes/car.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Để đọc req.body

// route
app.use('/cars', carRoutes); // <<< Đây nè

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});