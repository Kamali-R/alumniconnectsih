import User from '../models/User.js';
import Alumni from '../models/Alumni.js';
import Recruiter from '../models/Recruiter.js';
import Admin from '../models/Admin.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAlumni = await User.countDocuments({ role: 'alumni' });
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
    const pendingRecruiters = await Recruiter.countDocuments({ status: 'pending' });
    
    res.status(200).json({
      totalUsers,
      totalAlumni,
      totalStudents,
      totalRecruiters,
      pendingRecruiters
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users with filtering and pagination
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    let query = {};
    
    if (role && role !== 'all') {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await User.countDocuments(query);
    
    res.status(200).json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user status
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'User status updated', user });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pending recruiter applications
export const getPendingRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find({ status: 'pending' })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(recruiters);
  } catch (error) {
    console.error('Get pending recruiters error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve or reject recruiter
export const reviewRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const { status, adminNotes } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const recruiter = await Recruiter.findByIdAndUpdate(
      recruiterId,
      { 
        status,
        ...(adminNotes && { adminNotes })
      },
      { new: true }
    ).populate('userId', 'name email');
    
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    
    // If approved, update user's isVerified status
    if (status === 'approved') {
      await User.findByIdAndUpdate(recruiter.userId, { isVerified: true });
    }
    
    res.status(200).json({ message: `Recruiter ${status}`, recruiter });
  } catch (error) {
    console.error('Review recruiter error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create admin manually
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, adminLevel, permissions } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user with admin role
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
      profileCompleted: true
    });
    
    await user.save();
    
    // Create admin profile
    const admin = new Admin({
      userId: user._id,
      adminLevel: adminLevel || 'standard',
      permissions: permissions || {}
    });
    
    await admin.save();
    
    res.status(201).json({ message: 'Admin created successfully', user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }});
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};