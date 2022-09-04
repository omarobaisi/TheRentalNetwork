module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ success: false, message: "You need to login" })
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ success: false, message: "You need to login" })
    } else if (!req.user.isAdmin) {
        res.status(401).json({ success: false, message: "You're not authorized to do this" })
    } else {
        next();
    }
}