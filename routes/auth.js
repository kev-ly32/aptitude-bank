const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/User");

//REGISTER ROUTE
router.post("/register", (req, res) => {
  //get form input data from the body
  const { email, firstName, lastName, sinNumber, password } = req.body;

  //check if SIN number is registered - needs to be unique
  User.findOne({ sinNumber }, (err, sin) => {
    if (sin) {
      return res.json({ err: true, msg: "SIN number is already registered" });
    }
    //if SIN number is unique, save a new user model
    const user = new User({ username: email, firstName, lastName, sinNumber });
    //register the user
    User.register(user, password, (err, user) => {
      //check if email already exists
      if (err) {
        return res.json({ err: true, msg: "Email is already registered." });
      }
      //login user after registration
      req.login(user, (err) => {
        if (err) {
          return res.json({ err: true, msg: "Error logging in" });
        }
        return res.json(user);
      });
    });
  });
});

//LOGIN ROUTE
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    //internal error
    if (err) {
      return res.json({ err: true });
    }
    //if user cannot be found
    if (!user) {
      return res.json({ err: true, msg: "Invalid email or password" });
    }
    //login user
    req.logIn(user, (err) => {
      if (err) {
        return res.json({ err: true });
      }
      return res.json(user);
    });
  })(req, res, next);
});

//LOGOUT ROUTE
router.get("/logout", (req, res) => {
  req.logout();
  res.json({ msg: "success" });
});

module.exports = router;
