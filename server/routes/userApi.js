const express = require("express");
const router = express.Router();
const User = require("../model/user")
const passport = require('passport');

router.post("/register", async (req, res, next) => {
    try {
        const { password } = req.body;
        const user = new User(req.body.user);
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) console.log(err);
            res.send(registeredUser)
        })
    } catch(e) {
        console.log(e)
    }
})

router.get("/login", passport.authenticate('local'), async (req, res) => {
    res.send(res.user)
})

router.get("/logout", async (req, res) => {
    
})

router.get("/profile/:id", async (req, res) => {
    
})

router.get("/review", async (req, res) => {
    
})

module.exports = router;