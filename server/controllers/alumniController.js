import Alumni from '../models/Alumni.js';
import User from '../models/User.js';

// Create or update alumni profile
export const saveAlumniProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    console.log('Saving alumni profile for user:', userId);
    
    // Check if alumni profile already exists
    let alumniProfile = await Alumni.findOne({ userId });
    
    if (alumniProfile) {
      // Update existing alumni profile
      alumniProfile = await Alumni.findOneAndUpdate(
        { userId },
        { 
          ...profileData,
          status: 'complete'
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new alumni profile
      alumniProfile = new Alumni({
        userId,
        ...profileData,
        status: 'complete'
      });
      await alumniProfile.save();
    }
    
    // Update User document to mark profileCompleted = true and link alumni profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profileCompleted: true,
        alumniProfile: alumniProfile._id,
        name: profileData.personalInfo.fullName
      },
      { new: true }
    ).select('-password');
    
    console.log('Alumni profile saved successfully for user:', userId);
    
    res.status(200).json({
      message: 'Alumni profile saved successfully',
      user: updatedUser,
      alumni: alumniProfile
    });
  } catch (error) {
    console.error('Save alumni profile error:', error);
    res.status(500).json({ 
      message: 'Server error during profile save',
      error: error.message 
    });
  }
};

// Get alumni profile
export const getAlumniProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const alumniProfile = await Alumni.findOne({ userId });
    
    if (!alumniProfile) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }
    
    res.status(200).json(alumniProfile);
  } catch (error) {
    console.error('Get alumni profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Complete alumni profile (separate from student)
export const completeAlumniProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    console.log('Completing ALUMNI profile for user:', userId);
    
    // Check if user is actually an alumni
    const user = await User.findById(userId);
    if (user.role !== 'alumni') {
      return res.status(400).json({ 
        message: 'User is not registered as an alumni' 
      });
    }
    
    // Check if alumni profile already exists
    let alumniProfile = await Alumni.findOne({ userId });
    
    if (alumniProfile) {
      // Update existing alumni profile
      alumniProfile = await Alumni.findOneAndUpdate(
        { userId },
        { 
          ...profileData,
          status: 'complete'
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new alumni profile
      alumniProfile = new Alumni({
        userId,
        ...profileData,
        status: 'complete'
      });
      await alumniProfile.save();
    }
    
    // Update User document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profileCompleted: true,
        alumniProfile: alumniProfile._id,
        name: profileData.personalInfo.fullName
      },
      { new: true }
    ).select('-password');
    
    console.log('Alumni profile saved successfully for user:', userId);
    
    res.status(200).json({
      message: 'Alumni profile saved successfully',
      user: updatedUser,
      alumni: alumniProfile
    });
  } catch (error) {
    console.error('Save alumni profile error:', error);
    res.status(500).json({ 
      message: 'Server error during profile save',
      error: error.message 
    });
  }
};