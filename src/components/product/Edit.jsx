import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import "./product.css";

function Edit(props) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    getInformationProduct();
  }, []);

  const getInformationProduct = async () => {
    axios.defaults.withCredentials = true;
    return axios
      .get(`http://localhost:4000/product/${id}`)
      .then((res) => {
        res = res.data;
        let updatedProduct = {
          name: res.name,
          price: res.price,
          category: res.category,
          description: res.description,
          image1 :[...res.images][0],
          image2 :[...res.images][1],
          image3 :[...res.images][2]
          // images: [...res.images],
        };
        setProduct(updatedProduct);
        setInputs(updatedProduct);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let price = e.target.price.value;
    let category = e.target.category.value;
    let description = e.target.description.value;
    let image1 = e.target.image1.value
    let image2 = e.target.image2.value
    let image3 = e.target.image3.value
    let images =[image1 ,image2 ,image3]
    // let images = [
    //   e.target.images[0].value,
    //   e.target.images[1].value,
    //   e.target.images[2].value,
    // ];
    let product = { name, price, category, description, images };
    UpdateProduct(product);
  };

  const UpdateProduct = async (product) => {
    axios.defaults.withCredentials = true;
    return axios
      .put(`http://localhost:4000/product/${id}`, product)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeInput = (input, value) => {
    setInputs({...inputs, [input]: value});
  };

  return (
    <div>
      {id ? (
        <div>
          <div className="container postContianer mt-5 mb-5 w-50">
            <div className="post-header">
              <h1>Update product</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  value={inputs.name}
                  onChange={(e) => handleChangeInput("name", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="priceInput" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="priceInput"
                  name="price"
                  value={inputs.price}
                  onChange={(e) => handleChangeInput("price", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryInput" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryInput"
                  name="category"
                  value={inputs.category}
                  onChange={(e) => handleChangeInput("category", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionInput" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descriptionInput"
                  name="description"
                  value={inputs.description}
                  onChange={(e) => handleChangeInput("description", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionInput" className="form-label">
                  Image1
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descriptionInput"
                  name="image1"
                  // value={product.images && product.images[0]}
                  value={inputs.image1}
                  onChange={(e) => handleChangeInput("image1", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionInput" className="form-label">
                  Image2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descriptionInput"
                  name="image2"
                  value={inputs.image2}
                  onChange={(e) => handleChangeInput("image2", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionInput" className="form-label">
                  Image3
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descriptionInput"
                  name="image3"
                  // value={product.images && product.images[2]}
                  value={inputs.image3}
                  onChange={(e) => handleChangeInput("image3", e.target.value)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="Button formButton">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="../../login" />
      )}
    </div>
  );
}

export default Edit;
