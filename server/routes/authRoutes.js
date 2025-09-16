import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import express from 'express';
import { registerRecruiter } from '../controllers/authController.js';
import {
  sendOtp,
  verifyOtp,
  login,
  verifyResetOtp,
  resetPassword,
  forgotPassword,
  completeProfile,
  checkUser
} from '../controllers/authController.js';
import auth from '../middleware/authMiddleware.js';
import { requireAdmin, requireRecruiter } from '../middleware/authMiddleware.js';
import { createAdmin } from '../controllers/adminController.js';
import { saveRecruiterProfile, getRecruiterProfile, searchAlumni } from '../controllers/recruiterController.js';
const router = express.Router();

// Registration & Login Routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

// Add these routes
// Create admin manually (protected)
router.post('/create-admin', auth, requireAdmin, createAdmin);

// Recruiter profile routes
router.post('/recruiter/profile', auth, requireRecruiter, saveRecruiterProfile);
router.get('/recruiter/profile', auth, requireRecruiter, getRecruiterProfile);
router.get('/recruiter/search-alumni', auth, requireRecruiter, searchAlumni);

// Profile completion route
router.post('/complete-profile', auth, completeProfile);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);
router.post('/register/recruiter', registerRecruiter);
// In your routes file
router.get('/api/check-user', checkUser);
// Google OAuth Routes
router.get('/auth/google', (req, res, next) => {
  console.log('🚀 Initiating Google OAuth flow');
  next();
}, passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=google_auth_failed`
  }),
  async (req, res) => {
    try {
      console.log('✅ Google callback reached');
      console.log('User from passport:', req.user ? req.user.email : 'No user');
      
      if (!req.user) {
        console.error('❌ No user from Google authentication');
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=authentication_failed`);
      }
      
      // Generate JWT token with all necessary user data
      const tokenPayload = {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role || 'alumni',
        name: req.user.name,
        profileCompleted: req.user.profileCompleted || false
      };
      
      console.log('Token payload:', tokenPayload);
      
      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      console.log('Generated token for user:', req.user.email);
      
      // Redirect to frontend with token and success flag
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const redirectUrl = `${frontendUrl}/auth/google/callback?token=${token}&success=true`;
      
      console.log('🔄 Redirecting to:', redirectUrl);
      res.redirect(redirectUrl);
      
    } catch (error) {
      console.error('❌ Google callback error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
    }
  }
);

// User data endpoint (protected)
router.get('/user', auth, async (req, res) => {
  try {
    console.log('Fetching user data for ID:', req.user.id);
    
    const user = await User.findById(req.user.id).select('-password -__v');
    
    if (!user) {
      console.error('User not found for ID:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User data retrieved:', { email: user.email, role: user.role });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});
// Check if profile is completed
// Check if profile is completed
router.get('/check-profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('profileCompleted role');
    res.json({
      profileCompleted: user.profileCompleted,
      role: user.role
    });
  } catch (error) {
    console.error('Profile check error:', error);
    res.status(500).json({ message: 'Error checking profile status' });
  }
});
export default router;
