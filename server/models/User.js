import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    // Make password optional for Google OAuth users
    required: function() {
      return this.authProvider === 'local';
    }
  },
  role: {
    type: String,
    enum: {
      values: ['student', 'alumni', 'recruiter', 'admin'],
      message: 'Role must be student, alumni, recruiter, or admin'
    },
    required: [true, 'Role is required'],
    default: 'alumni'
  },
  googleId: { type: String },
  isVerified: {
    type: Boolean,
    default: false
  },
  registrationComplete: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    select: false
  },
  otpExpiry: {
    type: Date,
    select: false
  },
  profileCompleted: { 
    type: Boolean, 
    default: false 
  },
  alumniProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumni'
  },
  recruiterProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter'
  },
  graduationYear: { type: Number },
  lastLogin: { type: Date },
  otp: String,
  otpExpiry: Date,
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  isActive: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: [String],
    default: []
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);