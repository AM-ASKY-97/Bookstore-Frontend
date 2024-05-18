import React, { useEffect, useState } from 'react';
import AdminNavbar from '../admin-nav/AdminNavbar';
import AdminMobileView from '../admin-mobile-nav/AdminMobileView';
import { Outlet } from 'react-router-dom';
import './AdminMasterLayout.css';
import LoadingPage from '../../frontend/loading/LoadingPage';


const AdminMasterLayout = () => {

    return (
        <div className="container-fluid p-0 d-flex main">
            <AdminNavbar />
            <div className="flex-fill main-content">
                <AdminMobileView />

                <main className='admin-main p-2 p-lg-3'>
                    <Outlet />
                </main>
            </div>
        </div>

    );
};

export default AdminMasterLayout;
