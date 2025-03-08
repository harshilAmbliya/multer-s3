import express from 'express';
import profileController from '../controllers/profileController.js';
import { authorizeRole, verifyToken } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer-s3.js';
const router = express.Router();

router.get("/", verifyToken, authorizeRole(['admin', 'user']), profileController.getProfile);
router.put("/", verifyToken, authorizeRole(['admin']), upload.single("image"), profileController.updateProfile);

export default router;