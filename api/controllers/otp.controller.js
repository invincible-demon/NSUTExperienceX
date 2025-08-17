import OTP from '../models/otp.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import { validateNSUTEmail } from '../utils/validateEmail.js';
import { generateOTP, sendOTPEmail, sendWelcomeEmail } from '../utils/emailService.js';
import bcryptjs from 'bcryptjs';

// Send OTP for email verification
export const sendOTP = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return next(errorHandler(400, 'Email is required'));
  }

  // Validate NSUT email domain
  if (!validateNSUTEmail(email)) {
    return next(errorHandler(400, 'Only @nsut.ac.in email addresses are allowed'));
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, 'User with this email already exists'));
    }

    // Check if there's an existing unused OTP for this email
    const existingOTP = await OTP.findOne({
      email,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (existingOTP) {
      const timeDiff = existingOTP.expiresAt - new Date();
      const minutesLeft = Math.ceil(timeDiff / (1000 * 60));

      if (minutesLeft > 8) { // Allow resend after 2 minutes
        return next(errorHandler(400, `Please wait ${minutesLeft - 8} minutes before requesting a new OTP`));
      }
    }

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    const newOTP = new OTP({
      email,
      otp,
      expiresAt,
    });

    await newOTP.save();

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      await OTP.findByIdAndDelete(newOTP._id);
      return next(errorHandler(500, 'Failed to send OTP email. Please try again.'));
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      email: email,
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP and complete registration
export const verifyOTP = async (req, res, next) => {
  const { email, otp, username, password } = req.body;

  if (!email || !otp || !username || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  // Validate NSUT email domain
  if (!validateNSUTEmail(email)) {
    return next(errorHandler(400, 'Only @nsut.ac.in email addresses are allowed'));
  }

  try {
    // Find the OTP
    const otpRecord = await OTP.findOne({
      email,
      otp,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return next(errorHandler(400, 'Invalid or expired OTP'));
    }

    // Mark OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // Create new user
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    });

    await newUser.save();

    // Send welcome email
    await sendWelcomeEmail(email, username);

    res.status(201).json({
      success: true,
      message: 'Email verified and account created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Resend OTP
export const resendOTP = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return next(errorHandler(400, 'Email is required'));
  }

  // Validate NSUT email domain
  if (!validateNSUTEmail(email)) {
    return next(errorHandler(400, 'Only @nsut.ac.in email addresses are allowed'));
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, 'User with this email already exists'));
    }

    // Delete any existing unused OTPs for this email
    await OTP.deleteMany({ email, isUsed: false });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    const newOTP = new OTP({
      email,
      otp,
      expiresAt,
    });

    await newOTP.save();

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      await OTP.findByIdAndDelete(newOTP._id);
      return next(errorHandler(500, 'Failed to send OTP email. Please try again.'));
    }

    res.status(200).json({
      success: true,
      message: 'OTP resent successfully to your email',
      email: email,
    });
  } catch (error) {
    next(error);
  }
};
