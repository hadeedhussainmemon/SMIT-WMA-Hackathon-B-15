import express from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getItems)
    // Using upload middleware example: upload.single('image')
    .post(protect, upload.single('image'), createItem);

router.route('/:id')
    .get(getItemById)
    .put(protect, updateItem)
    .delete(protect, deleteItem);

export default router;
