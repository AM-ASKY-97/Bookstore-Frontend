import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../App';

const Customer = () => {
    const [getUsers, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    
        const interval = setInterval(() => {
            fetchUsers();
        }, 1000);
    
        return () => clearInterval(interval); // Clear the interval in the cleanup function
    }, []);
    

    const fetchUsers = () => {
        axios.get(BASE_URL + '/auth/users')
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Customer</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className='bx bxs-user-detail'></i> Customers</div>
                </h5>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Mobile Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getUsers.length > 0 ?
                                        getUsers.map((user, index) => (
                                            <tr key={user.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td><img src={'http://localhost:8000/upload/user/' + user.avatar} alt={user.name} className="img-fluid rounded-circle" style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
                                                <td>{user.name}</td>
                                                <td className='text-lowercase'>{user.email}</td>
                                                <td>{user.address}</td>
                                                <td>{user.contact}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    <div className='d-flex justify-content-center'>
                                                        <div className="spinner-border text-danger text-center" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer;
