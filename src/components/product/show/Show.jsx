import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Show.css"
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

function Show(props) {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const getProduct = async () => {
    const product = await axios.get(`http://localhost:4000/product/${id}`);
    setProduct(product.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (product === undefined) return <p>Not product found.</p>;

  return (
    <Container className='product-detail'>
      <Carousel className="show-images">
        {product.images.map((img, index) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img} 
              key={index}
              alt="product_image"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="product-info">
        <div className="show-name"><h1>{product.name}</h1></div>
        <div className="show-price-owner">
          <h2><Link className="Nav-Link" to={`/profile/${product.owner._id}`}>{product.owner.name}</Link></h2>
          <h2>{product.price}₪</h2>
        </div>
        <h2>{product.category}</h2>
        <h2>{product.date}</h2>
        <div ><Link to={''}><button>Rent</button></Link></div>
      </div>
    </Container>
  );
}

export default Show;
