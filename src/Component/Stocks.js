import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_IP } from './Url';

function Stocks() {
  const [purchasingData, setPurchasingData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for showing success alert

  const [modifiedData, setModifiedData] = useState({
    id: null,
    quantity: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    credit: 0,
    debit: 0
  });

  useEffect(() => {
    // Fetching data from API endpoint
    fetchPurchasingData();
  }, []);

  const fetchPurchasingData = async () => {
    try {
      const response = await fetch(`http://${API_IP}/StationaryShop/api/purchasing/viewPurchasing`);
      if (response.ok) {
        const data = await response.json();
        setPurchasingData(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDetails = (item) => {
    setSelectedItem(item);
  };
  
  const handleModify = (item) => {
    setModifiedData({
      id: item.itmId,
      quantity: item.quantity,
      purchasePrice: item.purchasePrice,
      sellingPrice: item.sellingPrice,
      credit: 0,
      debit: 0
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedData({
      ...modifiedData,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://${API_IP}/StationaryShop/api/Purchasing/updateQuantity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedData)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }
  
      // If response is okay, close modal and fetch updated data
      setShowModal(false);
      fetchPurchasingData();
      setShowAlert(true); // Show success alert
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
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
                <NavDropdown.Item>Action 3</NavDropdown.Item>
              </NavDropdown>
              <Link to='/Stocks' className="nav-link">Stock</Link>
              <Link to='/Expense' className="nav-link">Expense</Link>
              <span className="nav-link">Daily Progress</span>
              <Link to='/' className="nav-link">Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h1 className="text-center mb-4">Stocks</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Item Name</th>
              <th>Selling Price</th>
              <th>Purchasing Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Details</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {purchasingData.map(item => (
              <tr key={item.itmId} style={{ backgroundColor: item.quantity < 10 ? 'rgba(255, 0, 0, 0.5)' : 'white' }}>
                <td>{item.itmId}</td>
                <td>{item.itmName}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.purchasePrice}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.Date).toLocaleDateString()}</td>
                <td>
                  <Button variant="primary" onClick={() => handleDetails(item)}>View Details</Button>
                </td>
                <td>
                  <Button variant="success" onClick={() => handleModify(item)}>Modify</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modify Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={modifiedData.quantity}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="purchasePrice">
                <Form.Label>Purchasing Price</Form.Label>
                <Form.Control
                  type="number"
                  name="purchasePrice"
                  value={modifiedData.purchasePrice}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="sellingPrice">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  type="number"
                  name="sellingPrice"
                  value={modifiedData.sellingPrice}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="credit">
                <Form.Label>Credit</Form.Label>
                <Form.Control
                  type="number"
                  name="credit"
                  value={modifiedData.credit}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="debit">
                <Form.Label>Debit</Form.Label>
                <Form.Control
                  type="number"
                  name="debit"
                  value={modifiedData.debit}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="secondary" onClick={handleModalClose}>Close</Button>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Modal.Body>
        </Modal>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Stock modified successfully!
          </Alert>
        )}
        {selectedItem && (
          <Modal show={selectedItem !== null} onHide={() => setSelectedItem(null)}>
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Size:</strong> {selectedItem.size}</p>
              <p><strong>Color:</strong> {selectedItem.color}</p>
              <p><strong>Subject:</strong> {selectedItem.subject}</p>
              <p><strong>Class:</strong> {selectedItem.class}</p>
              {selectedItem.quantity < 10 && (
                <p className="text-danger">You need to buy this item. It is going to end soon.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedItem(null)}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default Stocks;
