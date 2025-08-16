const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
// const { authMiddleware } = require("../middlewares/auth.middleware");
const passport = require("passport");

router.post("/register", userController.signUp);
router.post("/login", userController.signIn);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false })
);

router.get("/activate-account", userController.ActiveAccount);
module.exports = router;
