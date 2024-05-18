import React, { useEffect, useState } from 'react'
import user from './user.png'
import logo from './logo.png';
import './AdminMobileView.css'
import axios from 'axios';
import { BASE_URL } from '../../../App';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
const AdminMobileView = () => {

    // Decryption function
    const decryptData = (encryptedData) => {
        // Perform decryption here, this is just a placeholder
        return atob(encryptedData);
    };

    const navigate = useNavigate()

    var encryptedName = localStorage.getItem('name');
    var decryptedName = decryptData(encryptedName);

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

    const [inputs, setInputs] = useState({
        Avatar: "",
    })

    var id = localStorage.getItem('id');

    useEffect(() => {
        axios.get(BASE_URL + '/auth/index/' + id).then(res => {
            if (res.data.status === 200) {
                console.log(res.data);
                setInputs({
                    Avatar: res.data.user.avatar,
                })
            }
        }).catch(() => {

        })
    }, []);

    return (
        <div className='container-fliud text-white bg-dark bg-gradient py-4 sticky-top'>
            <div className='container d-flex justify-content-between'>
                <div className='d-lg-none'>
                    <span>
                        <img src={logo} alt='logo' width="90px" />
                    </span>
                    <a href="#" className="text-white ms-3" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar">
                        <i className="fas fa-bars"></i>
                    </a>
                </div>

                <div className='d-none d-lg-block'>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

                <div className=''>
                    <div className="dropdown ms-3">
                        <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={'http://localhost:8000/upload/user/' + inputs.Avatar} width={30} height={30} className='user' /> {decryptedName}
                        </div>
                        <ul className="dropdown-menu bg-dark bg-gradient">
                            <li><a className="dropdown-item text-white" href="#"><i className='bx bxs-user'></i> <span className='drop'>My Profile</span></a></li>
                            <li><a className="dropdown-item text-white" href="#"><i className='fa fa-cog'></i> <span className='drop'>Settings</span></a></li>
                            <li><a className="dropdown-item text-white" href="#" onClick={logout}><i className='bx bx-log-out'></i> <span className='drop'>Logout</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMobileView