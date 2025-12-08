import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Could not fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await ActivityLog.create({
      user: req.user._id,
      message: `Admin deleted user ${user.email}`,
    });

    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Could not delete user" });
  }
};