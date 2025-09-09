const mongoose = require('mongoose');

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
    degree: { type: String },
    fieldOfStudy: { type: String },
    graduationYear: { type: Number },
    gpa: { type: String },
    studentId: { type: String, required: true },
    achievements: { type: String },
    experiences: [{
        jobTitle: { type: String },
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
        industry: { type: String },
        location: { type: String }
    }],
    linkedIn: { type: String },
    portfolio: { type: String },
    skills: [String],
    bio: { type: String },
    networkingPrefs: {
        mentoring: { type: Boolean, default: false },
        referrals: { type: Boolean, default: false },
        collaborations: { type: Boolean, default: false },
        events: { type: Boolean, default: false }
    },
    privacySettings: {
        visible: { type: Boolean, default: true },
        showContact: { type: Boolean, default: false },
        mailNotifications: { type: Boolean, default: false },
        agreeTerms: { type: Boolean, required: true }
    },
    status: { type: String, enum: ['draft', 'complete'], default: 'draft' }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', AlumniSchema);
