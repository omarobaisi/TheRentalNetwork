import React from 'react';
import axios from "axios"
import "./registerAndLogin.css"

function Login() {

    const login = e => {
        e.preventDefault();
        const info = {
            password: e.target.password.value,
            user: {
                email: e.target.email.value,
                name: e.target.name.value,
                phone: e.target.phone.value,
            }
        }
        axios.post("http://localhost:4000/user/register", info);
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={login}>
                <div className="Auth-form-content">
                <h3 className="Auth-form-title">Register</h3>
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
                    <label>Name</label>
                    <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter name"
                    name='name'
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Phone Number</label>
                    <input
                    type="number"
                    className="form-control mt-1"
                    placeholder="Enter number"
                    name='phone'
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