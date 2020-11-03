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

const User = require("./models/User"),
  authRoutes = require("./routes/auth");

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

//import routes
app.use(authRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
