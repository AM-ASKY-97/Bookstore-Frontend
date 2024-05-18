// ErrorPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './ErrorPage.css'

function ErrorPage() {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="error-card text-center p-4 mt-5">
                        <h1 className="display-4">404 Error!</h1>
                        <p className="lead">Oops! Page not found.</p>
                        <button className="btn btn-primary" onClick={goBack}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
