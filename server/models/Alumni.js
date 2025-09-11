import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  dob: { type: Date },
  gender: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  degreeType: { type: String },
  fieldOfStudy: { type: String },
  graduationYear: { type: Number },
  gpa: { type: String },
  studentId: { type: String, required: true },
  activities: { type: String },
  experiences: [{
    jobTitle: { type: String },
    company: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    jobDescription: { type: String },
    industry: { type: String },
    workLocation: { type: String }
  }],
  linkedin: { type: String },
  website: { type: String },
  skills: [String],
  bio: { type: String },
  networking: [String],
  privacy: [String],
  terms: { type: Boolean, required: true },
  status: { type: String, enum: ['draft', 'complete'], default: 'draft' }
}, { timestamps: true });

export default mongoose.model('Alumni', AlumniSchema);