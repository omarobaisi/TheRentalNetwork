const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false},
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    payment: {
        creditCard: {
            type: Schema.Types.ObjectId,
            ref: 'CreditCard'
        },
        paypal: String
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField : "email"});

module.exports = mongoose.model('User', userSchema);