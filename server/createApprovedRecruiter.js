// createApprovedRecruiter.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Recruiter from './models/Recruiter.js';
import dotenv from 'dotenv';

dotenv.config();

const createApprovedRecruiter = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Create recruiter user
    const hashedPassword = await bcrypt.hash('recruiter123', 10);
    const user = new User({
      name: 'Sarah Recruiter',
      email: 'sarah.recruiter@techcorp.com',
      password: hashedPassword,
      role: 'recruiter',
      isVerified: true,
      profileCompleted: true // Set to true to skip profile completion
    });
    
    await user.save();
    
    // Create approved recruiter profile
    const recruiter = new Recruiter({
      userId: user._id,
      companyInfo: {
        companyName: 'TechCorp Solutions',
        companyWebsite: 'https://techcorp.com',
        companySize: '100-500',
        industry: 'Technology',
        companyLocation: 'San Francisco, CA'
      },
      personalInfo: {
        fullName: 'Sarah Recruiter',
        jobTitle: 'Senior Talent Acquisition',
        workEmail: 'sarah.recruiter@techcorp.com',
        phone: '+1234567890',
        linkedin: 'https://linkedin.com/in/sarahrecruiter'
      },
      status: 'approved' // Auto-approved
    });
    
    await recruiter.save();
    
    console.log('✅ Approved recruiter created successfully');
    console.log('Email: sarah.recruiter@techcorp.com');
    console.log('Password: recruiter123');
    console.log('This account is already approved and ready to use');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating approved recruiter:', error);
    process.exit(1);
  }
};

createApprovedRecruiter();