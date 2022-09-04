const Review = require('../Model/review')
const User = require("../Model/user")

module.exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
        res.send(reviews)
    } catch(e) {
        res.status(404).json({ message: "Coudn't find reviews", error: e })
    }
}

module.exports.getReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId).populate("reviewer").populate("reviewed")
        res.send(review)
    } catch(e) {
        res.status(404).json({ message: "Coudn't find review", error: e })
    }
}

module.exports.getUserReviews = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Review.findById(userId).populate('reviews');
        res.send(user)
    } catch(e) {
        res.status(404).json({ message: "Coudn't find review", error: e })
    }
}

module.exports.newReview = async (req, res) => {
    try {
        const { userId } = req.params;
        if(req.user._id != userId) {
            const foundUser = await User.findById(userId)
            const review = req.body
            let newReview = new Review(review)
            foundUser.reviews.push(newReview)
            newReview.reviewed = foundUser
            newReview.reviewer = req.user
            await foundUser.save();
            newReview = await newReview.save()
            res.send(newReview)
        } else {
            res.status(401).json({ message: "You can't review yourself", error: e })
        }
    } catch(e) {
        res.status(404).send(e)
    }
}

module.exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = req.body
        const updatedreview = await Review.findByIdAndUpdate(id, review, { new: true, runValidators: true } )
        res.send(updatedreview);
    } catch(e) {
        res.status(404).json({ message: "Coudn't update the review", error: e })
    }
}

module.exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id).populate("reviewed")
        const reviewed = review.reviewed
        const userReviewIndex = reviewed.reviews.indexOf(id)
        reviewed.reviews.splice(userReviewIndex, 1);
        await reviewed.save();
        const deletedreview = await Review.findByIdAndDelete(id, { new: true });
        res.send(deletedreview);
    } catch(e) {
        res.status(404).json({ message: "Coudn't delete the review", error: e })
    }
}