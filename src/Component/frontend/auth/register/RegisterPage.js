import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingPage from '../../loading/LoadingPage';

import '../Auth.css';
import { BASE_URL } from '../../../../App';

// Encryption function
const encryptData = (data) => {
    // Perform encryption here, this is just a placeholder
    return btoa(data);
};


const RegisterPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        contact: "",
        address: "",
        dob: "",
        gender: "",
        error_list: []
    });

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const [photo, setPhoto] = useState([]);

    const handleImage = (event) => {
        setPhoto({ avatar: event.target.files[0] });
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('avatar', photo.avatar);
        formData.append('name', inputs.name);
        formData.append('email', inputs.email);
        formData.append('contact', inputs.contact);
        formData.append('password', inputs.password);
        formData.append('address', inputs.address);
        formData.append('dob', inputs.dob);
        formData.append('gender', inputs.gender);

        axios.post(BASE_URL + '/auth/register', formData)
            .then(res => {
                console.log(res);
                if (res.data.status === 201 || res.data.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "User Registration Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    localStorage.setItem('authToken', res.data.token);
                    localStorage.setItem('name', encryptData(res.data.user.name));
                    localStorage.setItem('role', encryptData(res.data.user.role));
                    localStorage.setItem('id', encryptData('res.data.user.id'))

                    navigate('/auth');
                } else {
                    setInputs({
                        ...inputs, error_list: res.data.validator_error
                    })
                }
            }).catch((error) => {
                Swal.fire({
                    title: "Warning!",
                    icon: 'warning',
                    text: "Connect your database",
                    button: "Ok!"
                });
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center navv">
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 mb-5 mt-5">
                                <div className="card">
                                    <div className="card-header bg-success text-white text-center">
                                        <h1 className="text-uppercase display-4 fw-bold">Registration</h1>
                                    </div>
                                    <div className="card-body">
                                        <div class="mb-mb-12 mb-2">
                                            <label for="formFile" class="form-label">Select your profile pic</label>
                                            <input class="form-control" type="file" id="formFile" name='avatar' onChange={handleImage} />
                                        </div>

                                        <form className="row g-3" onSubmit={handleFormSubmit}>
                                            <div className="col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">Email <span className="text-danger">*</span></label>
                                                <input type="text" className={`form-control text-lowercase ${inputs.error_list.email && 'is-invalid'}`} id="inputEmail4" name='email' value={inputs.email} onChange={handleChange} placeholder='Enter your email' />
                                                {inputs.error_list.email && <div className="invalid-feedback">{inputs.error_list.email}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="name" className="form-label">User Name <span className="text-danger">*</span></label>
                                                <input type="text" className={`form-control ${inputs.error_list.name && 'is-invalid'}`} id="name" name='name' value={inputs.name} onChange={handleChange} placeholder='Enter your name' />
                                                {inputs.error_list.name && <div className="invalid-feedback">{inputs.error_list.name}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputPassword4" className="form-label">Password <span className="text-danger">*</span></label>
                                                <input type="password" className={`form-control ${inputs.error_list.password && 'is-invalid'}`} id="inputPassword4" name='password' value={inputs.password} onChange={handleChange} placeholder='Password must be at least 8 characters' />
                                                {inputs.error_list.password && <div className="invalid-feedback">{inputs.error_list.password}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="mobileNumber" className="form-label">Mobile Number <span className="text-danger">*</span></label>
                                                <input type="text" className={`form-control ${inputs.error_list.contact && 'is-invalid'}`} id="contact" name='contact' value={inputs.contact} onChange={handleChange} placeholder='Enter your mobile number' />
                                                {inputs.error_list.contact && <div className="invalid-feedback">{inputs.error_list.contact}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputdob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                                <input type="date" className={`form-control ${inputs.error_list.dob && 'is-invalid'}`} id="inputdob" name='dob' value={inputs.dob} onChange={handleChange} />
                                                {inputs.error_list.dob && <div className="invalid-feedback">{inputs.error_list.dob}</div>}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="gender" className="form-label">Gender <span className="text-danger">*</span></label>
                                                <select className={`form-select ${inputs.error_list.gender && 'is-invalid'}`} aria-label="Default select example" name='gender' value={inputs.gender} onChange={handleChange}>
                                                    <option value="" disabled>Select your gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                {inputs.error_list.gender && <div className="invalid-feedback">{inputs.error_list.gender}</div>}
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="Address" className="form-label">Address</label>
                                                <textarea className="form-control" id="Address" name="address" value={inputs.address} onChange={handleChange} placeholder="Enter your address" rows="3"></textarea>
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-success"><i className="fa fa-user-plus mr-1" aria-hidden="true"></i> Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <span className="text-muted">
                                            Already have an account? <Link to="/auth">Login Here</Link>
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
}

export default RegisterPage;
