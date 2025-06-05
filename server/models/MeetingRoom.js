import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
    meetingId: { type: String, required: true, unique: true }, // ✅ new field
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    host: { type: String, required: true },
    participants: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["upcoming", "active", "ended"], default: "upcoming" }
}, { strict: false });

export default mongoose.model('Meeting', MeetingSchema);
