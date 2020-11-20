const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  id: {
    type: String,
  },
  userID: {
    type: Number,
  },
  balance: {
    type: Number,
    required: true,
  },
  default: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Account", AccountSchema);
