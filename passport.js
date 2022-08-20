const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "899801191231-8edm56l97qcp1alme3vscn5idunt2vr0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "1106176823332413";
const FACEBOOK_APP_SECRET = "09c3e05a3e64733c8920a29cde8c66b3";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {

      done(null, profile);
      console.log(profile)
    }
  )
);



passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile.displayName);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
