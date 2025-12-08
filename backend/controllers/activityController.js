import ActivityLog from "../models/ActivityLog.js";

export const getUserLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(logs);
  } catch {
    res.status(500).json({ message: "Could not fetch logs" });
  }
};