import Recruiter from '../models/Recruiter.js';
import User from '../models/User.js';

// Create or update recruiter profile
export const saveRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    // Check if recruiter profile already exists
    let recruiterProfile = await Recruiter.findOne({ userId });
    
    if (recruiterProfile) {
      // Update existing recruiter profile
      recruiterProfile = await Recruiter.findOneAndUpdate(
        { userId },
        profileData,
        { new: true, runValidators: true }
      );
    } else {
      // Create new recruiter profile
      recruiterProfile = new Recruiter({
        userId,
        ...profileData
      });
      await recruiterProfile.save();
    }
    
    // Update User document to link recruiter profile
    await User.findByIdAndUpdate(
      userId,
      { 
        recruiterProfile: recruiterProfile._id,
        profileCompleted: true
      }
    );
    
    res.status(200).json({
      message: 'Recruiter profile saved successfully',
      recruiter: recruiterProfile
    });
  } catch (error) {
    console.error('Save recruiter profile error:', error);
    res.status(500).json({ 
      message: 'Server error during profile save',
      error: error.message 
    });
  }
};

// Get recruiter profile
export const getRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const recruiterProfile = await Recruiter.findOne({ userId })
      .populate('userId', 'name email');
    
    if (!recruiterProfile) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }
    
    res.status(200).json(recruiterProfile);
  } catch (error) {
    console.error('Get recruiter profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search alumni for recruiters
export const searchAlumni = async (req, res) => {
  try {
    const { skills, graduationYear, degree, location, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (skills) {
      query['skills'] = { $in: skills.split(',').map(skill => new RegExp(skill, 'i')) };
    }
    
    if (graduationYear) {
      query['academicInfo.graduationYear'] = parseInt(graduationYear);
    }
    
    if (degree) {
      query['academicInfo.degree'] = new RegExp(degree, 'i');
    }
    
    if (location) {
      query['personalInfo.location'] = new RegExp(location, 'i');
    }
    
    const alumni = await Alumni.find(query)
      .populate('userId', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Alumni.countDocuments(query);
    
    res.status(200).json({
      alumni,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Search alumni error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};