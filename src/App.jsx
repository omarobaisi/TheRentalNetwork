import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Landing from './components/landing/Landing';
import Show from './components/products/Show';
import Edit from './components/products/Edit';
import Rent from './components/products/Rent';
import Login from './components/user/login/Login'
import Register from './components/user/register/Register'
import Profile from './components/user/Profile'
import Review from './components/user/Review'

function App() {
  return (
    <div>
      <Navbar />
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