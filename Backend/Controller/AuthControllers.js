import alluser from "../Database/Models/AuthModel.js";
import otpModel from "../Database/Models/OtpModel.js";
import sendEmail from "../utils/email.js";
import OtpEmailTemplate from "../utils/otpTemplate.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const signupController = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
      return res.status(400).send({ message: "All input fields are required" });
    }

    const existingUser = await alluser.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expireOtp = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Send OTP to user's email
    await sendEmail(
      email,
      "Use This OTP to Complete Your Verification",
      OtpEmailTemplate(fname, otp)
    );

    // Save OTP
    await otpModel.create({
      email,
      otp,
      expireAt: expireOtp,
      purpose: "signup",
    });

    // Create user but keep isVerified = false
    const newUser = await alluser.create({
      fname,
      lname,
      email,
      password,
    });

    return res.status(201).send({
      message: "User created successfully! Please check your email for OTP verification.",
      user: {
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        isVerified: newUser.isVerified,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send({ message: "Internal server error", error });
  }
};

const verifyOtpForSignup = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;

    // Input validation
    if (!email || !otp || !purpose) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Ensure purpose is correct
    if (purpose !== "signup") {
      return res.status(400).send({ message: "Invalid purpose." });
    }

    // Find OTP record
    const userRecord = await otpModel.findOne({ email, otp, purpose });

    if (!userRecord) {
      return res.status(404).send({ message: "Invalid OTP or Email." });
    }

    // Check if OTP is expired
    if (Date.now() > userRecord.expireAt) {
      await otpModel.deleteOne({ _id: userRecord._id });
      return res.status(410).send({ message: "OTP has expired." });
    }

    // Mark user as verified
    const user = await alluser.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Delete used OTP
    await otpModel.deleteOne({ _id: userRecord._id });

    return res.status(200).send({
      message: "OTP verified successfully.",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Find user
    const foundUser = await alluser.findOne({ email });

    if (!foundUser) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    // Check if user is verified
    if (!foundUser.isVerified) {
      return res.status(403).send({ message: "Please verify your email before login." });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: foundUser._id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Successful login
    return res.status(200).send({
      message: "Login successful",
      token,
      user: {
        fname: foundUser.fname,
        lname: foundUser.lname,
        email: foundUser.email,
        isVerified: foundUser.isVerified,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const LogoutController = (req, res) => {
  try {
    return res.status(200).send({message: "logout successfully"});
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const ForgotPasswordController = async (req, res) => {
  try {
    const {email} = req.body;

    if(!email){
      return res.status(400).send({message: "All fields are required."})
    }

    const foundUser = await alluser.findOne({email});

    if(!foundUser){
      return res.status(404).send({message: "user not found!"});
    }

    if (!foundUser.isVerified) {
      return res.status(403).send({ message: "Your account is not verified. Please verify before resetting password." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expireOtp = Date.now() + 10 * 60 * 1000; // 10 minutes

    await sendEmail(
      email,
      "One-Time Password (OTP) for Password Reset",
      OtpEmailTemplate(foundUser.fname, otp)
    );

    // Save OTP
    await otpModel.create({
      email,
      otp,
      expireAt: expireOtp,
      purpose: "forgot_password",
    });

    return res.status(201).send({
      message: "OTP sent successfully! Please check your email for verification.", user: {email}
    });

  } catch (error) {
    return res.status(400).send({ message: "Internal Error" });
  }
};

const verifyOtpForForgotPassword = async (req, res) => {
  try {
    const {email, otp, purpose} = req.body;

    if(!email || !otp || !purpose){
      return res.status(400).send({message: "All fields are required."})
    }

    if(purpose != "forgot_password"){
      return res.status(400).send({message: "purpose is not valid"})
    }

    const userRecord = await otpModel.findOne({email, otp, purpose});

    if(!userRecord){
      return res.status(404).send({message: "user not found!"});
    }

    if(new Date() > userRecord.expireAt){
      return res.status(400).send({message: "user has been expired please create new one!"});
    }

    await otpModel.deleteOne({_id: userRecord._id});

    return res.status(201).send({message: "otp verification successfully."})

  } catch (error) {
    return res.status(400).send({ message: "Internal Error" });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const {email, newPassword} = req.body;

    if(!newPassword || !email){
      return res.status(400).send({message: "All fields are required."})
    }

    const foundUser = await alluser.findOne({ email })

    if(!foundUser){
      return res.status(404).send({message: "user not found"});
    }

    foundUser.password = newPassword;

    await foundUser.save();

    return res.status(201).send({message: "password reset successfully"});

  } catch (error) {
    return res.status(400).send({ message: "Internal Error" });
  }
};

export {
  signupController,
  verifyOtpForSignup,
  LoginController,
  LogoutController,
  ForgotPasswordController,
  verifyOtpForForgotPassword,
  resetPasswordController,
};
