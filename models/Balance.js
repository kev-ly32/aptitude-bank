const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  balance: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Balance", BalanceSchema);
