import React, { useState } from 'react';
import { Container, Row, Col, Button,Nav, NavDropdown,Navbar, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_IP } from './Url';
import axios from 'axios';

const UpdatePassword = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.post(`http://${API_IP}/StationaryShop/api/User/UpdatePassword`, {
        Username: username,
        OldPassword: oldPassword,
        NewPassword: newPassword,
        ConfirmPassword: confirmPassword
      });

      console.log(response.data); // Log the response from the server
      // Show alert if password is changed successfully
      setErrorMessage('Password changed successfully');
      // Clear form fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error.response.data); // Log any errors
      // Set error message state
      setErrorMessage(error.response.data.Message);
    }
  };

  // Function to render alert based on error message
  const renderAlert = () => {
    if (errorMessage.startsWith('Success!')) {
      return <Alert variant="success">{errorMessage}</Alert>;
    } else if (errorMessage.startsWith('Info!')) {
      return <Alert variant="info">{errorMessage}</Alert>;
    } else if (errorMessage.startsWith('Warning!')) {
      return <Alert variant="warning">{errorMessage}</Alert>;
    } else {
      return <Alert variant="danger">{errorMessage}</Alert>;
    }
  };


  return (
    <div >
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
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h2 className="text-center mb-4">Update Password</h2>
            {errorMessage && renderAlert()}
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formOldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleUpdatePassword}>
                Update Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdatePassword;
