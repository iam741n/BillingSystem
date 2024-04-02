import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Nav, NavDropdown, Navbar, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import axios from 'axios';
import { API_IP } from './Url';

const Dashboard = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cartItem, setCartItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItemList();
  }, []);

  const fetchItemList = async () => {
    try {
      const response = await axios.get(`http://${API_IP}/StationaryShop/api/Purchasing/viewPurchasing`);
      setItemList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemClick = (item) => {
    setShowModal(true);
    setQuantity('');
    setErrorMessage('');
    setCartItem(item);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmAddToCart = () => {
    if (parseInt(quantity) > 0) {
      const newItem = { itmId: cartItem.itmId, name: cartItem.itmName, quantity: parseInt(quantity), price: cartItem.sellingPrice };
      setCart([...cart, newItem]);
      setShowModal(false);
      setQuantity('');
    } else {
      setErrorMessage('Please select a quantity greater than 0.');
    }
  };

  const getTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const getTotalBill = () => {
    let total = 0;
    cart.forEach(item => {
      total += getTotalPrice(item);
    });
    return total;
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const getPayAmount = () => {
    const totalBill = getTotalBill();
    const discountAmount = parseFloat(discount) || 0;
    return totalBill - discountAmount;
  };

  const generateReceipt = async () => {
    try {
      const itemList = cart.map(item => ({ itmId: item.itmId, quantity: item.quantity }));

      const response = await axios.post(`http://${API_IP}/StationaryShop/api/Billing/GenerateBill`, {
        TotalAmount: getTotalBill(),
        Discount: parseFloat(discount),
        PayAmount: getPayAmount(),
        ItemList: itemList
      });
      console.log(response.data); // Log success message or handle as needed
      setSuccessMessage('Bill generated successfully.');

      console.log('Bill generated successfully.');
    } catch (error) {
      console.error('Error generating receipt:', error.response.data);
      // Handle error, show error message to user, etc.
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const ReceiptDocument = () => (
    <Document>
      <Page>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Receipt</Text>
        <Text>Total Bill: {getTotalBill()}</Text>
        <Text>Discount: {discount}</Text>
        <Text>Pay Amount: {getPayAmount()}</Text>
        <View>
          {cart.map((item, index) => (
            <View key={index}>
              <Text>Sr.no: {index + 1}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Total Price: {getTotalPrice(item)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

   // Filtering items based on search query
   const filteredItems = itemList.filter(item =>
    item.itmName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handlePrintPDF = () => {
    const pdfBlob = new Blob([<ReceiptDocument />], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfUrl);
    printWindow.onload = () => {
      printWindow.print();
    };
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


      <Container fluid className="mt-4">
      <Row>
        {/* Item List */}
        <Col md={8}>
          <h1 className="text-center">Dashboard</h1>
          <table className="table">
            <thead>
            <tr>
        <th>Sr. No</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total Price</th>
        <th>Action</th> {/* New column for Action */}
      </tr>
            </thead>
            <tbody>
  {cart.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
      <td>{getTotalPrice(item)}</td>
      <td>
        <Button variant="danger" onClick={() => handleRemoveItem(index)}>Remove</Button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </Col>
        <Col md={4}>
            <Container>
              <Col md={{ span: 6, offset: 0 }} className="text-center">
                <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <h2 className="text-center">Item List</h2>
                  <input
                    type="text"
                    placeholder="Search items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control mb-3"
                  />
                  {filteredItems.map((item) => (
                    <div key={item.itmId} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      <p>{item.itmName} {item.size}  {item.color}   {item.subject} {item.class}</p>
                    </div>
                  ))}

              </div>
            </Col>
          </Container>
        </Col>
      </Row>
    </Container>

    {/* Modal for entering quantity */}
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
  {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
  <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
  <Button variant="primary" onClick={handleConfirmAddToCart}>Add</Button>
</Modal.Footer>

    </Modal>
  
        {/* Rectangular box for total bill, discount, and pay amount */}
        <Container className="mt-4">
  <Row>
    <Col md={{ span: 6, offset: 0 }} className="text-center">
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h3>Total Bill: {getTotalBill()}</h3>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="auto" className="font-weight-bold">Discount:</Form.Label>
          <Col>
            <Form.Control type="number" value={discount} onChange={handleDiscountChange} />
          </Col>
        </Form.Group>
        <h3>Pay Amount: {getPayAmount()}</h3>
      </div>
    </Col>
  </Row>
  {/* Buttons Row */}
  <Row className="justify-content-center mt-3">
    <Col md={4} className="d-flex justify-content-between">
    <Button variant="secondary" onClick={handlePrintPDF}>Print PDF</Button>
      <Button variant="primary" onClick={generateReceipt}>Generate Receipt</Button>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
    
    </Col>
  </Row>
</Container>

<Container className="mt-4">
<Row className="justify-content-center">
<Col md={4} className="text-center">

<PDFDownloadLink document={<ReceiptDocument />} fileName="receipt.pdf">
{({ blob, url, loading, error }) =>
loading ? 'Loading document...' : 'Download PDF'
}
</PDFDownloadLink>

</Col>
</Row>
</Container>


      </div>
    );
  };
  
  export default Dashboard;
