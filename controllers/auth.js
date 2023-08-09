const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("../helpers/passport-config.js");

passport.use(localStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(async (user, done) => done(null, user));

exports.postPassportLocalLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
});

exports.getRegisterPage = (req, res) => {
  res.render("auth/register");
};

exports.getLoginPage = (req, res) => {
  res.render("auth/login");
};

exports.isLoggedIn = (req, res, next) =>
  req.isAuthenticated() ? next() : res.redirect("/login");

exports.isNotLoggedIn = (req, res, next) =>
  req.isAuthenticated() ? res.redirect("/") : next();

exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) res.redirect("/login");
    else res.redirect("/");
  });
};

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      hashedPassword
    });
    await newUser.save();
    res.redirect("/login");
  } catch (e) {
    console.log(e.message);
    res.redirect("/register");
  }
};
