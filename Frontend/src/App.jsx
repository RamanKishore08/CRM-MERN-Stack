import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FormPage from './Components/FormPage/FormPage';
import TableView from './Components/TableView/TableView';
import Visualization from './Components/Visualization/Visualization';
import LoginPage from './Components/LoginPage/LoginPage';

function App() {
  const [data, setData] = useState([]);

  const addData = (formData) => {
    setData([...data, formData]);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/form" element={<FormPage addData={addData} />} />
        <Route path="/table-view" element={<TableView data={data} />} />
        <Route path="/visualization" element={<Visualization data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
