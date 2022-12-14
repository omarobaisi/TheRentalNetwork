import { React, useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card";
import Container from 'react-bootstrap/Container';
import "./filter.css"

function Filter(props) {
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const productsinfo = await axios.get(`/product`);
    setProducts(productsinfo.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filterProducts = async (event) => {
    event.preventDefault();
    const filterdProduct = await axios.get(
      "/product/filter",
      {
        params: { 
          category: event.target.category.value,
          productName: event.target.productName.value,
         }
      }
    );
    setProducts(filterdProduct.data);
  };

  if (products === undefined) return <p>Not products found.</p>;

  return (
    <div>
      <Container className='cards-container'>
        <form className="filter-form" onSubmit={filterProducts}>
          <div className="category">
            <select id="" name="category" className="filter-input">
              <option value="">Choose a category</option>
              <option value="photography">Photography</option>
              <option value="music instrument">Music instrument</option>
              <option value="Laptops">Laptops</option>
              <option value="tools">Tools</option>
            </select>
          </div>
          <div>
            <input type="text" placeholder="Search by name" name="productName"  className="filter-input"/>
          </div>
          <div className="filter-button">
            <button type="submit" className="Button">Search</button>
          </div>
        </form>
        <div className="products-container">
          {products.map((product, index) => (
            product.state === "posted" ? (
              <Card product={product} key={index} />
            ) : (
              ''
            )
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Filter;
