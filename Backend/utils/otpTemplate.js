const OtpEmailTemplate = (name, otp ) => {
  return `
    <div style="background-color: #D9D9D9; padding: 30px; font-family: Arial, sans-serif;">
      <div style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      ">
        <div style="background-color: #1E3A8A; padding: 20px; color: #ffffff; text-align: center;">
          <h2 style="margin: 0;">ITX Solution</h2>
        </div>

        <div style="padding: 30px; text-align: center;">
          <h3 style="color: #1E3A8A;">Hello ${name},</h3>
          <p style="font-size: 16px; color: #333333;">
            Please use the following OTP to verify your identity. This OTP is valid for 5 minutes.
          </p>

          <div style="
            margin: 30px auto;
            display: inline-block;
            background-color: #14B8A6;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 8px;
            letter-spacing: 2px;
          ">
            ${otp}
          </div>

          <p style="font-size: 14px; color: #777777; margin-top: 20px;">
            If you did not request this, please ignore this email.
          </p>
        </div>

        <div style="background-color: #F1F5F9; padding: 15px; font-size: 12px; text-align: center; color: #555555;">
          &copy; ${new Date().getFullYear()} ITX Solution. All rights reserved.
        </div>
      </div>
    </div>
  `;
};

export default OtpEmailTemplate;
