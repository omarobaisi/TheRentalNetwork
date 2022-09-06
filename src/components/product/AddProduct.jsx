import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

function AddProduct({currentUser}) {

    const navigate = useNavigate();
    const [images , setImages] =useState([])
    const [product ,setProduct] =useState({})


    useEffect(()=>{

        insertPost()

    } , [product]) 


    const fileSelectedHandler = async (e) =>{
        let files = e.target.files
        for (const image of files) {
             images.push(image)
        }
        setImages(images)
    }


    const handleSubmit =async (e) =>{
        e.preventDefault()
        let name =e.target.name.value
        let price =e.target.price.value
        let category =e.target.category.value
        let description =e.target.description.value
        // let getImages =fileSelectedHandler
        let product = {name ,price,category,description,images}
        setProduct(product)
        
    }


    const insertPost = async ()=>{
        let product1 =  product;
        axios.defaults.withCredentials = true;
        return axios.post("http://localhost:4000/product" , product1 ).then(res => res.data._id)
        .then(id => navigate(`/product/${id}/show`, { replace: true }))
        .catch(err => console.log(err))
    }



    return (
        <div>{currentUser ? 
        <div>
            <div className='container mt-5 mb-5 w-50'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" name='name'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="priceInput" className="form-label">Price</label>
                    <input type="number" className="form-control" id="priceInput" name='price'/>
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
                    <label htmlFor="imageInput" className="form-label">Images</label>
                    <input type="file" className="form-control" id="imageInput" 
                    multiple accept='image/jpeg , image/png , image/jpg' 
                    onChange={fileSelectedHandler}/>
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-primary w-50">Save</button>
                </div>
            </form>
            </div>
        </div>
        :<Navigate to='../../login'/>}
        </div> 
    );
}

export default AddProduct;

