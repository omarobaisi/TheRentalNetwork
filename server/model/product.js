const mongoose = require('mongoose');
const { Schema } = mongoose;
const { cloudinary } = require("../cloudinary");


const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    category: {type: String, required: true},
    state: {type: String, required: true, default: 'posted'},
    images: [
        {
            url: String,
            filename: String
        }
    ],
    description: String,
    date: {type: Date, required: true, default: Date.now},
    owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    }
})

// Delete images from cloudinary after deleting the product
productSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // delete images
        for (let img of doc.images) {
            await cloudinary.uploader.destroy(img.filename);
        }
    }
});

module.exports = mongoose.model('Product', productSchema);