const express = require("express"),
  app = express(),
  dotenv = require("dotenv"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  session = require("express-session"),
  bcrypt = require("bcrypt"),
  path = require("path"),
  connectDB = require("./config/db"),
  port = process.env.PORT || 5000;

const User = require("./models/User");

//load config
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Initialize express parser (body parser) to parse our requests to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configure express-session
app.use(
  session({
    secret: process.env.SECRET || "the rabbit is in the hat",
    resave: false,
    saveUninitialized: false,
  })
);

//Configure passport
app.use(passport.initialize());
app.use(passport.session());

//Configure passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//register route
app.post("/register", (req, res) => {
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

//login route
app.post("/login", (req, res, next) => {
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

//logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.json({ msg: "success" });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
