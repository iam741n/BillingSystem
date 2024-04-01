import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button,Nav, NavDropdown,Navbar, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_IP } from './Url';

const CurrentdateExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://${API_IP}/StationaryShop/api/Expense/GetExpenses`); // Adjust the API endpoint URL accordingly
        setExpenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

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
              <span className="nav-link">Daily Progress</span>
              <Link to='/' className="nav-link">Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <div className="container mt-4">
        


<h2 className="text-center mt-4 mb-4">Expenses for Today</h2>
      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses happened today.</p>
      ) : (
        <div className="row">
          {expenses.map((expense) => (
            <div key={expense.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Expense {expense.id}</h5>
                  <h6 className="card-text">Amount: {expense.amount}</h6>
                  <h6 className="card-text">Category: {expense.name}</h6>
                  <h6 className="card-text">Date: {new Date(expense.Date).toLocaleDateString()}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default CurrentdateExpense;
