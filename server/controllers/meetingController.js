import Meeting from "../models/MeetingRoom.js";
import generateMeetingId from "../utils/generateMeetingId.js";

//schedule the Meeting
export const scheduleMeeting = async (req, res) => {
    try {
        const { title, description, date, participants } = req.body;
        let meetingId;
        let meetingExists = true;
        while (meetingExists) {
            meetingId = generateMeetingId();
            const existing = await Meeting.findOne({ meetingId });
            if (!existing) meetingExists = false;
        }

        const meeting = new Meeting({
            meetingId,
            title,
            description,
            date,
            host: req.user._id.toString(),
            participants,
        });

        await meeting.save();
        res.status(201).json(meeting);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error scheduling meeting', error });
    }
};

// fetch scheduled meetings
export const getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({ host: req.user._id.toString() });
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meetings', error });
    }
};


export const getMeetingById = async (req, res) => {
    try {
        const meeting = await Meeting.findOne({ meetingId: req.params.id });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meeting', error });
    }
};


export const updateMeeting = async (req, res) => {
    try {
        const { title, description, date, participants } = req.body;
        const meeting = await Meeting.findOne({ meetingId: req.params.id });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        if (meeting.host !== req.user._id.toString()) return res.status(403).json({ message: 'Access denied' });

        meeting.title = title || meeting.title;
        meeting.description = description || meeting.description;
        meeting.date = date || meeting.date;
        meeting.participants = participants || meeting.participants;

        await meeting.save();
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ message: 'Error updating meeting', error });
    }
};

export const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findOne({ meetingId: req.params.id });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        if (meeting.host !== req.user._id.toString()) return res.status(403).json({ message: 'Access denied' });

        await Meeting.deleteOne({ meetingId: req.params.id });
        res.status(200).json({ message: 'Meeting deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting meeting', error });
    }
};

// Add participant to a meeting
export const addParticipant = async (req, res) => {
    try {
        const { email } = req.body;
        const { id } = req.params;

        const meeting = await Meeting.findOne({ meetingId: id });
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }
        if (!meeting.isActive) {
            return res.status(404).json({ message: 'Meeting not started yet' });
        }

        if (meeting.participants.includes(email)) {
            return res.status(400).json({ message: 'Participant already added' });
        }

        meeting.participants.push(email);
        await meeting.save();

        res.status(200).json({ message: 'Participant added successfully', meeting });
    } catch (error) {
        res.status(500).json({ message: 'Error adding participant', error });
    }
};
// start instant meeting
export const startMeetByHost = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await Meeting.findOne({ meetingId: id });
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        if (meeting.host !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        meeting.isActive = true;
        await meeting.save();
        res.status(200).json({ message: "success", data: meeting });
    } catch (error) {
        res.status(500).json({ message: 'Error updating meeting', error: error.message });
    }
};
