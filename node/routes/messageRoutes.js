import express from "express";
import { sendMessage, allMessages } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const messageRoutes = (io) => {
  // Send a message (with socket)
  router.post("/", protect, (req, res) => sendMessage(req, res, io));

  // Get all messages for a chat (no socket needed)
  router.get("/:chatId", protect, allMessages);

  return router;
};

export default messageRoutes;
