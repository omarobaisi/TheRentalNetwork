import React from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavBar(props) {

    const logout = async () => {
        await axios.post("http://localhost:4000/user/logout");
        props.newCurrentUser('');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="md">
        <Container>
            <Link to={"/"}><Navbar.Brand>React-Bootstrap</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to={"/"}>Home</Link>
            </Nav>
            <Nav>

            </Nav>
            {props.currentUser !== '' ? (
                [
                    <Link to={"/profile"}>{props.currentUser.name}</Link>,
                    <Link to={'/review/631375b2ee824d15e0a59a21'}>review</Link>
                    // <Link onClick={logout}  >Logout</Link>
                ]
            ) : (
                [
                    <Link to={"/login"}>Login</Link>,
                    <Link to={"/register"}>Register</Link>,
                ]
            )}
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavBar;