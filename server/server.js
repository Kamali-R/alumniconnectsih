import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

import './config/googleAuth.js'; // Load Google OAuth Strategy

import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// ✅ FIXED: Clean route structure - avoid duplicate prefixes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', contactRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ REMOVED: Duplicate Google OAuth routes (they're already in authRoutes.js)

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });