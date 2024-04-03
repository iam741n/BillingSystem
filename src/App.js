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
import ViewExpense from './Component/ViewExpense';
import CurrentdateExpense from './Component/CurrentdateExpense';
import SpecificDateExpense from './Component/SpecificDateExpense';
import DailyProgress from './Component/DailyProgress';
import MultipledaysProgress from './Component/MultipledaysProgress';

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
   <Route path="/ViewExpense" element={<ViewExpense />} />
   <Route path="/CurrentdateExpense" element={<CurrentdateExpense />} />
   <Route path="/SpecificDateExpense" element={<SpecificDateExpense />} />
   <Route path="/DailyProgress" element={<DailyProgress />} />
   <Route path="/MultipledaysProgress" element={<MultipledaysProgress />} />
   </Routes>
   </Router>
  );
}

export default App;
