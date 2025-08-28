const express = require("express");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const {
  sendActivationEmail,
  sendResetPasswordEmail,
} = require("../services/email.service");

const { createResponse } = require("../helpers/response.helper");

const {
  STATUS,
  MESSAGES,
  USER_MESSAGES,
  USER_STATUS,
} = require("../constants/constant");

const userContoller = {
  /**
   * @route POST  - /api/v1/public/auth/register
   * @group auth
   * @desc created user
   */
  signUp: async (req, res, next) => {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return createResponse(
          res,
          false,
          STATUS.BAD_REQUEST,
          MESSAGES.FILEDS_REQUIRED
        );
      }

      const userfind = await UserModel.findOne({ email });
      if (userfind) {
        return createResponse(
          res,
          false,
          STATUS.CONFLICT,
          USER_MESSAGES.EMAIL_EXISTS
        );
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        password: hashPassword,
        role,
        status: USER_STATUS.Inactive,
      };

      const createUser = await UserModel.create(newUser);

      const emailSent = await sendActivationEmail(createUser);
      if (!emailSent) {
        return createResponse(
          res,
          false,
          STATUS.INTERNAL_ERROR,
          USER_MESSAGES.ACTIVATION_EMAIL_FAIL
        );
      }

      return createResponse(
        res,
        true,
        STATUS.CREATED,
        USER_MESSAGES.REGISTER_SUCCESS,
        { email: createUser.email }
      );
    } catch (error) {
      next(error);
    }
  },
  /**
   * @route POST  - /api/v1/public/auth/login
   * @group auth
   * @desc login user
   */
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user || !user.password) {
        return createResponse(
          res,
          false,
          STATUS.BAD_REQUEST,
          USER_MESSAGES.INVALID_CREDENTIALS
        );
      }
      if (user.status !== USER_STATUS.ACTIVE) {
        return createResponse(
          res,
          false,
          STATUS.FORBIDDEN,
          USER_MESSAGES.ACCOUNT_NOT_ACTIVE
        );
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return createResponse(
          res,
          false,
          STATUS.BAD_REQUEST,
          USER_MESSAGES.INVALID_CREDENTIALS
        );
      }
      const usertoken = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
      const token = jwtService.generateToken(
        usertoken,
        process.env.JWT_EXPIRES_IN
      );

      res.cookie("Token", token, { signed: true });

      return createResponse(
        res,
        true,
        STATUS.SUCCESS,
        USER_MESSAGES.LOGIN_SUCCESS,
        { email }
      );
    } catch (error) {
      next(error);
    }
  },
  /**
   * @route GET  - /api/v1/public/auth/activate-account
   * @group auth
   * @desc activate user account
   */
  ActiveAccount: async (req, res) => {
    const { token } = req.query;

    try {
      if (!token) {
        return createResponse(
          res,
          false,
          STATUS.UNAUTHORIZED,
          USER_MESSAGES.INVALID_CREDENTIALS
        );
      }
      const decode = jwtService.verifyToken(token);
      const userId = decode.id;
      // Activate the user
      const user = await UserModel.findById(userId);
      if (!user)
        return createResponse(
          res,
          false,
          STATUS.NOT_FOUND,
          USER_MESSAGES.USER_NOT_FOUND
        );

      if (user.status === USER_STATUS.ACTIVE) {
        return createResponse(
          res,
          true,
          STATUS.SUCCESS,
          USER_MESSAGES.ACCOUNT_ALREADY_ACTIVE
        );
      }

      user.status = USER_STATUS.ACTIVE;
      await user.save();
      return createResponse(
        res,
        true,
        STATUS.SUCCESS,
        USER_MESSAGES.ACCOUNT_ACTIVATED
      );
    } catch (error) {
      next(error);
    }
  },
  /**
   * @route GET  - /api/v1/public/auth/google/callback
   * @group auth
   * @desc login or register user with Google
   */
  GoogleLogin: async (req, res) => {
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
    return createResponse(
      res,
      true,
      STATUS.SUCCESS,
      USER_MESSAGES.LOGIN_SUCCESS,
      { token, user: newuser }
    );
  },
  /**
   * @route POST  - /api/v1/public/auth/forgot-password
   * @group auth
   * @desc send reset password email
   */ forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return createResponse(
          res,
          false,
          STATUS.BAD_REQUEST,
          MESSAGES.FILEDS_REQUIRED
        );
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        //don't show true exits or not for security purpose
        return createResponse(
          res,
          true,
          STATUS.SUCCESS,
          USER_MESSAGES.RESET_EMAIL_SENT
        );
      }

      const emailSent = await sendResetPasswordEmail(user);
      if (!emailSent) {
        return createResponse(
          res,
          false,
          STATUS.INTERNAL_ERROR,
          USER_MESSAGES.RESET_EMAIL_FAIL
        );
      }
      return createResponse(
        res,
        true,
        STATUS.SUCCESS,
        USER_MESSAGES.RESET_EMAIL_SENT
      );
    } catch (error) {
      next(error);
    }
  },
  /**
   * @route PATCH  - /api/v1/public/auth/reset-password/:id/:token
   * @group auth
   * @desc reset user password
   */
  resetPassword: async (req, res) => {
    try {
      const { id, token } = req.params;
      const { newPassword } = req.body;

      if (!id || !token || !newPassword) {
        return createResponse(
          res,
          false,
          STATUS.BAD_REQUEST,
          MESSAGES.FILEDS_REQUIRED
        );
      }

      // Verify token
      const decoded = jwtService.verifyToken(token);
      if (!decoded || decoded.id !== id) {
        return createResponse(
          res,
          false,
          STATUS.BAD_REQUEST,
          USER_MESSAGES.TOKEN_INVALID
        );
      }

      // Find user
      const user = await UserModel.findById(id);
      if (!user) {
        return createResponse(
          res,
          false,
          STATUS.NOT_FOUND,
          USER_MESSAGES.USER_NOT_FOUND
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return createResponse(
        res,
        true,
        STATUS.SUCCESS,
        USER_MESSAGES.PASSWORD_RESET_SUCCESS,
        { id: user._id, email: user.email }
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userContoller;
