import React, { useEffect, useState } from 'react'
import { AdminNavBank } from './AdminNavBank'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-scroll';

import logo from './logo.png'
import { UserNavBank } from './UserNavBank';
import axios from 'axios';
import { BASE_URL } from '../../../App';

// Decryption function
const decryptData = (encryptedData) => {
    // Perform decryption here, this is just a placeholder
    return atob(encryptedData);
};

const AdminNavbar = () => {

    const navigate = useNavigate()

    const [activeLink, setActiveLink] = useState('');

    const handleClick = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {
        setActiveLink('Dashboard');
    }, []);

    var encryptedRole = localStorage.getItem('role');
    var decryptedRole = decryptData(encryptedRole);

    const logout = (e) => {
        e.preventDefault();

        axios.post(BASE_URL+ '/logout').then(res =>{
            if(res.data.status === 200){
                localStorage.removeItem('name');
                localStorage.removeItem('authToken');
                localStorage.removeItem('role');
                localStorage.removeItem('id');


                navigate('/');
            }
        })
    }


    return (
        <div id="bdSidebar" className="d-flex flex-column flex-shrink-0 p-4 position-fixed overflow-auto vh-100 bg-dark bg-gradient text-white offcanvas-lg offcanvas-start" style={{ width: '280px' }}>

            <a className="navbar-brand navbar-brand text-center" href="#">
                <img src={logo} alt="" width={200} />
            </a>
            <hr />

            {
                decryptedRole == 1 ? (
                    <ul className="mynav nav nav-pills flex-column mb-md-auto mb-5">
                        {
                            AdminNavBank.map((linkBank) => (
                                <li className="nav-item" key={linkBank.id}>
                                    <RouterLink
                                        to={linkBank.link}
                                        className={`${activeLink === linkBank.linkName ? 'active' : 'notactive'}`}
                                        onClick={() => handleClick(linkBank.linkName)}
                                    >
                                        <i className={linkBank.icon}></i> {linkBank.linkName}
                                    </RouterLink>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <ul className="mynav nav nav-pills flex-column mb-md-auto mb-5">
                        {
                            UserNavBank.map((linkBank) => (
                                <li className="nav-item" key={linkBank.id}>
                                    <RouterLink
                                        to={linkBank.link}
                                        className={`${activeLink === linkBank.linkName ? 'active' : 'notactive'}`}
                                        onClick={() => handleClick(linkBank.linkName)}
                                    >
                                        <i className={linkBank.icon}></i> {linkBank.linkName}
                                    </RouterLink>
                                </li>
                            ))
                        }
                    </ul>
                )
            }

            <a className='btn btn-danger' onClick={logout}><i className='bx bx-log-out'></i> Logout</a>
        </div>
    )
}

export default AdminNavbar