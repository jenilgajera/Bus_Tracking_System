require("dotenv").config();
const nodemailer = require("nodemailer");
const jwtService = require("./jwt.service");

const sendActivationEmail = async (user) => {
  try {
    // Generate the activation token
    const activationToken = jwtService.generateToken(
      { id: user._id },
      process.env.JWT_SECRET,
      "1d"
    );

    const activationLink = `http://localhost:3010/v1/auth/activate-account?token=${activationToken}`;

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

module.exports = { sendActivationEmail };
