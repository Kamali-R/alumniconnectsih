import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database to ensure they still exist
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account deactivated' });
    }
    
    // Add user to request object
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      profileCompleted: user.profileCompleted
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(500).json({ message: 'Authentication error' });
    }
  }
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Recruiter middleware
const requireRecruiter = (req, res, next) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ message: 'Recruiter access required' });
  }
  next();
};

// Alumni/Student middleware
const requireAlumni = (req, res, next) => {
  if (req.user.role !== 'alumni' && req.user.role !== 'student') {
    return res.status(403).json({ message: 'Alumni/Student access required' });
  }
  next();
};
export default auth;
export { auth,requireAdmin, requireRecruiter, requireAlumni };