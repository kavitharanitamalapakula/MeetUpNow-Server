import express from 'express';
import { startMeetByHost, scheduleMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting, addParticipant } from '../controllers/meetingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, scheduleMeeting);
router.get('/', authMiddleware, getMeetings);
router.get('/:id', authMiddleware, getMeetingById);
router.put('/:id', authMiddleware, updateMeeting);
router.delete('/:id', authMiddleware, deleteMeeting);
router.post('/joinmeet/:id', authMiddleware, addParticipant);
router.post('/startmeet/:id', authMiddleware, startMeetByHost);

export default router;
