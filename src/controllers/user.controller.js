import bcrypt from 'bcrypt';
import { createUser } from "../models/user.model.js";
export const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, hashedPassword, email, "user");
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

