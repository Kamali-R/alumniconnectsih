import express from 'express';
import { sendOtp, verifyOtp } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
const router = express.Router();

router.post('/send-otp', sendOtp);       // Step 1
router.post('/verify-otp', verifyOtp);   // Step 2
router.post('/login', login);
export default router;



