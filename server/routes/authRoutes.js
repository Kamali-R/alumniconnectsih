// server/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. Hash the password
    const salt      = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // 4. Create & save the user
    const newUser = new User({
      name,
      email,
      password: hashedPwd,
      role
    });
    await newUser.save();

    // 5. Return success
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
