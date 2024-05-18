import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const AddProducts = () => {
    const navigate = useNavigate();

    const [load, setLoad] = useState(true);

    const [inputs, setInputs] = useState({
        avatar: '',
        book_name: '',
        description: '',
        pur_price: '',
        selling_price: '',
        category: ''
    });

    const [errors, setErrors] = useState({
        avatar: '',
        book_name: '',
        description: '',
        pur_price: '',
        selling_price: '',
        category: ''
    });

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const [photo, setPhoto] = useState([]);

    const handleImage = (event) => {
        setPhoto({ avatar: event.target.files[0] });
    }

    const validateForm = () => {
        let valid = true;
        const newErrors = { avatar: '', book_name: '', description: '', pur_price: '', selling_price: '', category: '' };
    
        if (!photo.avatar) {
            newErrors.avatar = 'Image is required';
            valid = false;
        }
    
        if (!inputs.book_name.trim()) {
            newErrors.book_name = 'Book Name is required';
            valid = false;
        }
    
        if (!inputs.description.trim()) {
            newErrors.description = 'Description is required';
            valid = false;
        }
    
        if (inputs.pur_price === '' || isNaN(inputs.pur_price) || inputs.pur_price < 0) {
            newErrors.pur_price = 'Purchase Price must be a non-negative number';
            valid = false;
        }
    
        if (inputs.selling_price === '' || isNaN(inputs.selling_price) || inputs.selling_price < 0) {
            newErrors.selling_price = 'Selling Price must be a non-negative number';
            valid = false;
        }
    
        if (!inputs.category) {
            newErrors.category = 'Category is required';
            valid = false;
        }
    
        setErrors(newErrors);
        return valid;
    };
    

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData();

            formData.append('avatar', photo.avatar);
            formData.append('book_name', inputs.book_name);
            formData.append('description', inputs.description);
            formData.append('selling_price', inputs.selling_price);
            formData.append('pur_price', inputs.pur_price);
            formData.append('category', inputs.category);

            setLoad(false);

            axios.post(BASE_URL + '/auth/add-book', formData)
                .then(res => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Record Inserted Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/auth/view-products');
                })
                .catch((e) => {
                    Swal.fire({
                        title: 'Warning !',
                        icon: 'warning',
                        text: e,
                        button: 'Ok!'
                    });

                    setLoad(true);
                });
        }
    };

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Add New Books </div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='fa fa-cart-plus' aria-hidden='true'></i> Add New Books</div>
                </h5>
                <div className='card-body'>
                    <form className='row g-3' onSubmit={handleFormSubmit}>
                        <div className='col-md-6'>
                            <label htmlFor='inputURL' className='form-label'>Add book Pic</label>
                            <input class="form-control" type="file" id="formFile" name='avatar' onChange={handleImage} />
                            {errors.avatar && <div className='invalid-feedback'>{errors.avatar}</div>}
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='name' className='form-label'>Book Name</label>
                            <input
                                type='text'
                                className={`form-control ${errors.book_name && 'is-invalid'}`}
                                name='book_name'
                                value={inputs.book_name}
                                id='name'
                                onChange={handleChange}
                            />
                            {errors.book_name && <div className='invalid-feedback'>{errors.book_name}</div>}
                        </div>
                        <div className='col-12'>
                            <label htmlFor='exampleFormControlTextarea1' className='form-label'>Description</label>
                            <textarea
                                className={`form-control text-lowercase ${errors.description && 'is-invalid'}`}
                                name='description'
                                value={inputs.description}
                                id='exampleFormControlTextarea1'
                                rows='3'
                                onChange={handleChange}
                            ></textarea>
                            {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='pur_price' className='form-label'>Purchase Price</label>
                            <input
                                type='number'
                                className={`form-control ${errors.pur_price && 'is-invalid'}`}
                                name='pur_price'
                                value={inputs.pur_price}
                                id='pur_price'
                                onChange={handleChange}
                            />
                            {errors.pur_price && <div className='invalid-feedback'>{errors.pur_price}</div>}
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='selling_price' className='form-label'>Selling Price</label>
                            <input
                                type='number'
                                className={`form-control ${errors.selling_price && 'is-invalid'}`}
                                name='selling_price'
                                value={inputs.selling_price}
                                id='selling_price'
                                onChange={handleChange}
                            />
                            {errors.selling_price && <div className='invalid-feedback'>{errors.selling_price}</div>}
                        </div>
                        <div className='col-12 col-md-6'>
                            <label htmlFor='categ' className='form-label'>Select Book Category</label>
                            <select aria-label="Default select example" name='category' onChange={handleChange} className={`form-select ${errors.category && 'is-invalid'}`}>
                            <option value="">Select book Category</option>
                                <option value="Cookbooks and Food Literature">Cookbooks and Food Literature</option>
                                <option value="Religion and Spirituality">Religion and Spirituality</option>
                                <option value="Travel and Adventure">Travel and Adventure</option>
                                <option value="Children's Books">Children's Books</option>
                            </select>
                            {errors.category && <div className='invalid-feedback'>{errors.category}</div>}
                        </div>
                        <div className='col-12'>
                            {
                                load ? (
                                    <button type='submit' className='btn btn-success'>
                                        <i className='fa fa-check-circle' aria-hidden='true'></i> Add to Gallery
                                    </button>
                                ) : (
                                    <div className='d-flex justify-content-center mt-2'>
                                        <div className="spinner-border text-warning text-center" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
