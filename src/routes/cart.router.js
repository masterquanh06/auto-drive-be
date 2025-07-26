import express from 'express';
import { CreateCartItem, getCart, removeCartItem, updateCartItemQuantity} from '../controllers/cart.controller.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.patch("/:id", authenticateToken, updateCartItemQuantity);
router.post("/", authenticateToken, CreateCartItem);
router.get("/", authenticateToken, getCart);
router.delete("/:id", authenticateToken, removeCartItem);

export default router;