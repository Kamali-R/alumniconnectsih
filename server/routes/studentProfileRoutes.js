import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Save student profile
router.post('/student/profile', async (req, res) => {
  try {
    const { 
      fullName, dob, personalEmail, phone, rollNumber, collegeEmail, 
      degree, otherDegree, branch, currentYear, graduationYear, 
      linkedin, github, skills, otherSkills, interests, otherInterests, 
      careerGoals, profileImage 
    } = req.body;

    // Get user ID from auth token (you'll need to implement authentication middleware)
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with student profile data
    user.studentProfile = {
      fullName,
      dob,
      personalEmail,
      phone,
      rollNumber,
      collegeEmail,
      degree: degree === 'Other' ? otherDegree : degree,
      branch,
      currentYear,
      graduationYear,
      linkedin,
      github,
      skills,
      otherSkills,
      interests,
      otherInterests,
      careerGoals,
      profileImage
    };

    await user.save();

    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (error) {
    console.error('Error saving student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;