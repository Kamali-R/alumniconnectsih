import User from '../models/User.js';
import Otp from '../models/otp.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// STEP 1: Send OTP
export const sendOtp = async (req, res) => {
  const { name, email, password, role, purpose } = req.body;

  if (!email)
    return res.status(400).json({ message: 'Email is required' });

  if (purpose === 'register') {
    if (!name || !password || !role)
      return res.status(400).json({ message: 'All fields are required for registration' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
  } else if (purpose === 'reset') {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.deleteMany({ email });

  const otp = new Otp({ email, otp: otpCode });
  await otp.save();

  await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otpCode}`);

  res.status(200).json({ message: 'OTP sent to your email' });
};

/// Updated verifyOtp function
export const verifyOtp = async (req, res) => {
  const { name, email, password, role, otp, purpose } = req.body;

  const otpRecord = await Otp.findOne({ email, otp });
  if (!otpRecord)
    return res.status(400).json({ message: 'Invalid or expired OTP' });

  if (purpose === 'register') {
    // Check if user already exists again (just in case)
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPwd, role });
    await newUser.save();
  }
  const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
  
  await Otp.deleteMany({ email });
  res.status(200).json({ message: 'OTP verified successfully'});
};

// ✅ FIXED: New function for password reset verification
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // ✅ IMPORTANT: Mark OTP as verified but don't delete it yet
    // We'll delete it after successful password reset
    await Otp.updateOne({ email, otp }, { verified: true });
    
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('Verify reset OTP error:', err);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
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
    res.status(500).json({ message: 'Server error:' +err.message});
  }
};

// 🔁 Send OTP for Forgot Password (reuse sendEmail)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email }); // Remove old OTPs
    const otp = new Otp({ email, otp: otpCode, verified: false });
    await otp.save();

    await sendEmail(email, 'Reset your password', `Your OTP is: ${otpCode}`);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

// ✅ FIXED: Reset password function
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // ✅ Check if there's a verified OTP for this email
    const otpRecord = await Otp.findOne({ email, verified: true });
    if (!otpRecord) {
      return res.status(400).json({ 
        message: 'Please verify your OTP first' 
      });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Update the password
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPwd });
    
    // ✅ Clean up OTP records after successful password reset
    await Otp.deleteMany({ email });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};