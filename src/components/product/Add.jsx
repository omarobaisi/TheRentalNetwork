import axios from "axios";
import Joi from "joi";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./product.css";

function AddProduct({ currentUser }) {
  const navigate = useNavigate();
  let [errorList, SetErrorList] = useState([]);
  //   const [product, setProduct] = useState({});

  let [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    Email: "",
    Password: ""
  });

  const navigateFun = useNavigate();

  function goToPage(path) {
    navigateFun("/" + path);
  }

  const submitForm = (e) => {
    e.preventDefault();
    let ValidationResult = ValidationForm();
    if (ValidationResult.error) {
      ValidationResult = ValidationResult.error.details;
      SetErrorList(ValidationResult);
    } else {
      goToPage("Home");
    }
  };

  const handelInputs = (e) => {
    let OldProduct = { ...product };
    OldProduct[e.target.name] = e.target.value;
    setProduct(OldProduct);
  };

  function ValidationForm() {
    const schema = Joi.object({
      name: Joi.string(),
      price: Joi.number().min(1),
      category: Joi.number().min(1)
      //   Email: Joi.string()
      //     .required()
      //     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      //   Password: Joi.string().required().pattern(new RegExp("^[a-zA-z0-9]{8,}$"))
    });
    return schema.validate(product, { abortEarly: false });
  }

  useEffect(() => {
    insertPost();
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let price = e.target.price.value;
    let category = e.target.category.value;
    let description = e.target.description.value;
    // let getImages =fileSelectedHandler
    let product = { name, price, category, description, images };
    setProduct(product);
  };

  const insertPost = async () => {
    let product1 = product;
    axios.defaults.withCredentials = true;
    return axios
      .post("http://localhost:4000/product", product1)
      .then((res) =>
        navigate(`/product/${res.data._id}/show`, { replace: true })
      )
      .catch((err) => console.log(err));
  };

  if (!currentUser) return <Navigate to="../../login" />;

  return (
    <div>
      <div className="container postContianer mt-5 mb-5 w-50">
        <div className="post-header">
          <h1>Create a new product</h1>
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
              required
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageInput" className="form-label">
              Images
            </label>
            <input
              type="file"
              className="form-control"
              id="imageInput"
              multiple
              accept="image/jpeg , image/png , image/jpg"
              onChange={fileSelectedHandler}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="Button formButton">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
