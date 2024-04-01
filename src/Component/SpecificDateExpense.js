import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_IP } from './Url';

const SpecificDateExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchExpenses();
  }, [selectedDate]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://${API_IP}/StationaryShop/api/Expense/GetExpenseByDate?date=${selectedDate.toISOString()}`);
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
              <span className="nav-link">Daily Progress</span>
              <Link to='/' className="nav-link">Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h2 className="text-center mt-4 mb-4">Expenses for Selected Date</h2>
        <div className="d-flex justify-content-center mb-4">
          <input
            type="date"
            className="form-control"
            value={selectedDate.toISOString().split('T')[0]} // Set initial value to selectedDate
            onChange={(e) => handleDateChange(new Date(e.target.value))}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p>No expenses happened on {selectedDate.toLocaleDateString()}.</p>
        ) : (
          <div className="row">
            {expenses.map((expense) => (
              <div key={expense.id} className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Expense {expense.id}</Card.Title>
                    <Card.Text>Amount: {expense.amount}</Card.Text>
                    <Card.Text>Category: {expense.name}</Card.Text>
                    <Card.Text>Date: {new Date(expense.Date).toLocaleDateString()}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default SpecificDateExpense;
