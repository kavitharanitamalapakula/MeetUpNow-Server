import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String, required: function () {
      return !this.isGoogleAccount;
    }
  },
  isGoogleAccount: { type: Boolean, default: false },
  avatar: { type: String, default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" },
  phone: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  joinDate: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
