import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", auth, admin, getAllUsers);
router.delete("/users/:id", auth, admin, deleteUser);

export default router;