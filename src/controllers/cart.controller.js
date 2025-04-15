import { addToCart, deleteCartItem, getCartByUserId } from "../models/cart.model.js";

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