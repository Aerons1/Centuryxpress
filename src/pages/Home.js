import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber.trim()}`);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to CenturyExpress</h1>
      <p className="home-subtitle">
        Fast. Reliable. Local. International. Shipping Service. Trusted By Millions Worldwide.
      </p>

      <div className="tracking-box">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
          />
          <button className="btn btn-primary px-4" onClick={handleTrack}>
            Track
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
