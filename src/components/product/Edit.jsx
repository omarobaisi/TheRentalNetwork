import axios from "axios";
import Joi from "joi";
import Messages from "../messages/Messages";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Navigate, navigate } from "react-router-dom";
import "./product.css";

function Edit(props) {
  const { id } = useParams();
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
  useEffect(() => {
    getInformationProduct();
  }, []);

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
      // console.log(product);
      axios.defaults.withCredentials = true;
      return axios
        .put(`http://localhost:4000/product/${id}`, product)
        .then((res) =>
          navigate(`/product/${res.data._id}/show`, { replace: true })
        )
        .catch((err) => console.log(err));
    }
  }

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
          image1: [...res.images][0],
          image2: [...res.images][1],
          image3: [...res.images][2]
        };
        setProduct(updatedProduct);
      })
      .catch((err) => console.log(err));
  };

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
  // if (!id) return <Navigate to="../../login" />;
  return (
    <div>
      <Messages errorList={errorList} />
      <div>
        <div className="container postContianer mt-5 mb-5 w-50">
          <div className="post-header">
            <h1>Update product</h1>
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
                value={product.name}
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
                value={product.price}
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
                value={product.category}
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

                onChange={handelInputs}
                value={product.description}
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
                onChange={handelInputs}
                value={product.image1}
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
                onChange={handelInputs}
                value={product.image2}
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
                onChange={handelInputs}
                value={product.image3}
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
    </div>
  );
}

export default Edit;

// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useNavigate, Navigate } from "react-router-dom";
// import "./product.css";

// function Edit({ currentUser }) {
//   const navigate = useNavigate();
//   const [images, setImages] = useState([]);
//   const [product, setProduct] = useState({});

//   useEffect(() => {
//     insertPost();
//   }, [product]);

//   const fileSelectedHandler = async (e) => {
//     let files = e.target.files;
//     for (const image of files) {
//       images.push(image);
//     }
//     setImages(images);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let name = e.target.name.value;
//     let price = e.target.price.value;
//     let category = e.target.category.value;
//     let description = e.target.description.value;
//     // let getImages =fileSelectedHandler
//     let product = { name, price, category, description, images };
//     setProduct(product);
//   };

//   const insertPost = async () => {
//     let product1 = product;
//     axios.defaults.withCredentials = true;
//     return axios
//       .post("http://localhost:4000/product", product1)
//       .then((res) => res.data._id)
//       .then((id) => navigate(`/product/${id}/show`, { replace: true }))
//       .catch((err) => console.log(err));
//   };

//   if (!currentUser) return <Navigate to="../../login" />;

//   return (
//     // <div>{currentUser ?
//     <div>
//       <div className="container postContianer mt-5 mb-5 w-50">
//         <div className="post-header">
//           <h1>Create a new product</h1>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="nameInput" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="nameInput"
//               name="name"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="priceInput" className="form-label">
//               Price
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               id="priceInput"
//               name="price"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="categoryInput" className="form-label">
//               Category
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="categoryInput"
//               name="category"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="descriptionInput" className="form-label">
//               Description
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="descriptionInput"
//               name="description"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="imageInput" className="form-label">
//               Images
//             </label>
//             <input
//               type="file"
//               className="form-control"
//               id="imageInput"
//               multiple
//               accept="image/jpeg , image/png , image/jpg"
//               onChange={fileSelectedHandler}
//             />
//           </div>
//           <div className="text-center">
//             <button type="submit" className="Button formButton">
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     // :<Navigate to='../../login'/>}
//     // </div>
//   );
// }

// export default Edit;
