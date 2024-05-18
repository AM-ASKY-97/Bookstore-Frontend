import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../../App';

const Orders = () => {

    const [getTotalOrder, setTotalOrder] = useState([]);

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = () => {
        axios.get(BASE_URL + '/auth/order-by-user')
            .then(res => {
                console.log(res.data.results);
                setTotalOrder(res.data.results);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>

            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Order View</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='bx bxs-doughnut-chart'></i> Order View</div>
                </h5>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Invoice Number</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTotalOrder.length > 0 ?
                                        getTotalOrder.map((order, index) => (
                                            <tr key={index}>
                                                <th scope="row">{++index}</th>
                                                <td>#{order.invoice}</td>
                                                <td>{order.created_at}</td>
                                                <td className='text-end'>LKR - {order.Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                <td className='text-center'>
                                                    {
                                                        order.status === 1 ? (
                                                            <span className='btn btn-success btn-sm'>Approved</span>
                                                        ) : order.status === 2 ? (
                                                            <span className='btn btn-danger btn-sm'>Reject</span>
                                                        ) : order.status === 0 ? (
                                                            <span className='btn btn-warning btn-sm'>Pending</span>
                                                        ) : (
                                                            null
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                        : (
                                            <tr>
                                                <td colSpan="7" className="text-center text-danger">No orders found</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders