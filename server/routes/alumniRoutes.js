import express from 'express';
import { 
  saveAlumniProfile, 
  getAlumniProfile,
  completeAlumniProfile 
} from '../controllers/alumniController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Save alumni profile
router.post('/alumni/profile', auth, saveAlumniProfile);

// Complete alumni profile (separate endpoint)
router.post('/alumni/complete-profile', auth, completeAlumniProfile);

// Get alumni profile
router.get('/alumni/profile', auth, getAlumniProfile);

export default router;