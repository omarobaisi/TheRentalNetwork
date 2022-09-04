import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'

import NavBar from './components/navbar/Navbar';
import Landing from './components/landing/Landing';
import Show from './components/product/Show';
import Edit from './components/product/Edit';
import Rent from './components/product/Rent';
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import Review from './components/user/Review'

function App() {

  const [currentUser, setCurrentUser] = useState('');

  const newCurrentUser = user => {
    setCurrentUser(user);
  }

  return (
    <div>
      
      <NavBar currentUser={currentUser} newCurrentUser={newCurrentUser} />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/product/:id/show' element={<Show />} />
        <Route path='/product/:id/new' element={<Edit />} />
        <Route path='/product/:id/rent' element={<Rent />} />

        <Route path='/login' element={<Login newCurrentUser={newCurrentUser} />} />
        <Route path='/register' element={<Register newCurrentUser={newCurrentUser} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/review' element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;