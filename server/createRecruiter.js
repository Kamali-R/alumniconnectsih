// createRecruiter.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Recruiter from './models/Recruiter.js';
import dotenv from 'dotenv';

dotenv.config();

const createRecruiter = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if recruiter already exists
    const existingRecruiter = await User.findOne({ email: 'recruiter@example.com' });
    if (existingRecruiter) {
      console.log('Recruiter user already exists');
      process.exit(0);
    }
    
    // Create recruiter user
    const hashedPassword = await bcrypt.hash('recruiter123', 10);
    const user = new User({
      name: 'John Recruiter',
      email: 'recruiter@example.com',
      password: hashedPassword,
      role: 'recruiter',
      isVerified: true,
      profileCompleted: false // Will be set to true after profile completion
    });
    
    await user.save();
    
    // Create recruiter profile (initially with pending status)
    const recruiter = new Recruiter({
      userId: user._id,
      companyInfo: {
        companyName: 'Tech Corp Inc',
        companyWebsite: 'https://techcorp.com',
        companySize: '100-500',
        industry: 'Technology',
        companyLocation: 'San Francisco, CA'
      },
      personalInfo: {
        fullName: 'John Recruiter',
        jobTitle: 'Senior Talent Acquisition',
        workEmail: 'recruiter@example.com',
        phone: '+1234567890',
        linkedin: 'https://linkedin.com/in/johnrecruiter'
      },
      status: 'pending' // Needs admin approval
    });
    
    await recruiter.save();
    
    console.log('Recruiter created successfully');
    console.log('Email: recruiter@example.com');
    console.log('Password: recruiter123');
    console.log('Note: This account needs admin approval before it can be used');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating recruiter:', error);
    process.exit(1);
  }
};

createRecruiter();