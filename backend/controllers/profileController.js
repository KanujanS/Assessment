import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  res.json(user);
};

export const updateProfile = async (req, res) => {
  try {
    const { name, dob } = req.body;

    const update = {};
    if (name) update.name = name;
    if (dob) update.dob = dob;
    if (req.file) update.profilePicture = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user._id, update, {
      new: true,
    }).select("-password -refreshToken");

    await ActivityLog.create({
      user: req.user._id,
      message: "Profile updated",
    });

    res.json(user);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await ActivityLog.create({
      user: req.user._id,
      message: "Password changed",
    });

    res.json({ message: "Password changed successfully" });
  } catch {
    res.status(500).json({ message: "Could not change password" });
  }
};