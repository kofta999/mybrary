const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    minLength: 8
  }
});

module.exports = mongoose.model("User", userSchema);
