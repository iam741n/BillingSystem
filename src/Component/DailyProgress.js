import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, NavDropdown, Navbar, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_IP } from './Url';

function DailyProgress() {
  const [salesToday, setSalesToday] = useState(0);
  const [expenseToday, setExpenseToday] = useState(0);
  const [profitToday, setProfitToday] = useState(0);
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchDailyProgress();
  }, []);

  const fetchDailyProgress = async () => {
    try {
      const response = await axios.get(`http://${API_IP}/StationaryShop/api/DailyProgress/GetProgress`); // Assuming the API endpoint is exposed at /api/dailyprogress
      const { SalesToday, ExpenseToday, ProfitToday, Date } = response.data;
      setSalesToday(SalesToday);
      setExpenseToday(ExpenseToday);
      setProfitToday(ProfitToday);
      setDate(Date);
    } catch (error) {
      console.error('Error fetching daily progress:', error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${require('../assets/dash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
    <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Daily Progress</h1>
      <div className="card p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="row mb-3">
          <label htmlFor="salesToday" className="col-sm-6 col-form-label">Sales of today</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="salesToday" value={salesToday} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="expenseToday" className="col-sm-6 col-form-label">Expense of today</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="expenseToday" value={expenseToday} readOnly />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="profitToday" className="col-sm-6 col-form-label">Profit of today</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="profitToday" value={profitToday} readOnly />
          </div>
        </div>
        <div className="row">
          <label htmlFor="date" className="col-sm-6 col-form-label">Date</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="date" value={date} readOnly />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DailyProgress;