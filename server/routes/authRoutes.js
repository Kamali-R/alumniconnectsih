// authRoutes.js
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {
  sendOtp,
  verifyOtp,
  login,
  verifyResetOtp,
  resetPassword,
  forgotPassword ,// ✅ Import the dedicated forgot password function
  completeRegistration 
} from '../controllers/authController.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Alumni from '../models/Alumni.js';
const router = express.Router();

// ✅ Registration & Login Routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/complete-registration', completeRegistration);
// ✅ Password Reset Routes
router.post('/forgot-password', forgotPassword); // Use dedicated function
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

// ✅ Google OAuth Routes
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
// ✅ Add this route for registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body;
    
    console.log('Registration attempt:', { name, email, role });
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: true
    });
    
    await user.save();
    
    // Create alumni profile if role is alumni
    if (role === 'alumni' && profile) {
      const alumni = new Alumni({
        userId: user._id,
        ...profile,
        status: 'complete'
      });
      await alumni.save();
    }
    
    // Create student profile if needed (add similar logic)
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});
export default router;
