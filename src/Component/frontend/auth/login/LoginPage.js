import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../../loading/LoadingPage';

import '../Auth.css';
import { BASE_URL } from '../../../../App';

// Encryption function
const encryptData = (data) => {
    // Perform encryption here, this is just a placeholder
    return btoa(data);
};


const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        error_list: []
    });

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let data = {
            email: inputs.email,
            password: inputs.password,
        };

        axios.post(BASE_URL + '/auth/login', data)
            .then(res => {

                if (res.data.status === 201 || res.data.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "User Login Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    console.log(res.data);
                    console.log(res.data.user);
                    console.log(res.data.user.name)
                    localStorage.setItem('name', encryptData(res.data.user.name));
                    localStorage.setItem('authToken', res.data.token);
                    localStorage.setItem('role', encryptData(res.data.user.role));
                    localStorage.setItem('id', res.data.user.id);

                    navigate('/auth')

                } else if (res.data.status === 401) {
                    Swal.fire({
                        title: "Warning !",
                        icon: 'warning',
                        text: res.data.message,
                        button: "Ok!"
                    });
                } else {
                    setInputs({
                        ...inputs, error_list: res.data.validator_error
                    })
                }

            }).catch((e) => {
                Swal.fire({
                    title: "Warning !",
                    icon: 'warning',
                    text: "Please connect your database",
                    button: "Ok!"
                });
            });
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center navv" style={{ minHeight: "100vh" }}>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 mb-2">
                                <div className="card">
                                    <div className="card-header bg-primary text-white text-center">
                                        <h1 className="text-uppercase display-4 fw-bold">Login</h1>
                                    </div>
                                    <div className="card-body">
                                        <form autoComplete="off" onSubmit={handleFormSubmit}>
                                            {/* Email */}
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input
                                                    type="text"
                                                    className={`form-control text-lowercase ${inputs.error_list.email && 'is-invalid'}`}
                                                    id="email"
                                                    name="email"
                                                    value={inputs.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter your email"
                                                />
                                                {inputs.error_list.email && <div className="invalid-feedback">{inputs.error_list.email}</div>}
                                            </div>

                                            {/* Password */}
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    className={`form-control ${inputs.error_list.password && 'is-invalid'}`}
                                                    id="password"
                                                    name="password"
                                                    value={inputs.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter your password"
                                                />
                                                {inputs.error_list.password && <div className="invalid-feedback">{inputs.error_list.password}</div>}
                                            </div>

                                            {/* Login Button */}
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary">
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <span className="text-muted">
                                            Don't have an account? <Link to="/new-user">Register Here</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginPage;
