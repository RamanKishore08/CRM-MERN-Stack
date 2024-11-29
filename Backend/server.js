const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Product = require('./models/Product'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        console.log('Product added:', savedProduct);
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Product updated:', updatedProduct);
        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Products retrieved:', products);
        res.json(products);
    } catch (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({ message: err.message });
    }
});

// Retrieve a specific product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error('Error retrieving product:', err);
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
