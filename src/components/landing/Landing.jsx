import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from '../product/card/Card';
import './landing.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Landing() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/product")
        .then(res => res.data)
        .then(products => setProducts(products))
    }, [])

    return (
        <Container className='cards-container'>
            {products.map(product => <Card product={product} />)}
        </Container>
    );
}

export default Landing;