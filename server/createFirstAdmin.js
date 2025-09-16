import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

const createFirstAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@alumniconnect.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = new User({
      name: 'System Administrator',
      email: 'admin@alumniconnect.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
      profileCompleted: true
    });
    
    await user.save();
    
    // Create admin profile
    const admin = new Admin({
      userId: user._id,
      adminLevel: 'super',
      permissions: {
        userManagement: true,
        contentManagement: true,
        recruiterVerification: true,
        analytics: true,
        systemSettings: true
      },
      isSuperAdmin: true
    });
    
    await admin.save();
    
    console.log('First admin created successfully');
    console.log('Email: admin@alumniconnect.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating first admin:', error);
    process.exit(1);
  }
};

createFirstAdmin();