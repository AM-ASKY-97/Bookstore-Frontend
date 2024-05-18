import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../../App';

const UserDashboard = () => {

    const [getTotalProduct, setTotalProduct] = useState(0);
    const [getTotalOrder, setTotalOrder] = useState(0);

    var userID = localStorage.getItem('id');

    useEffect(() => {
        countProduct();
        countOrder();
    }, []);

    const countProduct = () =>{
        axios.get(BASE_URL+'/count').then(res => {
            console.log(res.data);
            setTotalProduct(res.data);
        }).catch((e) => {
            console.log(e)
        })
    }

    const countOrder = () =>{
        axios.get(BASE_URL+'/distinctInvoiceNumbers/'+ userID).then(res => {
            console.log(res.data);
            setTotalOrder(res.data);
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalOrder}<br /><span>Orders</span></p>
                        <i className="fa fa-shopping-bag box-icon"></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalProduct}<br /><span>Books</span></p>
                        <i className='bx bxl-product-hunt box-icon' ></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalOrder}<br /><span>Reviews</span></p>
                        <i className="fa fa-shopping-bag box-icon"></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>04<br /><span>Category</span></p>
                        <i className='bx bxs-category box-icon'></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard