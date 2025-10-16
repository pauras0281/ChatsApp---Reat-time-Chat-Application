import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendRequest, getRequests, respondToRequest } from "../controllers/requestController.js";

const router = express.Router();


  router.get("/", protect, getRequests);

  router.post("/send", protect, sendRequest);

  router.post("/respond", protect, respondToRequest);



export default router;
