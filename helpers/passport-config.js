const { Strategy } = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const LocalStrategy = Strategy;

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (user == null)
        return done(null, false, { message: "No user with that email" });
      const userPassword = user.hashedPassword;
      if (!(userPassword || bcrypt.compare(password, userPassword))) {
        return done(null, false, { message: "password incorrect" });
      } else {
        return done(null, user);
      }
    } catch (e) {
      return done(e);
    }
  }
);

module.exports = localStrategy;
