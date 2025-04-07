import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import carRoutes from './routes/car.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());
app.use('/cars', carRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});