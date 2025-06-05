import User from "../models/User.js";
import jwt from "jsonwebtoken";
import admin from "../firebase.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password is required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password" });
  }
};

export const googleLogin = async (req, res) => {
  const { username, email, avatar } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        username,
        email,
        avatar,
        isGoogleAccount: true
      });
      await user.save();
    }
    // console.log(user._id)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // console.log(token)
    res.status(200).json({
      message: "User login successful",
      user,
      token
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
