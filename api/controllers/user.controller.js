const express = require("express");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const user_model = require("../models/user_model");
const {
  sendActivationEmail,
  sendResetPasswordEmail,
} = require("../services/email.service");

const userContoller = {
  signUp: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const userfind = await user_model.findOne({ email });
      if (userfind) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        password: hashPassword,
        role,
        status: "inactive",
      };

      const createUser = await user_model.create(newUser);

      const emailSent = await sendActivationEmail(createUser);
      if (!emailSent) {
        return res.status(500).json({ message: "Activation email not sent" });
      }
      return res.status(201).json({
        message:
          "User created successfully, please check your email to activate your account.",
        user: createUser,
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res
        .status(500)
        .json({ message: "User not created", error: error.message });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await user_model.findOne({ email });
      if (!user || !user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if (user.status !== "active") {
        return res.status(403).json({
          message: "Please activate your account via email before logging in.",
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwtService.generateToken(
        {
          email: user.email,
          id: user._id,
          role: user.role,
        },
        process.env.JWT_EXPIRES_IN
      );

      res.cookie("Token", token, { signed: true });
      res.status(200).json({
        message: "User logged in successfully",
        user: { email },
      });
    } catch (error) {
      console.error("SignIn Error:", error);
      res.status(500).json({ message: error.message });
    }
  },
  ActiveAccount: async (req, res) => {
    const { token } = req.query;

    try {
      if (!token) {
        res
          .status(204)
          .json({ message: "token is not valid please register Again" });
      }
      const decode = jwtService.verifyToken(token);
      const userId = decode.id;
      // Activate the user
      const user = await user_model.findById(userId);
      if (!user) return res.status(404).send("User not found.");

      if (user.status === "active") {
        return res.send("Account already activated.");
      }

      user.status = "active";
      await user.save();
      return res.send("Account successfully activated! You can now log in.");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GoogleLogin: async (req, res) => {
    console.log("🚀 Google Login Success:", req.user); // Debug

    const newuser = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      name: req.user.name,
    };
    const token = jwtService.generateToken(newuser);
    res.cookie("token", token, {
      httpOnly: true,
      signed: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect("http://localhost:5173/");
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await user_model.findOne({ email });
      if (!user) {
        //don't show true exits or not for security purpose
        return res.json({
          message: "If the email exists, a reset link has been sent.",
        });
      }

      const emailSent = await sendResetPasswordEmail(user);
      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send reset email" });
      }

      return res.json({
        message: "If the email exists, a reset link has been sent.",
      });
    } catch (error) {
      console.error("ForgotPassword Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { id, token } = req.params;
      const { newPassword } = req.body;

      if (!id || !token || !newPassword) {
        return res
          .status(400)
          .json({ message: "Id, token, and new password are required" });
      }

      // Verify token
      const decoded = jwtService.verifyToken(token);
      if (!decoded || decoded.id !== id) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Find user
      const user = await user_model.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return res
        .status(200)
        .json({ message: "Password reset successful", user });
    } catch (error) {
      console.error("ResetPassword Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userContoller;
