import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  
  // Personal Information
  personalInfo: {
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    personalEmail: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true }
  },
  
  // Academic Information
  academicInfo: {
    collegeEmail: { type: String, required: true },
    enrollmentNumber: { type: String, required: true },
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    expectedGraduationYear: { type: Number, required: true },
    currentCGPA: { type: String },
    currentSemester: { type: String }
  },
  
  // Skills & Interests
  skills: [{ type: String }],
  interests: [{ type: String }],
  careerGoals: { type: String },
  
  // Other Information
  otherInfo: {
    bio: { type: String },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String }
  },
  
  // File uploads
  resumeFileName: { type: String },
  
  status: { 
    type: String, 
    enum: ['draft', 'complete'], 
    default: 'draft' 
  }
}, { 
  timestamps: true 
});

// Add indexes for better query performance
StudentSchema.index({ userId: 1 });
StudentSchema.index({ 'personalInfo.email': 1 });
StudentSchema.index({ 'academicInfo.collegeEmail': 1 });

export default mongoose.model('Student', StudentSchema);