import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const UpdateProduct = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const { id } = useParams();

    const [inputs, setInputs] = useState({
        url: "",
        book_name: "",
        description: "",
        pur_price: "",
        selling_price: "",
    })

    useEffect(() => {
        axios.get(BASE_URL + "/auth/edit-book/" + id).then(res => {
            console.log(res)
            setInputs({
                url: res.data.imageURL,
                book_name: res.data.book.book_name,
                description: res.data.book.description,
                pur_price: res.data.book.pur_price,
                selling_price: res.data.book.selling_price
            })
        });
    }, []);

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleFormsubmit = (event) => {
        event.preventDefault();

        let data = {
            book_name: inputs.book_name,
            description: inputs.description,
            pur_price: inputs.pur_price,
            selling_price: inputs.selling_price,
        }

        axios.put(BASE_URL + '/auth/update-book/' + id, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Record Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(-1);
            }
        }).catch((e) => {
            Swal.fire({
                title: "Warning !",
                icon: 'warning',
                text: e,
                button: "Ok!"
            });
        })
    }

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Update Product </div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='d-flex justify-content-between'>
                        <div className='admin-text fw-bold fs-3'><i class="fa fa-cart-plus" aria-hidden="true"></i> Update Product</div>
                        <div><button type="button" className="btn btn-primary" onClick={goBack}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back</button></div>
                    </div>
                </h5>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-12'>
                            <form className="row g-3" onSubmit={handleFormsubmit}>
                                <div className="col-12 col-md-6">
                                    <label for="name" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" name='book_name' value={inputs.book_name} onChange={handleChange} id="book_name" required />
                                </div>
                                <div className="col-12">
                                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control text-lowercase" name='description' value={inputs.description} onChange={handleChange} id="exampleFormControlTextarea1" rows="3" required></textarea>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label for="pur_price" className="form-label">Purchase Price</label>
                                    <input type="text" className="form-control text-end" name='pur_price' value={inputs.pur_price} onChange={handleChange} id="pur_price" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label for="selling_price" className="form-label">Selling Price</label>
                                    <input type="text" className="form-control text-end" name='selling_price' value={inputs.selling_price} onChange={handleChange} id="selling_price" required />
                                </div>
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-success"><i className="fa fa-check-circle" aria-hidden="true"></i> Update Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct