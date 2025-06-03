import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
    meetingId: { type: String, required: true, unique: true }, // ✅ new field
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    host: { type: String, required: true },
    participants: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
}, { strict: false });

export default mongoose.model('Meeting', MeetingSchema);
