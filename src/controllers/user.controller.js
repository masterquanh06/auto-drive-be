import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUserName, findUserById, updateUser, deleteUser, getAllUser  } from "../models/user.model.js";
export const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, hashedPassword, email, "user");
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
export const getAllUsers = async (req, res) => { 
    try { 
        const users = await getAllUser(); 
        res.json(users); 
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
}

export const getMe = (req, res) => {
    const { id, username, avatar, email, role } = req.user;
    res.json({ id, username, avatar, email, role }); // Trả về user info đã decode từ token
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Không trả về password
        const { password, ...userData } = user;
        res.json(userData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUserById = async (req, res) => {

    try {
        const { id } = req.params;
        const findUser = await findUserById(id);
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const { username, email, role } = req.body;
        const user = await updateUser(id, username, email, role);
        res.json({ message: "User updated thành công user id: " + id, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await findUserById(id);
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await deleteUser(id);
        res.json({ message: "User deleted thành công user id: " + id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};