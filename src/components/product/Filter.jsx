import { React, useState, useEffect } from "react";
import axios from "axios";
import Card from "../product/card/Card";

function Filter(props) {
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const productsinfo = await axios.get(`http://localhost:4000/product`);
    setProducts(productsinfo.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filterProducts = async (event) => {
    event.preventDefault();
    const FilterInfo = {
      category: event.target.category.value,
      productName: event.target.productName.value,
    };

    const filterdProduct = await axios.get(
      "http://localhost:4000/product/filter",
      {
        params: { FilterInfo },
      }
    );
    setProducts(filterdProduct);
  };

  if (products === undefined) return <p>Not products found.</p>;

  return (
    <div>
      <form className="filter-form" onSubmit={filterProducts}>
        <div className="category">
          <label>Category</label>
          <input type="text" placeholder="Search by category" name="category" />
        </div>
        <div className="product-name">
          <label>Product Name</label>
          <input type="text" placeholder="Search by name" name="productName" />
        </div>
        <div className="filter-button">
          <button type="submit">Filter</button>
        </div>
      </form>

      {products.map((product, index) => (
        <Card product={product} key={index} />
      ))}
    </div>
  );
}

export default Filter;
