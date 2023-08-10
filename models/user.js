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
  },
  admin: {
    type: Boolean,
    default: false
  },
  favoriteBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Book",
    default: [],
  }
});

module.exports = mongoose.model("User", userSchema);
