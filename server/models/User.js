import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // ✅ Required for local sign-up
  },
  role: {
    type: String,
    enum: ['student', 'alumni'],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpiry: Date,
  authProvider: {
    type: String,
    default: 'local',
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
