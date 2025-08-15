const mongoose = require("mongoose");

const userEmailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserEmail = new mongoose.model("UserEmail", userEmailSchema);
module.exports = UserEmail;
