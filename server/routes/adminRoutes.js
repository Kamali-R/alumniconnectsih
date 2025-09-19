import express from 'express';
import { 
  getDashboardStats, 
  getUsers, 
  updateUserStatus, 
  getPendingRecruiters, 
  reviewRecruiter 
} from '../controllers/adminController.js';
import { auth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes protected with admin authentication
router.use(auth, requireAdmin);

// Admin dashboard stats
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getUsers);
router.patch('/users/:userId/status', updateUserStatus);

// Recruiter management
router.get('/recruiters/pending', getPendingRecruiters);
router.patch('/recruiters/:recruiterId/review', reviewRecruiter);

export default router;