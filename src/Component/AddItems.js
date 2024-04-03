import React, { useState } from 'react';
import { Container, Row, Col, Button, Nav, NavDropdown,Navbar, Modal, Form ,Alert} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_IP } from './Url';

const AddItems = () => {
  const [itemData, setItemData] = useState({
    itmName: '',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    size: '',
    color: '',
    subject: '',
    class: '',
    marchantName: '',
    credit: '',
    debit: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${API_IP}/StationaryShop/api/Purchasing/insertItem`, itemData);
      if (response.status === 200) {
        setSuccessMessage('Item inserted successfully.');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
      setSuccessMessage('');
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
    
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
        <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Add Items</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="itmName">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Item Name</Form.Label>
                  <Form.Control type="text" name="itmName" value={itemData.itmName} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="purchasePrice">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Purchase Price</Form.Label>
                  <Form.Control type="number" name="purchasePrice" value={itemData.purchasePrice} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="quantity">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Quantity</Form.Label>
                  <Form.Control type="number" name="quantity" value={itemData.quantity} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="size">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Size</Form.Label>
                  <Form.Control type="text" name="size" value={itemData.size} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="subject">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Subject</Form.Label>

                  <Form.Control type="text" name="subject" value={itemData.subject} onChange={handleChange} />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group controlId="sellingPrice">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Selling Price</Form.Label>
                  <Form.Control type="number" name="sellingPrice" value={itemData.sellingPrice} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="color">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Color</Form.Label>
                  <Form.Control type="text" name="color" value={itemData.color} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="class">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Class</Form.Label>
                  <Form.Control type="text" name="class" value={itemData.class} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="marchantName">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Merchant Name</Form.Label>
                  <Form.Control type="text" name="marchantName" value={itemData.marchantName} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="credit">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Credit</Form.Label>
                  <Form.Control type="number" name="credit" value={itemData.credit} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="debit">
                <Form.Label style={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Debit</Form.Label>
                  <Form.Control type="number" name="debit" value={itemData.debit} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-2"  style={{backgroundImage: 'linear-gradient(to right, Orange, Orange)', border: 'none', color: 'white', fontWeight: 'bold' }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AddItems;
