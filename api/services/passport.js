const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const user_model = require("../models/user_model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await user_model.findOne({ googleId: profile.id });

        if (!user) {
          const existingEmailUser = await user_model.findOne({ email: profile.emails[0].value });
          if (existingEmailUser) {
            existingEmailUser.googleId = profile.id;
            await existingEmailUser.save();
            user = existingEmailUser;
          } else {
            user = await user_model.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              role: "student",
            });
          }
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
