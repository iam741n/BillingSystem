import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosLogIn } from "react-icons/io";
import { API_IP } from './Url';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate= useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Check if username or password is empty
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password');
            return;
        }
    
        try {
            const response = await fetch(
                `http://${API_IP}/StationaryShop/api/user/loginuser?un=${encodeURIComponent(email)}&p=${encodeURIComponent(password)}`
            );
    
            if (response.ok) {
                const data = await response.json();
                if (data !== "User Not Found") {
                    console.log("WELCOME USER");
                    // Navigate to user dashboard
                    navigate('/Dashboard');
                } else {
                    setError('User Not Found');
                }
            } else {
                const errorMessage = await response.text();
                setError('Login failed: ' + errorMessage);
            }
        } catch (error) {
            setError('Login failed: ' + error.message);
        }
    };
    
    
    return (
        <div style={{ backgroundImage: `url(${require('../assets/cash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <h1 className="text-center mt-4" style={{ color: 'White', fontFamily: 'Arial, sans-serif', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 'bold' }}>Cash Billing Service</h1>

            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6} style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '8px', position: 'relative' }}>
                        <h2 className="text-center mb-4">Login <IoIosLogIn /></h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleLogin}>
                            <Form.Group>
                            <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <div className="password-input" style={{ position: 'relative' }}>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <Button
                                        variant="secondary"
                                        className="password-toggle"
                                        onClick={handleTogglePassword}
                                        style={{ position: 'absolute', top: '48%', right: '2px', transform: 'translateY(-50%)' }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </div>
                            </Form.Group>
                            <Button type="submit" variant="primary" style={{ padding: '5px', width: '25%', height: '20%', backgroundImage: 'linear-gradient(to right, Orange,Orange)', border: 'none', color: 'White', fontWeight: 'bold' }}>
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;