import React from 'react';
import axios from "axios"
import "./registerAndLogin.css"

function Login() {

    const login = async e => {
        try {
            e.preventDefault();
            const info = {
                email: e.target.email.value,
                password: e.target.password.value
            }
            await axios.post("http://localhost:4000/user/login", info);
        } catch(e) {
            
        }
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