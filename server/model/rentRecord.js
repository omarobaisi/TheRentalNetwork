const mongoose = require('mongoose');
const { Schema } = mongoose;

const rentalSchema = new Schema({
    date: {type: Date, required: true, default: Date.now},
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    renter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    renterInfo: {
        phone: {type: String, required: true},
        city: {type: String, required: true},
        address: {type: String, required: true},
    },
    payment: {
        fullName: {type: String, required: true},
        cardNumber: {type: Number, required: true},
        expireDate: {type: String, required: true},
        CVV: {type: Number, required: true},
    }
})

module.exports = mongoose.model('Rental', rentalSchema);