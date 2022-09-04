import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'

import NavBar from './components/navbar/NavBar';
import Landing from './components/landing/Landing';
import Show from './components/product/Show';
import Edit from './components/product/Edit';
import Rent from './components/product/Rent';
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import Review from './components/user/Review'
import AddProduct from './components/product/AddProduct';

function App() {

  return (
    <div>
      
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/product/:id/show' element={<Show />} />
        <Route path='/product/:id/new' element={<Edit />} />
        <Route path='/product/:id/rent' element={<Rent />} />
        <Route path='/product/:id/add' element={<AddProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/review' element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;