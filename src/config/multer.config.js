import multer from 'multer';
import path from 'path';

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Tên file duy nhất
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Chỉ chấp nhận file ảnh
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'));
    }
};

const upload = multer({
    dest: 'uploads/',
    fileFilter,
    limits: { fileSize: 100000000 },
});

export default upload; // Export middleware upload