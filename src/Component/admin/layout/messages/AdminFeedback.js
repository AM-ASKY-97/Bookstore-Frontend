import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const AdminFeedback = () => {

    const [getFeedback, setFeedback] = useState([]);


    useEffect(() => {
        axios.get(BASE_URL + '/feedbacks').then(res => {
            console.log(res.data);
            setFeedback(res.data);
        }).catch((e) => {
            console.log(e);
        })
    }, []);


    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Feedback</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i class='bx bxs-message-dots'></i>Customer Feedback</div>
                </h5>
                <div className="card-body">

                    <div className='row'>
                        <div className="col-12 col-md-6 pb-3">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr className="text-center">
                                    <th scope="col">#</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Customer Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getFeedback.length > 0 ? (
                                    getFeedback.map((feedback, index) => (
                                        <tr key={index} className="text-center">
                                            <th scope="row">{index + 1}</th>
                                            <td>{feedback.name}</td>
                                            <td>{feedback.feedBack}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            <div className='d-flex justify-content-center'>
                                                <div className="spinner-border text-danger text-center" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminFeedback