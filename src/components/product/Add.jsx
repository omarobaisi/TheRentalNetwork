import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

function AddProduct({currentUser}) {

    const navigate = useNavigate();
    const [product ,setProduct] =useState({})


    useEffect(()=>{

        insertPost()

    } , [product]) 




    const handleSubmit =async (e) =>{
        e.preventDefault()
        let name =e.target.name.value
        let price =e.target.price.value
        let category =e.target.category.value
        let description =e.target.description.value
        let image1 =e.target.image1.value
        let image2 =e.target.image2.value
        let image3 =e.target.image3.value
        let images =[image1, image2, image3]
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
                    <label htmlFor="imageInput" className="form-label">First Image</label>
                    <input type="text" className="form-control" id="imageInput1" name="image1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">Second Image</label>
                    <input type="text" className="form-control" id="imageInput2" name="image2"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">Third Image</label>
                    <input type="text" className="form-control" id="imageInput3" name="image3"/>
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

