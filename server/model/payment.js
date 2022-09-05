const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    fullName: {type: String, required: true},
    cardNumber: {type: Number, required: true},
    expireDate: {type: String, required: true},
    CVV: {type: Number, required: true},
})

module.exports = mongoose.model('Payment', paymentSchema);