import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImage from '../assets/pexels-userdash.jpg'; // ✅ Import image

function UserDashboard() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      toast.error('Please log in to access your dashboard');
      navigate('/login');
    } else {
      // Extract username from token
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload.name || 'User');
    }
  }, [navigate]);

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber.trim()}`);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white'
      }}
    >
      <div className="container py-5">
        <h2 className="text-center mb-4">Welcome, {userName} 👋</h2>

        <div className="card bg-dark bg-opacity-75 text-light mb-4 p-4 shadow-lg">
          <h4>📦 Track Your Parcel</h4>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            />
            <button className="btn btn-primary" onClick={handleTrack}>Track</button>
          </div>
        </div>

        <div className="card bg-dark bg-opacity-75 text-light p-4 shadow-lg">
          <h4>🧾 Other User Functions</h4>
          <ul className="mt-3">
            <li>View Parcel History (coming soon)</li>
            <li>Edit Profile (coming soon)</li>
            <li>Request New Parcel (coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
