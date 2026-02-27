import multer from 'multer';
import path from 'path';

// Multer config for file uploads
const storage = multer.diskStorage({
    // Can be adjusted to upload directly to memory or temp folder before Cloudinary
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        cb(new Error('File type is not supported'), false);
        return;
    }
    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
