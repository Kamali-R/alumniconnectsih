import User from '../models/User.js';
import Otp from '../models/otp.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// STEP 1: Send OTP
export const sendOtp = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return res.status(400).json({ message: 'All fields are required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email }); // remove old OTPs
  const otp = new Otp({ email, otp: otpCode });
  await otp.save();

  await sendEmail(email, 'Verify your email (OTP)', `Your OTP is: ${otpCode}`);

  res.status(200).json({ message: 'OTP sent to your email' });
};

// STEP 2: Verify OTP
export const verifyOtp = async (req, res) => {
  const { name, email, password, role, otp } = req.body;

  const otpRecord = await Otp.findOne({ email, otp });
  if (!otpRecord)
    return res.status(400).json({ message: 'Invalid or expired OTP' });

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPwd, role });
  await newUser.save();
  await Otp.deleteMany({ email }); // cleanup

  res.status(201).json({ message: 'Email verified successfully' });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // token expires in 2 hours
    );

    // 4. Return token and user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
