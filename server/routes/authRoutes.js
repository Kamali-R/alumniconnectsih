import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Make sure to import User model
import {
  sendOtp,
  verifyOtp,
  login,
  verifyResetOtp,
  resetPassword,
  forgotPassword
} from '../controllers/authController.js';

const router = express.Router();

// Registration & Login Routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/google/callback?error=google_auth_failed`
  }),
  (req, res) => {
    console.log('Google authentication successful for user:', req.user);
    
    const token = jwt.sign(
      { 
        id: req.user._id, 
        email: req.user.email, 
        role: req.user.role,
        name: req.user.name,
        graduationYear: req.user.graduationYear
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Redirect to the frontend GoogleAuthHandler component
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/auth/google/callback?token=${token}&role=${req.user.role}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}&graduationYear=${req.user.graduationYear || ''}`;
    
    console.log('Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  }
);

// Add endpoint to fetch user data
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;