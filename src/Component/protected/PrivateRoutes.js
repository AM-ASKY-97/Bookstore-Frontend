import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../App';
import Swal from 'sweetalert2';

const PrivateRoutes = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchAuthenticatedStatus = async () => {
            try {
                const response = await axios.get(BASE_URL + '/checkingAuthenticated', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                if (response.status === 200) {
                    setAuthenticated(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    Swal.fire({
                        title: 'Unauthorized',
                        text: error.response.data.message,
                        icon: 'warning',
                    }).then(() => {
                        localStorage.removeItem('authToken'); // Remove expired token
                        window.location.href = '/login'; // Redirect to login page
                    });
                } else {
                    console.error('Error occurred:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            axios.post(BASE_URL + '/logout').then(res => {
                if (res.data.status === 200) {
                    console.log("removed token")
                }
            })
            Swal.fire({
                title: 'Session Timeout',
                text: 'Your session has expired. Please log in again.',
                icon: 'warning',
            }).then(() => {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            });
        }, 7200000); // 2 minutes expiration time 120000

        fetchAuthenticatedStatus();

        return () => clearTimeout(timer); // Cleanup function
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
