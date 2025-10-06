import Student from '../models/Student.js';
import User from '../models/User.js';

// Create or update student profile
export const saveStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    console.log('Saving student profile for user:', userId);
    
    // Check if student profile already exists
    let studentProfile = await Student.findOne({ userId });
    
    if (studentProfile) {
      // Update existing student profile
      studentProfile = await Student.findOneAndUpdate(
        { userId },
        { 
          ...profileData,
          status: 'complete'
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new student profile
      studentProfile = new Student({
        userId,
        ...profileData,
        status: 'complete'
      });
      await studentProfile.save();
    }
    
    // Update User document to mark profileCompleted = true and link student profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profileCompleted: true,
        studentProfile: studentProfile._id,
        name: profileData.personalInfo.fullName
      },
      { new: true }
    ).select('-password');
    
    console.log('Student profile saved successfully for user:', userId);
    
    res.status(200).json({
      message: 'Student profile saved successfully',
      user: updatedUser,
      student: studentProfile
    });
  } catch (error) {
    console.error('Save student profile error:', error);
    res.status(500).json({ 
      message: 'Server error during profile save',
      error: error.message 
    });
  }
};

// Get student profile
export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const studentProfile = await Student.findOne({ userId });
    
    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    
    res.status(200).json(studentProfile);
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Complete student profile (separate from alumni)
// controllers/studentController.js
export const completeStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    console.log('🟡 Saving student profile for user:', userId);
    console.log('🟡 Profile data received:', profileData);
    
    // Check if user is actually a student
    const user = await User.findById(userId);
    if (user.role !== 'student') {
      console.log('🔴 User is not a student:', user.role);
      return res.status(400).json({ 
        message: 'User is not registered as a student' 
      });
    }
    
    let studentProfile = await Student.findOne({ userId });
    
    if (studentProfile) {
      // Update existing
      studentProfile = await Student.findOneAndUpdate(
        { userId },
        { ...profileData, status: 'complete' },
        { new: true, runValidators: true }
      );
    } else {
      // Create new
      studentProfile = new Student({
        userId,
        ...profileData,
        status: 'complete'
      });
      await studentProfile.save();
    }
    
    // Update User document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profileCompleted: true,
        studentProfile: studentProfile._id,
        name: profileData.personalInfo?.fullName || user.name
      },
      { new: true }
    ).select('-password');
    
    console.log('🟢 Student profile saved successfully');
    
    res.status(200).json({
      message: 'Student profile saved successfully',
      user: updatedUser,
      student: studentProfile
    });
    
  } catch (error) {
    console.error('🔴 Save student profile error:', error);
    res.status(500).json({ 
      message: 'Server error during profile save',
      error: error.message 
    });
  }
};