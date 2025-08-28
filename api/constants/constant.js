require("dotenv").config();
const ROUTE_PREFIX = "/api/v1";
const ROUTE_TYPE = {
  PUBLIC: "/public",
  PRIVATE: "/private",
};
const AUTH_PREFIX = "/auth";
const ROUTE_SERVICE_NAME = {
  STUDENT: "stundent",
  ADMIN: "admin",
  PARENT: "parent",
  DRIVER: "driver",
};

// Standard HTTP Status Codes
const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};
// comman messages
const MESSAGES = {
  SUCCESS: "Request successful",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  BAD_REQUEST: "Invalid request data",
  UNAUTHORIZED: "Authentication required",
  FORBIDDEN: "You do not have permission",
  NOT_FOUND: "Resource not found",
  CONFLICT: "Resource already exists",
  SERVER_ERROR: "Internal Server Error",
  FILEDS_REQUIRED: "All fileds are requiered",
};

const USER_STATUS = {
  ACTIVE: "Active",
  Inactive: "Inactive",
};
// User-Specific Messages
const USER_MESSAGES = {
  REGISTER_SUCCESS:
    "User created successfully, please check your email to activate your account.",
  REGISTER_FAIL: "User not created",
  LOGIN_SUCCESS: "User logged in successfully",
  LOGOUT_SUCCESS: "Logout successful",
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  EMAIL_EXISTS: "User already exists",
  ACCOUNT_NOT_ACTIVE:
    "Please activate your account via email before logging in.",
  ACCOUNT_ALREADY_ACTIVE: "Account already activated.",
  ACCOUNT_ACTIVATED: "Account successfully activated! You can now log in.",
  TOKEN_INVALID: "Token is not valid, please register again",
  ACTIVATION_EMAIL_FAIL: "Activation email not sent",
  RESET_EMAIL_SENT: "If the email exists, a reset link has been sent.",
  RESET_EMAIL_FAIL: "Failed to send reset email",
  PASSWORD_RESET_SUCCESS: "Password reset successful",
};

const CORS_URL = {
  CLIENT_URL: process.env.CLIENT_URL,
  SERVER_URL: process.env.SERVER_URL,
};


const ACTIVATION_PATH = `${ROUTE_PREFIX}${ROUTE_TYPE.PUBLIC}${AUTH_PREFIX}/activate-account`;
const RESET_PASSWORD_PATH = `${ROUTE_PREFIX}${ROUTE_TYPE.PUBLIC}${AUTH_PREFIX}/reset-password`;

module.exports = {
  CORS_URL,
  AUTH_PREFIX,
  ROUTE_PREFIX,
  ROUTE_TYPE,
  ROUTE_SERVICE_NAME,
  STATUS,
  MESSAGES,
  USER_STATUS,
  USER_MESSAGES,
  ACTIVATION_PATH,
  RESET_PASSWORD_PATH,
};
