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
})

module.exports = mongoose.model('Rental', rentalSchema);