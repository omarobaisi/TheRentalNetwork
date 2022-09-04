import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function AddProduct(props) {
    const id = useParams()
    console.log(id);
    const [images , setImages] =useState([])

    const fileSelectedHandler = (e) =>{
        let files = e.target.files
        return files
        // console.log(files);
        // return files
        // console.log(files);
        // return files
        // const newImages = []
        // newImages.push([...files])
        // setImages(newImages )
    }


    const handleSubmit =(e) =>{
        e.preventDefault()
        // let name =e.target.name.value
        // let price =e.target.price.value
        // let category =e.target.category.value
        // let description =e.target.description.value
        // let date =e.target.date.value
        let images = fileSelectedHandler()
        console.log(images);
        // fileSelectedHandler()
        // console.log(images);
        // let product = {name ,price,category,description,date,images}
        // let producttest = {name ,price,category,description,date}
        // console.log(product);
        // insertPost(product)
        // console.log(producttest);
    }

    const insertPost = async (product)=>{
        return axios.post("http://localhost:4000/product" , product ).then(res => res._id)
        .then(id => <navigate to={`/product/${id}/show`}/>)
        .catch()
    }



    return (
        <div>
            <div className='container mt-5 mb-5 w-50'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" name='name'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="priceInput" className="form-label">Price</label>
                    <input type="text" className="form-control" id="priceInput" name='price'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryInput" className="form-label">Category</label>
                    <input type="text" className="form-control" id="categoryInput" name="category"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Description</label>
                    <input type="text" className="form-control" id="descriptionInput" name="description"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dateInput" className="form-label">Date</label>
                    <input type="text" className="form-control" id="dateInput" name='date'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">Images</label>
                    <input type="file" className="form-control" id="imageInput" 
                    multiple accept='image/jpeg , image/png , image/jpg' 
                    onChange={fileSelectedHandler}/>
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-primary w-25">Submit</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default AddProduct;



//             <form onSubmit={handleSubmit}>
{/* <div>
<label>Name</label>
<input type="text" name='name' placeholder='Enter Product Name '/>
</div>
<div>
<label>Price</label>
<input type="number" name='price' placeholder='Enter Price'/>
</div>
<div>
<label>Category </label>
<input type="text" name="Category" placeholder='Enter Category'/>
</div>
<div>
<label>Description</label>
<textarea type="text" name="description" placeholder="Enter Description"></textarea>
</div>
<div>
<label>Date</label>
<input type="date" name='date' placeholder='Enter Date'/>
</div>
<div>
<label htmlFor="files" >Images</label> */}
{/* <input type="file"  id="files" multiple="multiple" accept='image/jpeg , image/png , image/jpg' /> */}
{/* <input type="file" id="files" multiple accept='image/jpeg , image/png , image/jpg' onChange={fileSelectedHandler} />
</div>
<div>
<button>Add New Product </button>
</div>
</form> */}