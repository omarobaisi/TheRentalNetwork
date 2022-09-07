import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from '../product/card/Card';
import './landing.css'
import coverImg from "./Cover.jpg"
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

function Landing() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/product")
        .then(res => res.data)
        .then(products => setProducts(products))
    }, [])

    return (
        <div>
            <div className="mainImageDiv">
                <img src={coverImg} alt="" className='mainImage' />\
                <div className="mainImageCenterDiv">
                    <div className="mainImageText">Why Buy When You Can Rent</div>
                </div>
            </div>
            <Container className='cards-container'>
                <div>
                    <div className='card-container-header'>
                        <h1>Latest Products</h1>
                        <Link className='Nav-Link' to={`/product/filter`} key={"moreLatest"}>Show More</Link>
                    </div>
                    <div className='latest-cards'>
                        {products.map(product => <Card product={product} key={product._Id} />)}
                    </div>
                </div>
                <div>
                    <div className='card-container-header'>
                        <h1>Special Products</h1>
                        <Link className='Nav-Link' to={`/product/filter`} key={"moreSpetial"}>Show More</Link>
                    </div>
                    <div className='latest-cards'>
                        {products.map((product, index) => (
                            product.state === "posted" ? (
                                <Card product={product} key={product._id} />
                            ) : (
                            ''
                            )
                        ))}
                    </div>
                </div>
                <div className='Button-Div'><Link to={`/product/filter`} key={"filter"}><button className='Button'>Show More</button></Link></div>
            </Container>
        </div>
    );
}

export default Landing;