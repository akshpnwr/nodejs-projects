const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
});

module.exports = mongoose.model('Product', productSchema);