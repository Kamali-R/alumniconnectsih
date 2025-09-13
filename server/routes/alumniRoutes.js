import express from 'express';
import { saveAlumniProfile, getAlumniProfile } from '../controllers/alumniController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Save alumni profile
router.post('/alumni/profile', auth, saveAlumniProfile);

// Get alumni profile
router.get('/alumni/profile', auth, getAlumniProfile);

export default router;