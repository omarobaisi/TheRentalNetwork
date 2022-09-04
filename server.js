const express = require("express");
const path = require("path");
const productContoller = require("./server/Controller/products-controller")
const userController = require("./server/Controller/user-controller")
const reviewContoller = require("./server/Controller/review-controller")
const recordController = require("./server/Controller/record-controller")
const methodOverride = require("method-override")
const LocalStrategy = require("passport-local");                 
const passport = require("passport");                            
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(methodOverride("_method"));

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

const User = require("./server/Model/user");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

app.use("/product", productContoller);
app.use("/user", userController);
app.use("/review", reviewContoller);
app.use("/record", recordController);

const PORT = 4000;
app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});

