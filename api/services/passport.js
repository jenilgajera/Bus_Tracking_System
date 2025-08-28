// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const UserModel = require("../models/user.model"); // your model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // MUST match Google console + your routes:
      callbackURL: `${process.env.SERVER_URL}/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // try existing by googleId
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value;

          // link to existing email account if found
          if (email) {
            const existing = await UserModel.findOne({ email });
            if (existing) {
              existing.googleId = profile.id;
              if (!existing.name) existing.name = profile.displayName;
              await existing.save();
              user = existing;
            } else {
              // create new user
              user = await UserModel.create({
                googleId: profile.id,
                name: profile.displayName,
                email,
                role: "student",
                status: "active",
                password: "", 
              });
            }
          } else {
    
            user = await UserModel.create({
              googleId: profile.id,
              name: profile.displayName,
              role: "student",
              status: "active",
              password: "",
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// (no sessions used, so serialize/deserialize not strictly needed)
module.exports = passport;
