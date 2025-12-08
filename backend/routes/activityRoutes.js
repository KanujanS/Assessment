import express from "express";
import auth from "../middleware/auth.js";
import { getUserLogs } from "../controllers/activityController.js";

const router = express.Router();

router.get("/", auth, getUserLogs);

export default router;