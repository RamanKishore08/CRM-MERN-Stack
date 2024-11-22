import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import './TableView.css';

function TableView() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h1>Please connect your API to view results.</h1>
      <h2>Sales Data</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Time</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Net Price</th>
            <th>Profit</th>
            <th>Total Sales</th>
            <th>Total Profit</th>
            <th>Category</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.time}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.netPrice}</td>
              <td>{item.price - item.netPrice}</td> 
              <td>{item.price * item.quantity}</td> {/* Total Sales */}
              <td>{item.netPrice * item.quantity}</td> {/* Total Profit */}
              <td>{item.category}</td> 
              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => navigate('/form', { state: { item } })}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CSVLink data={data} filename={"sales-data.csv"} className="btn btn-custom">
          Download as Excel
        </CSVLink>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/visualization', { state: { data } })}
        >
          View Visualizations
        </button>
        <button
          className="btn btn-home"
          onClick={() => navigate('/form')}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default TableView;
