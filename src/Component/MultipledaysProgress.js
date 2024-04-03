import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, NavDropdown, Navbar, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_IP } from './Url';

function MultipledaysProgress() {
  const [sales, setSales] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [days, setDays] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchProgressForMultipleDays = async () => {
    try {
      const response = await axios.get(`http://${API_IP}/StationaryShop/api/DailyProgress/GetProgressforMultipledays?startDate=${startDate}&endDate=${endDate}`);
      const { Sales, Expense, ProfitToday, Days, Date } = response.data;
      setSales(Sales);
      setExpenses(Expense);
      setProfit(ProfitToday);
      setDays(Days);
    } catch (error) {
      console.error('Error fetching progress for multiple days:', error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProgressForMultipleDays();
  };

  return (
    <div>
          <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Billing System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to='/Dashboard' className="nav-link">Home</Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <Link to='/UpdatePassword' className="dropdown-item">Change Credentials</Link>
                <Link to='/AddItems' className="dropdown-item">Add Items</Link>
                
              </NavDropdown>
              <Link to='/Stocks' className="nav-link">Stock</Link>
              <NavDropdown title="Expense" id="basic-nav-dropdown">
                <Link to='/Expense' className="dropdown-item">Add Expense</Link>
                <Link to='/ViewExpense' className="dropdown-item">View Expense</Link>
                
              </NavDropdown>
              <NavDropdown title="Progress" id="basic-nav-dropdown">
                <Link to='/DailyProgress' className="dropdown-item">Daily Progress</Link>
                <Link to='/MultipledaysProgress' className="dropdown-item">Multiple days Progress</Link>
                
              </NavDropdown>
              <Link to='/' className="nav-link">Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-4">
        <h1 className="text-center">Daily Progress</h1>
        <div className="card p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="startDate" className="col-sm-6 col-form-label">Start Date</label>
              <div className="col-sm-6">
                <input type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="endDate" className="col-sm-6 col-form-label">End Date</label>
              <div className="col-sm-6">
                <input type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} required />
              </div>
            </div>
            <Button type="submit" variant="primary">Submit</Button>
          </form>
          <div className="row mt-4">
            <label htmlFor="sales" className="col-sm-6 col-form-label">Sales</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="sales" value={sales} readOnly />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="expenses" className="col-sm-6 col-form-label">Expenses</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="expenses" value={expenses} readOnly />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="profit" className="col-sm-6 col-form-label">Profit</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="profit" value={profit} readOnly />
            </div>
          </div>
          <div className="row">
            <label htmlFor="days" className="col-sm-6 col-form-label">Days</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="days" value={days} readOnly />
            </div>
          </div>
          <div className="row">
            <label htmlFor="dateRange" className="col-sm-6 col-form-label">Date Range</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="dateRange" value={`${startDate} to ${endDate}`} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultipledaysProgress;
