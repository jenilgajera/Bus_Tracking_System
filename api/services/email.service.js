const nodemailer = require("nodemailer");
const jwtService = require("./jwt.service");
const {
  CORS_URL,
  ACTIVATION_PATH,
  RESET_PASSWORD_PATH,
} = require("../constants/constant");
const sendActivationEmail = async (user) => {
  try {
    // Generate the activation token
    const activationToken = jwtService.generateToken(
      { id: user._id },
      process.env.JWT_SECRET,
      "1d"
    );

    const activationLink = `${CORS_URL.SERVER_URL}${ACTIVATION_PATH}?token=${activationToken}`;

    // Create the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP transporter verified successfully.");

    // Set mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Activate Your Account",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 30px; text-align: center; border-radius: 8px;">
      <h1 style="color: #ffffff; margin-bottom: 20px;">Welcome, ${user.email} 👋</h1>
      
      <p style="font-size: 16px; line-height: 1.5;">
        Thank you for signing up. Please click the button below to activate your account.
      </p>
      
      <a href="${activationLink}" 
         style="
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            color: #000;
            background-color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
         ">
        Activate Account
      </a>

      <p style="margin-top: 30px; font-size: 14px; color: #ccc;">
        ⚠️ This link will expire in 24 hours.
      </p>
    </div>
  `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Activation email sent to:", user.email);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

const sendResetPasswordEmail = async (user) => {
  try {
    // Generate a short-lived reset token (1 hour)
    const resetToken = jwtService.generateToken(
      { id: user._id },
      process.env.JWT_SECRET,
      "1h"
    );

    const resetLink = `${CORS_URL.CLIENT_URL}${RESET_PASSWORD_PATH}/${user._id}/${resetToken}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP transporter verified successfully.");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request - Todo App",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #333;">Password Reset</h2>
        <p style="font-size: 15px;">Hi ${user.email},</p>
        <p style="font-size: 15px;">We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 12px 24px; margin: 20px 0; font-size: 16px; font-weight: bold; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p style="font-size: 14px; color: #666;">⚠️ This link will expire in 1 hour.</p>
        <p style="font-size: 14px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reset email sent to:", user.email);

    return true;
  } catch (error) {
    console.error("Reset password email failed:", error);
    return false;
  }
};

module.exports = { sendActivationEmail, sendResetPasswordEmail };
