import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./registerAndLogin.css";
// import Snackbar from '@mui/material/Snackbar';
function Login(props) {
  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();
      const info = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const user = await axios("http://localhost:4000/user/login", {
            method: "POST",
            data: info,
            withCredentials: true
      });
      props.newCurrentUser(user.data);
      navigate("/", { replace: true });
    } catch (e) {}
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={login}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <div className="d-grid gap-2 mt-3 px-2">
            <button type="submit" className="Button formButton">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
