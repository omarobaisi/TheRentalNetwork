import React from 'react';
import axios from "axios"
import "./registerAndLogin.css"

function Login() {

    const login = e => {
        e.preventDefault();
        axios.post("http://localhost:4000/user/login", { email: e.target.email.value, password: e.target.password.value });
    }

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
                    name='email'
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    name='password'
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default Login;