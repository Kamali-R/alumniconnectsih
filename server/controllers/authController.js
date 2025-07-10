import User from '../models/User.js';
import Otp from '../models/otp.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';

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

  res.status(201).json({ message: 'User registered successfully' });
};
