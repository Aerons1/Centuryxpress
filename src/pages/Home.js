import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import pexelsTima3 from '../assets/pexels-tima3.jpg';
import pexelsShipping1 from '../assets/pexels-shipping1.jpg';
import homepic1 from '../assets/homepic1.jpg';

function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber.trim()}`);
    }
  };

  const cardData = [
    {
      title: 'Xpress Delivery',
      text: 'Speedy and reliable deliveries across the globe.',
      image: pexelsTima3,
    },
    {
      title: '24/7 Tracking',
      text: 'Track your packages/goods anytime with real-time updates.',
      image: pexelsShipping1,
    },
    {
      title: 'Secure Packaging',
      text: 'We handle your items with top-level security and care.',
      image: homepic1,
    },
  ];

  return (
    <div className="home-container py-5">
      <h1 className="home-title text-center mb-3">Welcome to CenturyXpress</h1>
      <p className="home-subtitle text-center mb-4">
        Fast. Reliable. Local. International. Shipping Service. Trusted By Millions Worldwide.
      </p>

      <div className="tracking-box mb-5 d-flex justify-content-center">
        <div className="input-group w-100" style={{ maxWidth: '500px' }}>
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

      {/* Cards with overlay text */}
      <div className="row">
        {cardData.map((card, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
              <div className="card-image-overlay">
                <img src={card.image} className="card-img-top" alt={card.title} />
                <div className="overlay-text">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
