const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  userRecord,
} = require("../Services/user-services");

router.get("/", getUsers);

router.post("/register", register);

router.post("/login", passport.authenticate("local"), login);

router.post("/logout", logout);

router.get("/current", getCurrentUser);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/history/:id", userRecord);

module.exports = router;
