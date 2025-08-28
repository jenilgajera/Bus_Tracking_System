const { STATUS, MESSAGES } = require("../constants/constant");

/**
 * Create a standard API response *
 * @param {Object} res - Express response object
 * @param {Boolean} success - Was the operation successful? *
 * @param {Number} statusCode - HTTP status code *
 * @param {String} message - Message to return *
 * @param {Object} [data] - Any additional data
 *
 */

const createResponse = (res, success, statusCode, message, data) => {
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    payload: data || {},
  });
};

/**
 * Custom error handler middleware (used globally)
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
const customErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS.INTERNAL_ERROR;
  const message = err.message || MESSAGES.INTERNAL_ERROR;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = { createResponse, customErrorHandler };
