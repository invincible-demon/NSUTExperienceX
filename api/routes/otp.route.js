import express from 'express';
import { sendOTP, verifyOTP, resendOTP } from '../controllers/otp.controller.js';

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

export default router;
