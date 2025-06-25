import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    required: true,
    index: { expires: 0 } 
  },
  purpose: {
    type: String,
    enum: ["signup", "forgot_password"]
  }
}, { timestamps: true });

const otpModel = mongoose.model("otp", OtpSchema);
export default otpModel;
