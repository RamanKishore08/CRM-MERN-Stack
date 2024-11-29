const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    netPrice: { type: Number, required: true }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
