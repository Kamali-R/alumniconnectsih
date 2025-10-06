import express from 'express';
import { 
  saveStudentProfile, 
  getStudentProfile,
  completeStudentProfile 
} from '../controllers/studentController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Save student profile
router.post('/student/profile', auth, saveStudentProfile);

// Complete student profile (separate endpoint)
router.post('/student/complete-profile', auth, completeStudentProfile);

// Get student profile
router.get('/student/profile', auth, getStudentProfile);

export default router;