
import express from 'express';
import multer from '../config/multer.config.js';

const router = express.Router();

router.post('/', multer.single('image'), (req, res) => {
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

export default router;
