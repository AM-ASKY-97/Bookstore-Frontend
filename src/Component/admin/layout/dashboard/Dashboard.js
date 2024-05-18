import React, { useEffect, useState } from 'react'

import './Dashboard.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminDashboard from './AdminDashboard';
import UserDashboard from '../../../user/layout/dashboard/UserDashboard';

// Decryption function
const decryptData = (encryptedData) => {
    // Perform decryption here, this is just a placeholder
    return atob(encryptedData);
};


const Dashboard = () => {

    var encryptedRole = localStorage.getItem('role');
    var decryptedRole = decryptData(encryptedRole);

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Dashboard </div>

            {
                decryptedRole == 1 ? (
                    <AdminDashboard />
                ) : (
                    <UserDashboard />
                )
            }
        </div>
    )
}

export default Dashboard