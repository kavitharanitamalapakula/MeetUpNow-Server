import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import dotenv from "dotenv"
dotenv.config()
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });

  res.status(201).json({ message: "Signup successful" });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({
    message: "Signin successful",
    user: { id: user._id, username: user.username, email: user.email },
    token
  });
});

router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", updateUserProfile);

export default router;
