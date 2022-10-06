const Review = require('../model/review')
const User = require("../model/user")

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
        const userReviews = []
        const { userId } = req.params;  
        const user = await User.findById(userId).populate('reviews')
        const reviews = user.reviews;
        const length = reviews.length
        let count = 0
        reviews.forEach( review => {
            Review.findById(review._id).populate("reviewer")
            .then(res => userReviews.push(res))
            .then(() => {
                count++;
                if(count === length) {
                    res.send(userReviews)
                }
            })
            .catch(e => console.log(e))
        })
    } catch(e) {
        res.status(404).json({ message: "Coudn't find review", error: e })
    }
}

module.exports.userAverageReviews = async (req, res) => {
    let averageReviews = 0
    const { userId } = req.params;
    const user = await User.findById(userId).populate('reviews');
    const userReviews = user.reviews
    if(userReviews.length !== 0) {
        let count = userReviews.length;
        userReviews.forEach(review => {
            averageReviews += review.rate
        })
        averageReviews = averageReviews / count
        res.send(averageReviews.toString());
    } else {
        res.send('0')
    }
}

module.exports.newReview = async (req, res) => {
    const { userId } = req.params;
    const review = req.body;
    const foundUser = await User.findById(userId)
    let newReview = new Review(review)
    foundUser.reviews.push(newReview)
    newReview.reviewed = foundUser
    newReview.reviewer = req.user
    await foundUser.save();
    newReview = await newReview.save()
    res.send(newReview)
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