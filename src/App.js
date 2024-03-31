import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { API_URL } from './config';
// import { ApiContext } from './Context/ApiContext';
import Login from './Component/Login';

import Dashboard from './Component/Dashboard';
import UpdatePassword from './Component/UpdatePassword';
import Expense from './Component/Expense';
import AddItems from './Component/AddItems';
import Stocks from './Component/Stocks';

function App() {
  return (
  //  <div>
  //   <Login/>
  //  </div>
   <Router>
 <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/Dashboard" element={<Dashboard />} />
   <Route path="/UpdatePassword" element={<UpdatePassword />} />
   <Route path="/Expense" element={<Expense />} />
   <Route path="/AddItems" element={<AddItems />} />
   <Route path="/Stocks" element={<Stocks />} />
   
   </Routes>
   </Router>
  );
}

export default App;
