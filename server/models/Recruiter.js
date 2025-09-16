import mongoose from 'mongoose';

const RecruiterSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  
  // Company Information
  companyInfo: {
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    companySize: { type: String },
    industry: { type: String, required: true },
    companyLocation: { type: String, required: true }
  },
  
  // Personal/Professional Information
  personalInfo: {
    fullName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    workEmail: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String }
  },
  
  // Recruitment Preferences
  recruitmentNeeds: {
    targetRoles: [{ type: String }],
    targetSkills: [{ type: String }],
    experienceLevel: { type: String },
    locations: [{ type: String }]
  },
  
  // Verification Status
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Admin Notes
  adminNotes: { type: String },
  
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Recruiter', RecruiterSchema);