import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUserName } from "../models/user.model.js";
export const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, hashedPassword, email, "");
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        if (err.code === '23505') { // Postgres duplicate key
            return res.status(400).json({ error: 'Email hoặc tên tài khoản đã tồn tại!' });
        }
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUserName(username);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role, avatar: user.avatar, email: user.email }, process.env.JWT_ACCESS_KEY, {
            expiresIn: "1h",
        });
        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getMe = (req, res) => {
    const { id, username, avatar, email, role } = req.user;
    res.json({ id, username, avatar, email, role }); // Trả về user info đã decode từ token
};