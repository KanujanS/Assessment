import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/auth.js";
import { getProfile, updateProfile, changePassword } from "../controllers/profileController.js";

const router = express.Router();

// Multer upload
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "./uploads/"),
  filename: (_, file, cb) =>
    cb(
      null,
      `${Date.now()}-${Math.floor(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    ),
});
const upload = multer({ storage });

router.get("/", auth, getProfile);
router.put("/update", auth, upload.single("profilePicture"), updateProfile);
router.put("/change-password", auth, changePassword);

export default router;