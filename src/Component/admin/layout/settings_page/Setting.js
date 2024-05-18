import React, { useState } from 'react';

const Setting = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [firstAccess, setFirstAccess] = useState('');
  const [lastAccess, setLastAccess] = useState('');

  const handleRegister = () => {
    const currentDate = new Date().toLocaleString();
    if (!firstAccess) {
      setFirstAccess(currentDate);
    }
    setLastAccess(currentDate);
    // Here you can add logic to send the registration data to your backend (e.g., using Axios)
    // For simplicity, I'm just logging it here
    console.log(`User ${username} registered with email ${email} on ${currentDate}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">User Registration</div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleRegister}>
                Register
              </button>
              {firstAccess && (
                <div className="mt-3">
                  <strong>First Access:</strong> {firstAccess}
                </div>
              )}
              {lastAccess && (
                <div className="mt-3">
                  <strong>Last Access:</strong> {lastAccess}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
