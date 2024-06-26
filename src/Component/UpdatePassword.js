import React, { useState } from 'react';
import { Container, Row, Col, Button, Nav, NavDropdown, Navbar, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_IP } from './Url';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const UpdatePassword = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); // State for toggling old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for toggling new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

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
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Update Password</h1>
            {errorMessage && renderAlert()}
            <Form>
              <Form.Group controlId="formUsername">
              <Form.Label style={{ color: 'white' }}>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formOldPassword">
              <Form.Label style={{ color: 'white' }}>Old Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowOldPassword(!showOldPassword)}>
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group controlId="formNewPassword">
              <Form.Label style={{ color: 'white' }}>New Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
              <Form.Label style={{ color: 'white' }}>Confirm Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
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
