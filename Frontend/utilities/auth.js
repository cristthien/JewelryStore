const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const axios = require("axios");

// Google OAuth 2.0 credentials
const GOOGLE_CLIENT_ID =
  "767939709125-que8id2mfmepcib3j5kump2gcj2947ah.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
// Passport session setup
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the GoogleStrategy within Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (token, tokenSecret, profile, done) {
      // Extract the user's name and email from the profile
      const { displayName, emails } = profile;
      const email = emails[0].value;
      // Use Axios to make a POST request to the server
      try {
        const response = await axios.post(
          "http://localhost:3000/customer/auth/google",
          {
            name: displayName,
            email: email,
          }
        );

        // Log the response from your server
        return done(null, response.data);
      } catch (error) {
        // Log any errors
        console.error("Error posting to server:", error);

        // Call done with the error
        return done(error, null);
      }
    }
  )
);
