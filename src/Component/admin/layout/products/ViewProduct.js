import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../App';

const ViewProduct = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const { id } = useParams();

    const [inputs, setInputs] = useState({
        url: "",
        name: "",
        description: "",
        purPrice: "",
        sellPrice: "",
        quantity: 10
    })

    useEffect(() => {
        axios.get(BASE_URL+"/auth/view_book/" + id).then(res => {
            console.log(res)
            setInputs({
                url: res.data.book.avatar,
                name: res.data.book.book_name,
                description: res.data.book.description,
                purPrice: res.data.book.pur_price,
                sellPrice: res.data.book.selling_price
            })
        });
    }, []);

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / View Product </div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i class="fa fa-cart-plus" aria-hidden="true"></i> View Product</div>
                </h5>
                <div className="card-body">
                    <div className='row flex-column-reverse flex-lg-row'>
                        <div className='col-12 col-lg-8'>
                            <form className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label for="name" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" name='name' value={inputs.name} id="name" readOnly />
                                </div>
                                <div className="col-12">
                                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control text-lowercase" name='description' value={inputs.description} id="exampleFormControlTextarea1" rows="3" readOnly></textarea>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label for="pur_price" className="form-label">Purchase Price</label>
                                    <input type="number" className="form-control text-end" name='purPrice' value={inputs.purPrice + ".00"} id="pur_price" readOnly />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label for="selling_price" className="form-label">Selling Price</label>
                                    <input type="number" className="form-control text-end" name='sellPrice' value={inputs.sellPrice + ".00"} id="selling_price" readOnly />
                                </div>
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary" onClick={goBack}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back</button>
                                </div>
                            </form>
                        </div>

                        <div className='col-12 col-lg-4 view-image p-2 p-md-0'>
                            <img src={'http://localhost:8000/upload/books/' + inputs.url} class="img-fluid" width={200} alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct