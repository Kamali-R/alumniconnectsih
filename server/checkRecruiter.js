// checkRecruiter.js
import mongoose from 'mongoose';
import User from './models/User.js';
import Recruiter from './models/Recruiter.js';
import dotenv from 'dotenv';

dotenv.config();

const checkRecruiter = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if recruiter user exists
    const user = await User.findOne({ email: 'recruiter@example.com' });
    console.log('User found:', user ? {
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      profileCompleted: user.profileCompleted
    } : 'No user found');
    
    if (user) {
      // Check recruiter profile
      const recruiter = await Recruiter.findOne({ userId: user._id });
      console.log('Recruiter profile:', recruiter ? {
        status: recruiter.status,
        companyName: recruiter.companyInfo.companyName
      } : 'No recruiter profile found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking recruiter:', error);
    process.exit(1);
  }
};

checkRecruiter();