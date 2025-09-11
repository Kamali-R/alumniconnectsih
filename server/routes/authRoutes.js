import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  sendOtp,
  verifyOtp,
  login,
  verifyResetOtp,
  resetPassword,
  forgotPassword,
  completeProfile
} from '../controllers/authController.js';
import auth from '../middleware/authMiddleware.js'; // Create this middleware

const router = express.Router();

// Registration & Login Routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

// Profile completion route
router.post('/complete-profile', auth, completeProfile);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=google_auth_failed`
  }),
  async (req, res) => {
    try {
      console.log('Google authentication successful for user:', req.user);
      
      const token = jwt.sign(
        { 
          id: req.user._id, 
          email: req.user.email, 
          role: req.user.role,
          name: req.user.name,
          graduationYear: req.user.graduationYear,
          profileCompleted: req.user.profileCompleted || false
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      // Redirect based on profile completion status
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      let redirectUrl;
      
      if (!req.user.profileCompleted) {
        // Redirect to profile completion page
        redirectUrl = `${frontendUrl}/alumni-profile?token=${token}&role=${req.user.role}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}&profileCompleted=false`;
      } else {
        // Redirect to appropriate dashboard
        const dashboardPath = req.user.role === 'student' ? '/student-dashboard' : '/dashboard';
        redirectUrl = `${frontendUrl}${dashboardPath}?token=${token}`;
      }
      
      console.log('Redirecting to:', redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`);
    }
  }
);

// Add endpoint to fetch user data
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;