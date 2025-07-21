import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'jsonwebtoken'; // Add this line

import './config/googleAuth.js'; // Load Google OAuth Strategy

import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // ✅ This should now work
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true only if using HTTPS
  })
);


// ✅ Initialize Passport session support
app.use(passport.initialize());
app.use(passport.session());

// ✅ Initialize Passport middleware
app.use(passport.initialize());

// ✅ FIXED: Clean route structure - avoid duplicate prefixes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', contactRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


// ✅ Google OAuth Routes
app.get(
  '/api/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',   // 👈 Frontend page to redirect after login
    failureRedirect: 'http://localhost:3000/Register'
  }),
  (req, res) => {
    console.log('✅ Google Auth Successful, user:', req.user);

    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);


// ✅ Mongo Connection
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
  