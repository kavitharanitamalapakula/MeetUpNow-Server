import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js"
dotenv.config();
const app = express();

app.use(cors(
  { origin: ["https://meet-up-now-one.vercel.app", "http://localhost:5173"], methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] }
));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(console.error);

app.get("/test", (req, res) => {
  try {
    res.send("hello running succesfully")
  } catch (err) {
    res.status(500).json(err)
  }

})

// API Routes
app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);