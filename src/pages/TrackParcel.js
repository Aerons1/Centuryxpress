import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import './TrackParcel.css';

function TrackParcel() {
  const { trackingNumber } = useParams();
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    API.get(`/parcel/${trackingNumber}`)
      .then(res => setParcel(res.data))
      .catch(() => setParcel(null));
  }, [trackingNumber]);

  if (!parcel) {
    return (
      <div className="track-container">
        <div className="track-box">
          <p>Parcel not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="track-container">
      <div className="track-box">
        <h2>Tracking #{parcel.trackingNumber}</h2>
        <p><strong>Status:</strong> {parcel.status}</p>
        <p><strong>Location:</strong> {parcel.location}</p>
        <p><strong>Sender:</strong> {parcel.senderName}</p>
        <p><strong>Receiver:</strong> {parcel.receiverName}</p>
        <hr />
        <h5>History</h5>
        <ul>
          {parcel.logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TrackParcel;
