const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sinNumber: {
    type: Number,
    required: true,
  },
});

//this creates username and password fields for us
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
