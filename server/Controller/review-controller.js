const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../Middleware/authorization")
const { getReviews, getReview, getUserReviews, userAverageReviews, newReview, updateReview, deleteReview } = require("../Services/review-services")

router.get("/", getReviews)

router.get("/user/:userId", getUserReviews)

router.get("/:reviewId", getReview)

router.get("/average/:userId", userAverageReviews);

router.post("/:userId", isLoggedIn, newReview)

router.put("/:id", isLoggedIn, updateReview)

router.delete("/:id", isLoggedIn, deleteReview)

module.exports = router;