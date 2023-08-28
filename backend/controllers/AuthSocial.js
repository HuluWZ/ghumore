const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL:`${process.env.URL4}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can handle the user profile data
      // and save it to your application's database
      // or perform any other necessary actions.
      console.log(" Google  ", { accessToken, refreshToken, profile, done });
      return done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.URL4}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      // Similar to the Google strategy, handle the user profile data
      // and save it to your application's database
      // or perform any other necessary actions.
      console.log(" Facebook ", { accessToken, refreshToken, profile, done });
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize the user object to store in the session
  console.log(" Serialize ", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize the user object from the session
  console.log(" Deserialize ", user);
  done(null, user);
});

module.exports = {passport}