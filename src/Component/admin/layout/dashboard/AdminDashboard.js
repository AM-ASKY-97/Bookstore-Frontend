import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

const AdminDashboard = () => {

    const [getTotalBook, setTotalBook] = useState(0);
    const [getTotalUser, setTotalUser] = useState(0);

    useEffect(() => {
        fetchTotalBooks();
        fetchTotalUsers();
    
        const interval = setInterval(() => {
            fetchTotalBooks();
            fetchTotalUsers();
        }, 1000);
    
        return () => clearInterval(interval); // Clear the interval in the cleanup function
    }, []);
    

    const fetchTotalBooks = () => {
        axios.get(BASE_URL + '/auth/books')
            .then(response => {
                setTotalBook(response.data.totalBooks);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    const fetchTotalUsers = () => {
        axios.get(BASE_URL + '/auth/users')
            .then(response => {
                setTotalUser(response.data.totalUsers);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    };
   
    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalUser}<br /><span>Customers</span></p>
                        <i className="fa fa-users box-icon"></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>{getTotalBook}<br /><span>Books</span></p>
                        <i className='bx bxl-product-hunt box-icon' ></i>
                    </div>
                </div>

                <div className='col-12 col-md-3 mb-2'>
                    <div className="box">
                        <p>0<br /><span>Orders</span></p>
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


            <div className='row mt-5'>
                <div className='col-12'>
                    <div className="col-div-4">
                        <div className="box-4">
                            <div className="content-box">
                                <p>Total Sale <span>See All</span></p>

                                <div className="circle-wrap">
                                    <div className="circle">
                                        <div className="mask full">
                                            <div className="fill"></div>
                                        </div>
                                        <div className="mask half">
                                            <div className="fill"></div>
                                        </div>
                                        <div className="inside-circle"> 50% </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard