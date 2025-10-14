import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Access or create one-on-one chat
router.post("/", protect, accessChat);

// Fetch all chats for logged-in user
router.get("/", protect, fetchChats);

// Create new group chat
router.post("/group", protect, createGroupChat);

// Rename group chat
router.put("/rename", protect, renameGroup);

// Add user to group
router.put("/groupadd", protect, addToGroup);

// Remove user from group
router.put("/groupremove", protect, removeFromGroup);

export default router;
