const express = require("express");
const authController = require("../controllers/auth.js");

const User = require("../models/user.js");

const router = express.Router();

// Passport Auth

router.post("/login", authController.postPassportLocalLogin);

// Page Rendering

router.get(
  "/register",
  authController.isNotLoggedIn,
  authController.getRegisterPage
);

router.get("/login", authController.isNotLoggedIn, authController.getLoginPage);

// Etc Routes

router.get("/logout", authController.isLoggedIn, authController.logOut);

router.post("/register", authController.registerUser);

router.get("/all", async (req, res) => res.send(await User.find()));

module.exports = router;
