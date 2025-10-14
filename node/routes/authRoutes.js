import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (optional — clears client-side token)
 * @access  Private
 */
router.post("/logout", protect, logoutUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get logged-in user's profile
 * @access  Private
 */
router.get("/me", protect, getMe);

export default router;
