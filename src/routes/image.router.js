
import express from 'express';
import multer from '../config/multer.config.js';
import { deleteImage } from '../utils/deleteImage.js';

const router = express.Router();

router.post('/', multer.single('avatar'), (req, res) => {
    try {
        const file = req.file;
        res.json({
            message: 'Upload thành công!',
            url: file.path, // link ảnh
            public_id: file.filename
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:public_id', async (req, res) => {
    try {
        const { public_id } = req.params;
        const result = await deleteImage(public_id);
        res.status(200).json({ message: 'Xoá ảnh thành công!', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
