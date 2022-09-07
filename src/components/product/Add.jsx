import axios from "axios";
import Joi from "joi";
import Messages from "../messages/Messages";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Navigate, navigate } from "react-router-dom";
import "./product.css";

function AddProduct({ currentUser }) {
  const navigate = useNavigate();
  const [errorList, SetErrorList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image1: "",
    image2: "",
    image3: ""
  });

  async function submitForm(e) {
    e.preventDefault();
    let ValidationResult = ValidationForm();
    if (ValidationResult.error) {
      ValidationResult = ValidationResult.error.details;
      SetErrorList(ValidationResult);
      window.scroll({
        top: 0,
        left: 100,
        behavior: "smooth"
      });
    } else {
      console.log(product);
      axios.defaults.withCredentials = true;
      return axios
        .post("http://localhost:4000/product", product)
        .then((res) =>
          navigate(`/product/${res.data._id}/show`, { replace: true })
        )
        .catch((err) => console.log(err));
    }
  }

  function handelInputs(e) {
    let OldProduct = { ...product };
    OldProduct[e.target.name] = e.target.value;
    setProduct(OldProduct);
  }

  function ValidationForm() {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(20).alphanum(),
      price: Joi.number().required().min(1),
      category: Joi.string(),
      description: Joi.string(),
      image1: Joi.string(),
      image2: Joi.string(),
      image3: Joi.string()
    });
    return schema.validate(product, { abortEarly: false });
  }

  if (!currentUser) return <Navigate to="../../login" />;

  return (
    <div>
      <Messages errorList={errorList} />
      <div>
        <div className="container postContianer mt-5 mb-5 w-50">
          <div className="post-header">
            <h1>Add product</h1>
          </div>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                required
                onChange={handelInputs}
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
                required
                onChange={handelInputs}
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
                required
                onChange={handelInputs}
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
                required
                onChange={handelInputs}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageInput1" className="form-label">
                First Image
              </label>
              <input
                type="url"
                className="form-control"
                id="imageInput1"
                name="image1"
                required
                onChange={handelInputs}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageInput2" className="form-label">
                Second Image
              </label>
              <input
                type="url"
                className="form-control"
                id="imageInput2"
                name="image2"
                required
                onChange={handelInputs}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageInput3" className="form-label">
                Third Image
              </label>
              <input
                type="url"
                className="form-control"
                id="imageInput3"
                name="image3"
                required
                onChange={handelInputs}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success w-100 p-2">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
