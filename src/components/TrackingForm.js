// components/TrackingForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    navigate(`/track/${trackingNumber}`);
  };

  return (
    <form onSubmit={handleTrack} className="d-flex flex-column align-items-center">
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter tracking number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        required
      />
      <button className="btn btn-warning" type="submit">Track</button>
    </form>
  );
};

export default TrackingForm;
