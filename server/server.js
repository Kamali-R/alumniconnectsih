import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

import './config/googleAuth.js'; // Load Google OAuth Strategy

import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import contactRoutes from './routes/contactRoutes.js'; // ✅ Added this line

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize Passport middleware
app.use(passport.initialize());

// ✅ Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', contactRoutes); // ✅ Added this line
app.use('/api/auth', authRoutes);
// ✅ Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Google OAuth Routes
app.get(
  '/api/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/Blank',
    failureRedirect: 'http://localhost:3000/login',
  })
);

// ✅ Mongo Connection
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
