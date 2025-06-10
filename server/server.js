import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js"
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
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
