import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Visualization.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function VisualizationPage() {
  const [productData, setProductData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const navigate = useNavigate();

  const colorPalette = [
    'rgba(200, 80, 80, 0.8)', 'rgba(100, 200, 100, 0.8)', 'rgba(255, 140, 0, 0.8)', 'rgba(100, 180, 230, 0.8)', 'rgba(255, 200, 120, 0.8)',
    'rgba(255, 150, 180, 0.8)', 'rgba(255, 230, 80, 0.8)', 'rgba(255, 180, 190, 0.8)', 'rgba(255, 80, 140, 0.8)', 'rgba(255, 130, 100, 0.8)',
    'rgba(180, 80, 180, 0.8)', 'rgba(120, 120, 120, 0.8)', 'rgba(255, 60, 90, 0.8)', 'rgba(0, 200, 200, 0.8)', 'rgba(180, 130, 180, 0.8)',
    'rgba(0, 80, 80, 0.8)', 'rgba(100, 180, 200, 0.8)', 'rgba(255, 50, 70, 0.8)', 'rgba(255, 200, 140, 0.8)', 'rgba(255, 220, 240, 0.8)',
    'rgba(80, 150, 200, 0.8)', 'rgba(0, 200, 80, 0.8)', 'rgba(255, 230, 180, 0.8)', 'rgba(250, 240, 220, 0.8)', 'rgba(180, 60, 200, 0.8)',
    'rgba(60, 180, 180, 0.8)', 'rgba(230, 80, 80, 0.8)', 'rgba(255, 190, 50, 0.8)', 'rgba(255, 210, 240, 0.8)', 'rgba(150, 200, 220, 0.8)',
    'rgba(255, 190, 100, 0.8)', 'rgba(255, 160, 150, 0.8)', 'rgba(0, 160, 160, 0.8)', 'rgba(255, 100, 70, 0.8)', 'rgba(100, 170, 210, 0.8)',
    'rgba(80, 200, 80, 0.8)', 'rgba(200, 100, 80, 0.8)', 'rgba(250, 200, 90, 0.8)', 'rgba(240, 240, 250, 0.8)', 'rgba(180, 100, 180, 0.8)',
    'rgba(255, 170, 150, 0.8)', 'rgba(200, 80, 80, 0.8)', 'rgba(150, 200, 220, 0.8)', 'rgba(255, 60, 90, 0.8)', 'rgba(50, 130, 200, 0.8)'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProductData(response.data);
        const profit = response.data.reduce((acc, item) => acc + item.profit, 0);
        setTotalProfit(profit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const profitByCategoryData = {
    labels: [...new Set(productData.map(item => item.category))],
    datasets: [{
      label: 'Profit by Category',
      data: [...new Set(productData.map(item => item.category))].map(category => {
        return productData.filter(item => item.category === category).reduce((acc, item) => acc + item.profit, 0);
      }),
      backgroundColor: colorPalette,
      borderColor: colorPalette,
      borderWidth: 1,
    }],
  };

  const salesByTimeData = {
    labels: productData.map(item => item.time),
    datasets: [{
      label: 'Sales by Time',
      data: productData.map(item => item.totalSales),
      fill: false,
      backgroundColor: colorPalette.slice(0, productData.length),
      borderColor: colorPalette.slice(0, productData.length),
      tension: 0.1,
    }],
  };

  const profitByProductData = {
    labels: productData.map(item => item.productName),
    datasets: [{
      label: 'Profit by Product',
      data: productData.map(item => item.profit),
      backgroundColor: colorPalette.slice(0, productData.length),
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    }],
  };

  const totalSalesByProductData = {
    labels: productData.map(item => item.productName),
    datasets: [{
      label: 'Total Sales by Product',
      data: productData.map(item => item.totalSales),
      backgroundColor: colorPalette.slice(0, productData.length),
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    }],
  };

  const goToHome = () => {
    navigate('/form');
  };

  return (
    <div className="visualization-container">
      <button className="go-home-button" onClick={goToHome}>
        Go to Home
      </button>
      <h2>Product Data Visualizations</h2>
      <h3>Total Profit: ${totalProfit.toFixed(2)}</h3>
      <div className="chart-container">
        <div className="chart">
          <h3>Profit by Category (Bar Chart)</h3>
          <Bar data={profitByCategoryData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Sales by Time (Line Chart)</h3>
          <Line data={salesByTimeData} options={{ responsive: true }} />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart">
          <h3>Profit by Product (Doughnut Chart)</h3>
          <Doughnut data={profitByProductData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Total Sales by Product (Pie Chart)</h3>
          <Pie data={totalSalesByProductData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default VisualizationPage;
