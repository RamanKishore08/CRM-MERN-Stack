import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './FormPage.css';

function FormPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        id: null,
        productName: '',
        time: '',
        price: '',
        quantity: '',
        netPrice: '',
        profit: 0,
        category: '',
        totalSales: 0,
        totalProfit: 0,
    });

    const [isEditing, setIsEditing] = useState(false);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    useEffect(() => {
        if (location.state && location.state.item) {
            const { item } = location.state;
            setFormData({ ...item });
            setIsEditing(true);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                time: getCurrentTime(),
                id: Date.now()
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const updatedData = {
                ...prevData,
                [name]: value
            };

            if (name === 'price' || name === 'netPrice' || name === 'quantity') {
                updatedData.profit = updatedData.price - updatedData.netPrice;
                updatedData.totalSales = updatedData.quantity * updatedData.price;
                updatedData.totalProfit = updatedData.quantity * updatedData.netPrice;
            }

            return updatedData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await updateData(formData);
        } else {
            await addData(formData);
        }

        navigate('/table-view');
    };

    const addData = async (formData) => {
        try {
            const response = await axios.post('https://crm-backend-fywc.onrender.com/api/products', formData);
            if (response.status === 201) {
                const newProduct = response.data;
                console.log('Product added:', newProduct);
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateData = async (formData) => {
        try {
            const response = await axios.put(`https://crm-backend-fywc.onrender.com/api/products/${formData.id}`, formData);
            if (response.status === 200) {
                const updatedProduct = response.data;
                console.log('Product updated:', updatedProduct);
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{isEditing ? "Edit Product Data" : "Add Product Data"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    name="productName"
                    placeholder="Product Name"
                    onChange={handleChange}
                    value={formData.productName}
                    required
                />
                <input
                    className="form-input"
                    name="time"
                    value={formData.time}
                    placeholder="Time"
                    disabled
                />
                <input
                    className="form-input"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    value={formData.price}
                    required
                />
                <input
                    className="form-input"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleChange}
                    value={formData.quantity}
                    required
                />
                <input
                    className="form-input"
                    name="netPrice"
                    placeholder="Net Price"
                    onChange={handleChange}
                    value={formData.netPrice}
                    required
                />
                <input
                    className="form-input"
                    name="profit"
                    value={formData.profit}
                    placeholder="Profit"
                    disabled
                />
                <input
                    className="form-input"
                    name="totalSales"
                    value={formData.totalSales}
                    placeholder="Total Sales"
                    disabled
                />
                <input
                    className="form-input"
                    name="totalProfit"
                    value={formData.totalProfit}
                    placeholder="Total Profit"
                    disabled
                />
                <input
                    className="form-input"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    value={formData.category}
                    required
                />
                <div>
                    <button type="submit" className="form-button">
                        {isEditing ? "Update" : "Submit"}
                    </button>
                    <button
                        type="button"
                        className="form-button secondary"
                        onClick={() => navigate('/visualization')}
                    >
                        See Visualization
                    </button>
                    <button
                        type="button"
                        className="form-button third"
                        onClick={() => navigate('/table-view')}
                    >
                        View as Table
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormPage;
