import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav ,NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ViewExpense() {
    const buttonStyle = {
      borderRadius: '50px',
      padding: '20px 40px',
    };
  
    const buttonContainerStyle = {
      textAlign: 'center',
    };
  
    const buttonContainerMargin = {
      marginTop: '20px',
    };
  
    const boldText = {
      fontWeight: 'bold',
      fontSize: '18px',
    };
return(
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
    <Container>
        <div className="text-center mt-4">
          <h1>View Expense</h1>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/CurrentdateExpense'>
              <Button variant="primary" style={buttonStyle}>
                Today Expense
              </Button>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5" style={buttonContainerMargin}>
          <div style={buttonContainerStyle}>
            <Link to='/SpecificDateExpense'>
              <Button variant="primary" style={buttonStyle}>
                Specidic Date Expense
              </Button>
            </Link>
          </div>
        </div>

       
        {/* You can add more content here */}
      </Container>
      </div>
);
}

export default ViewExpense;
