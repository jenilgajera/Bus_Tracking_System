const jwtService = require("../services/jwt.service");
const user_model = require("../models/user_model");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, please login first" });
    }
    const decode = jwtService.verifyToken(token);

    const user = await user_model.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "user unauthorized" });
  }
};


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};