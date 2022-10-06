if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

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
const cors = require('cors');

const app = express();

const domainsFromEnv = process.env.CORS_DOMAINS || ""
const whitelist = domainsFromEnv.split(",").map(item => item.trim())
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, 'build')));
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI || "mongodb://localhost/rent";
mongoose
  .connect(url)
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
    console.log(err);
  });

app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: false,
  })
);

const User = require("./server/Model/user");

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/product", productContoller);
app.use("/user", userController);
app.use("/review", reviewContoller);
app.use("/record", recordController);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 4000;
app.listen(process.env.PORT || PORT, function () {
  console.log(`Server running on ${PORT}`);
});