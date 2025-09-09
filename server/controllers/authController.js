import User from '../models/User.js';
import Otp from '../models/otp.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// STEP 1: Send OTP
export const sendOtp = async (req, res) => {
  const { name, email, password, role, purpose } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();

  if (purpose === 'register') {
    if (!name || !password || !role) {
      return res.status(400).json({ message: 'All fields are required for registration' });
    }

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
  } else if (purpose === 'reset') {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  }

  // Generate OTP and convert to string
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  // Delete old OTPs and save new one
  await Otp.deleteMany({ email: normalizedEmail });
  
  const otp = new Otp({ 
    email: normalizedEmail, 
    otp: otpCode,
    purpose,
    expiresAt 
  });
  
  await otp.save();
  await sendEmail(normalizedEmail, 'Your OTP Code', `Your OTP is: ${otpCode}. It will expire in 10 minutes.`);

  res.status(200).json({ message: 'OTP sent to your email' });
};

// Verify OTP function
export const verifyOtp = async (req, res) => {
  const { name, email, password, role, otp, purpose } = req.body;

  try {
    // Normalize email and OTP
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedOtp = otp.toString().trim();

    // Find the OTP record
    const otpRecord = await Otp.findOne({ 
      email: normalizedEmail, 
      otp: normalizedOtp 
    });
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP is expired
    const now = new Date();
    if (otpRecord.expiresAt < now) {
      await Otp.deleteMany({ email: normalizedEmail });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (purpose === 'register') {
      // Check if user already exists
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const hashedPwd = await bcrypt.hash(password, 10);
      const newUser = new User({ 
        name: name.trim(), 
        email: normalizedEmail, 
        password: hashedPwd, 
        role: role.trim() 
      });
      
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      await Otp.deleteMany({ email: normalizedEmail });
      
      res.status(200).json({ 
        message: 'OTP verified successfully',
        token,
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        }
      });
    } else {
      // For other purposes (like password reset verification)
      await Otp.deleteMany({ email: normalizedEmail });
      res.status(200).json({ message: 'OTP verified successfully' });
    }

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// Password reset OTP verification
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Normalize email and OTP
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedOtp = otp.toString().trim();

    const otpRecord = await Otp.findOne({ 
      email: normalizedEmail, 
      otp: normalizedOtp 
    });
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP is expired
    const now = new Date();
    if (otpRecord.expiresAt < now) {
      await Otp.deleteMany({ email: normalizedEmail });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Mark OTP as verified
    await Otp.updateOne({ email: normalizedEmail, otp: normalizedOtp }, { verified: true });
    
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('Verify reset OTP error:', err);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Return token and user info
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
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

// Forgot password function
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Remove old OTPs and save new one
    await Otp.deleteMany({ email: normalizedEmail });
    const otp = new Otp({ 
      email: normalizedEmail, 
      otp: otpCode, 
      purpose: 'reset',
      expiresAt,
      verified: false 
    });
    
    await otp.save();

    await sendEmail(normalizedEmail, 'Reset your password', `Your OTP is: ${otpCode}. It will expire in 10 minutes.`);
    
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

// Reset password function
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if there's a verified OTP
    const otpRecord = await Otp.findOne({ email: normalizedEmail, verified: true });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Please verify your OTP first' });
    }

    // Check if OTP is expired
    const now = new Date();
    if (otpRecord.expiresAt < now) {
      await Otp.deleteMany({ email: normalizedEmail });
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email: normalizedEmail }, { password: hashedPwd });
    
    // Clean up OTP records
    await Otp.deleteMany({ email: normalizedEmail });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};