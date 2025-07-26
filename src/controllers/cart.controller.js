import { addToCart, deleteCartItem, getCartByUserId, updateCartQuantity, getCartById } from "../models/cart.model.js";

export const CreateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { carId, quantity } = req.body;

        const cartItem = await addToCart(userId, carId, quantity);
        res.status(201).json(cartItem)
    } catch (err) {
        console.log("Error", err);
        res.status(500).json({ message: "Server error" })
    }

};

export const updateCartItemQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { quantity } = req.body;
        const { id } = req.params;
        const cartItem = await getCartById(id, userId);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }
        const updatedCartItem = await updateCartQuantity(quantity, id, userId);
        console.log("updatedCartItem", updatedCartItem);
        res.status(201).json(updatedCartItem);
    }
    catch (err) {
        console.log("Error", err);
        res.status(500).json({ message: "Server error" })
    }
};

export const getCart = async (req, res) => {
    try {
        const UserId = req.user.id;
        const CartItems = await getCartByUserId(UserId);
        res.json(CartItems);
    } catch (err) {
        console.log("Error", err)
        res.status(500).json
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const cartItem = await getCartById(id, userId);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        const deletedItem = await deleteCartItem(id, userId);
        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.json({ message: "Item removed from cart", deletedItem })
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ message: "Server error" })
    }
}