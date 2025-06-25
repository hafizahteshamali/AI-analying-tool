import express from 'express';
import { ForgotPasswordController, LoginController, LogoutController, resetPasswordController, signupController, verifyOtpForForgotPassword, verifyOtpForSignup } from '../Controller/AuthControllers.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signupController);
authRoutes.post('/verify-otp-signup', verifyOtpForSignup);
authRoutes.post('/login', LoginController);
authRoutes.post('/logout', LogoutController);
authRoutes.post('/forgot-password', ForgotPasswordController);
authRoutes.post('/verify-otp-forgot-password', verifyOtpForForgotPassword);
authRoutes.post('/reset-password', resetPasswordController);


export default authRoutes;