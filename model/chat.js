const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

const Chat = mongoose.model("Chat", userSchema);
module.exports = Chat;
