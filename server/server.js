import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport'; // 👈 NEW
import './config/googleAuth.js'; // 👈 NEW - Load Google OAuth Strategy

import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize Passport middleware
app.use(passport.initialize());

// ✅ Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});
// ✅ Google OAuth Routes
app.get('/api/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/login'
  })
);



// ✅ Mongo Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
