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
    // Make password optional for Google OAuth users
    required: function() {
      return this.authProvider === 'local';
    }
  },
  role: {
    type: String,
    enum: ['student', 'alumni'],
    required: true,
  },
  googleId: { type: String },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profileCompleted: { 
    type: Boolean, 
    default: false 
  },
  alumniProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumni'
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
}, { timestamps: true });

export default mongoose.model('User', userSchema);