import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users (searchable by ?search= query)
 * @access  Private
 */
router.get("/", protect, getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get("/:id", protect, getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update a user's profile
 * @access  Private
 */
router.put("/:id", protect, updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user (optional, for account removal or admin)
 * @access  Private
 */
router.delete("/:id", protect, deleteUser);

export default router;
