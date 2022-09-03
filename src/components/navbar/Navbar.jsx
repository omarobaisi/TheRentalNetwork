import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavBar(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to={""}><Nav.Link>Home</Nav.Link></Link>
            </Nav>
            <Nav>
                <Link to={""}><Nav.Link>Link</Nav.Link></Link>
            </Nav>
                </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavBar;