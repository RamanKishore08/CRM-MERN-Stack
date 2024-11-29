const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    netPrice: { type: Number, required: true }
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

// Export the Product model
module.exports = Product;
