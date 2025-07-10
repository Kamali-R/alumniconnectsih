import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';


const router = express.Router();

// @route   POST /api/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    console.log('📥 Request received:', req.body); // Add this line

    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // TODO: Add logic to check if user already exists, hash password, save user, etc.

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Registration Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
