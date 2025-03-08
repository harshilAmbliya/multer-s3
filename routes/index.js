import express from 'express';
import profileRoutes from './profileRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
const router = express.Router();

// auth
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/users", userRoutes);

export default router;