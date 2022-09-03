import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'

import NavBar from './components/navbar/NavBar';
import Landing from './components/landing/Landing';
import Show from './components/products/Show';
import Edit from './components/products/Edit';
import Rent from './components/products/Rent';
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import Review from './components/user/Review'

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/product")
    .then(res => res.data)
    .then(products => {
      setProducts(products)
    })
  }, [])

  return (
    <div>
      
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/product/:id/show' element={<Show />} />
        <Route path='/product/:id/new' element={<Edit />} />
        <Route path='/product/:id/rent' element={<Rent />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/review' element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;