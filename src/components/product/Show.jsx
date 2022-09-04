import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div id="product-detail">
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <h2>{product.category}</h2>
      <h2>{product.date}</h2>
      <h2>Owner:{product.owner.name} </h2>
      <div>
        {product.images.map((img, index) => (
          <img src={img} key={index} alt="product image" />
        ))}
      </div>
    </div>
  );
}

export default Show;
