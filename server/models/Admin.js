import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  
  // Admin-specific information
  adminLevel: {
    type: String,
    enum: ['super', 'standard', 'support'],
    default: 'standard'
  },
  
  permissions: {
    userManagement: { type: Boolean, default: false },
    contentManagement: { type: Boolean, default: false },
    recruiterVerification: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
    systemSettings: { type: Boolean, default: false }
  },
  
  // Admin activity tracking
  lastActive: { type: Date },
  activityLog: [{
    action: String,
    timestamp: { type: Date, default: Date.now },
    details: mongoose.Schema.Types.Mixed
  }],
  
  isSuperAdmin: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Admin', AdminSchema);