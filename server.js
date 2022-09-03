const express = require("express");
const path = require("path");
const userApi = require("./server/routes/userApi")
const postApi = require("./server/routes/postApi")
const passportLocalMongoose = require("passport-local-mongoose");   // Authentication
const LocalStrategy = require("passport-local");                    // Authentication
const passport = require("passport");                               // Authentication
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const mongoose = require('mongoose')
const url = "mongodb://localhost/rent";
mongoose.connect(url)
.then(() => {
  console.log('Mongo Connection Open');
})
.catch(err => {
  console.log('Mongo Connection Error');
  console.log(err);
})

app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false
}))

//! Authentication

const User = require("./server/model/user")

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.locals.currentUser = req.user;
  next()
})

app.use("/post", postApi);
app.use("/user", userApi);

const PORT = 4000;
app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});
