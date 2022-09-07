import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/navbar/Navbar";
import Landing from "./components/landing/Landing";
import Show from "./components/product/show/Show";
import Edit from "./components/product/Edit";
import Rent from "./components/product/Rent";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Review from "./components/user/review/Review";
import Add from "./components/product/Add";
import Records from "./components/records/Records";
import History from "./components/user/History";
import Filter from "./components/product/filter/filter";
import PageNotFound from "./components/notFound/pageNotFound";

function App() {
  const [currentUser, setCurrentUser] = useState("");

  const newCurrentUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div>
      <NavBar currentUser={currentUser} newCurrentUser={newCurrentUser} />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/product/:id/show" element={<Show />} />
        <Route path="/product/:id/edit" element={<Edit />} />
        <Route path="/product/:id/rent" element={<Rent />} />
        <Route path="/product/filter" element={<Filter />} />
        <Route
          path="/product/add"
          element={<Add currentUser={currentUser} />}
        />
        <Route path="/records" element={<Records />} />
        <Route
          path="/login"
          element={<Login newCurrentUser={newCurrentUser} />}
        />
        <Route
          path="/register"
          element={<Register newCurrentUser={newCurrentUser} />}
        />
        <Route
          path="/profile/:id"
          element={<Profile currentUser={currentUser} />}
        />
        <Route
          path="/review/:userId"
          element={<Review currentUser={currentUser} />}
        />
        <Route path="/:userId/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
