const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    category: {type: String, required: true},
    state: {type: String, required: true, default: 'posted', enum: ['posted','rented','delivered','returned']},
    images: [],
    description: String,
    date: {type: Date, required: true, default: Date.now},
    owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    }
})

module.exports = mongoose.model('Product', productSchema);