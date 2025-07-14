import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {
  sendOtp,
  verifyOtp,
  login,
  resetPassword,   // ✅ New controller
} from '../controllers/authController.js';

const router = express.Router();

// Existing OTP & login routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

// ✅ Forgot Password Routes
router.post('/forgot-password', sendOtp); // Same as sendOtp
router.post('/reset-password', resetPassword); // Handles OTP + new password

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'http://localhost:3000/signup'
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

export default router;
