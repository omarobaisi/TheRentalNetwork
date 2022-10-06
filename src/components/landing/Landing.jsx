import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from '../product/card/Card';
import './landing.css'
import coverImg from "./Cover.jpg"
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

function Landing() {

    const [products, setProducts] = useState([]);
    const [latest, setlatest] = useState([]);

    useEffect(() => {
        axios.get("/product")
        .then(res => res.data)
        .then(products => setProducts(products))
        axios.get("/product")
        .then(res => res.data)
        .then(products => setlatest(products))
        .then(()=>random())
    }, [])

    const random = () => {
        const random = [...latest].sort(() => Math.random() - 0.5);
        while(random.length > 8) {
            random.pop()
        }
        return random
    }

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
                        <h2>Latest Products</h2>
                    </div>
                    <div className='latest-cards'>
                        {latest.map(product => (
                            product.state === "posted" ? (
                                <Card product={product} key={product._id} />
                            ) : (
                            ''
                            )
                        ))}
                    </div>
                </div>
                <div>
                    <div className='card-container-header special'>
                        <h2>Special Products</h2>
                    </div>
                    <div className='latest-cards'>
                        {random().map((product, index) => (
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