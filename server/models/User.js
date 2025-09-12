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
    required: function() {
      return this.authProvider === 'local'; // Only required for local authentication
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: {
      values: ['student', 'alumni'],
      message: 'Role must be either student or alumni'
    },
    required: [true, 'Role is required']
  },
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
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String,
    sparse: true // Allows null values but ensures uniqueness for non-null values
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  profileCompleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ authProvider: 1, googleId: 1 });

// Virtual for full name (if you want to split name later)
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to handle OTP expiry
userSchema.pre('save', function(next) {
  if (this.isModified('otp') && this.otp) {
    // Set OTP expiry to 10 minutes from now
    this.otpExpiry = Date.now() + 10 * 60 * 1000;
  }
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if OTP is valid
userSchema.methods.isOtpValid = function() {
  return this.otpExpiry && this.otpExpiry > Date.now();
};

// Static method to find user by email or googleId
userSchema.statics.findByEmailOrGoogleId = function(email, googleId) {
  return this.findOne({
    $or: [
      { email: email.toLowerCase() },
      { googleId: googleId }
    ]
  });
};

// Query helper to exclude sensitive data
userSchema.query.excludeSensitive = function() {
  return this.select('-password -otp -otpExpiry');
};

export default mongoose.model('User', userSchema);