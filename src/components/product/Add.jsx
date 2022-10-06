import axios from "axios";
import Joi from "joi";
import Messages from "../messages/Messages";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Navigate, navigate } from "react-router-dom";
import "./product.css";
import Form from 'react-bootstrap/Form';

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
        .post("/product", product)
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
    const handleSubmit =async (e) =>{
        e.preventDefault()
        let name =e.target.name.value
        let price =e.target.price.value
        let category =e.target.category.value
        let description =e.target.description.value
        let images = []
        let image1 =e.target.image1.value
        let image2 =e.target.image2.value
        let image3 =e.target.image3.value
        if(image1 !== '') {
            images.push(image1)
        }
        if(image2 !== '') {
            images.push(image2)
        }
        if(image3 !== '') {
            images.push(image3)
        }
        let product = {name ,price,category,description,images}
        emptyInputs(e)
        insertPost(product)
    }

    const emptyInputs = (e) =>{
        e.target.name.value=" "
        e.target.price.value=" "
        e.target.category.value=" "
        e.target.description.value=" "
        e.target.image1.value=" "
        e.target.image2.value=" "
        e.target.image3.value=" "

    }
    
    const insertPost = async (product)=>{
        let product1 =  product;
        axios.defaults.withCredentials = true;
        return axios.post("/product" , product1 ).then(res => res.data._id)
        .then(id => navigate(`/product/${id}/show`, { replace: true }))
        .catch(err => console.log(err))
    }



    return (
        <div>
            <div className='add-container container mt-5 mb-5 w-50'>
            <div className="rent-header"><h1>New Product</h1></div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="aform-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" name='name'/>
                </div>
                <div className="mb-3">
                  <label htmlFor="priceInput" className="aform-label">
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
                  <label htmlFor="categoryInput" className="aform-label">
                    Category
                  </label>
                  <Form.Select aria-label="Default select example" className="form-control" required onChange={handelInputs} name="category">
                    <option>Choose a category</option>
                    <option value="photography">Photography</option>
                    <option value="music instrument">Music instrument</option>
                    <option value="Laptops">Laptops</option>
                    <option value="tools">Tools</option>
                  </Form.Select>
                </div>
                <div className="mb-3">
                  <label htmlFor="descriptionInput" className="aform-label">
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
                  <label htmlFor="imageInput1" className="aform-label">
                    First Image
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="imageInput1"
                    name="image1"
                    onChange={handelInputs}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageInput2" className="aform-label">
                    Second Image
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="imageInput2"
                    name="image2"
                    onChange={handelInputs}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageInput3" className="aform-label">
                    Third Image
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="imageInput3"
                    name="image3"
                    onChange={handelInputs}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-success w-100 p-2">
                      Create
                  </button>
                </div>
            </form>
        </div>
      </div>
  );
}

export default AddProduct;
