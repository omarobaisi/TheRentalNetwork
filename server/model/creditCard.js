const mongoose = require('mongoose');
const { Schema } = mongoose;

const creditCardSchema = new Schema({
    fullName: {type: String, required: true},
    cardNumber: {type: Number, required: true},
    expireDate: {type: String, required: true},
    CVV: {type: Number, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('CreditCard', creditCardSchema);