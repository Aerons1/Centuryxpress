import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { isAdmin } from '../auth';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [parcels, setParcels] = useState([]);
  const [newParcel, setNewParcel] = useState({
    senderName: '',
    senderLocation: '',
    receiverName: '',
    receiverAddress: '',
    receiverLocation: '',
    trackingNumber: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      toast.error('Access denied');
      navigate('/');
      return;
    }
    fetchParcels();
  }, [navigate]);

  const fetchParcels = () => {
    API.get('/admin/parcels')
      .then(res => setParcels(res.data))
      .catch(() => toast.error('Failed to fetch parcels'));
  };

  const updateStatus = (id, status) => {
    API.put(`/admin/parcel/${id}`, { status })
      .then(() => {
        toast.success('Status updated');
        fetchParcels();
      })
      .catch(() => toast.error('Update failed'));
  };

  const createParcel = () => {
    const { senderName, senderLocation, receiverName, receiverAddress, receiverLocation } = newParcel;
    if (!senderName || !senderLocation || !receiverName || !receiverAddress || !receiverLocation) {
      toast.error('Please fill all fields');
      return;
    }
    API.post('/admin/parcel', { ...newParcel })
      .then(() => {
        toast.success('Parcel created');
        setNewParcel({
          senderName: '',
          senderLocation: '',
          receiverName: '',
          receiverAddress: '',
          receiverLocation: '',
          trackingNumber: ''
        });
        fetchParcels();
      })
      .catch(() => toast.error('Creation failed'));
  };

  const generateTrackingNumber = () => {
    const trackingNumber = 'TRK' + Math.floor(100000000 + Math.random() * 900000000);
    setNewParcel(prev => ({ ...prev, trackingNumber }));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🚚 Admin Parcel Management</h2>

      <div className="card mb-4 p-4 shadow-sm">
        <h4>Create New Parcel</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Sender Name"
              value={newParcel.senderName}
              onChange={(e) => setNewParcel({ ...newParcel, senderName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Sender Location"
              value={newParcel.senderLocation}
              onChange={(e) => setNewParcel({ ...newParcel, senderLocation: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Receiver Name"
              value={newParcel.receiverName}
              onChange={(e) => setNewParcel({ ...newParcel, receiverName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Receiver Address"
              value={newParcel.receiverAddress}
              onChange={(e) => setNewParcel({ ...newParcel, receiverAddress: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Receiver Location"
              value={newParcel.receiverLocation}
              onChange={(e) => setNewParcel({ ...newParcel, receiverLocation: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tracking Number (Optional)"
              value={newParcel.trackingNumber}
              onChange={(e) => setNewParcel({ ...newParcel, trackingNumber: e.target.value })}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center gap-2">
            <button className="btn btn-secondary w-50" onClick={generateTrackingNumber}>
              Generate Tracking Number
            </button>
            <button className="btn btn-primary w-50" onClick={createParcel}>
              Create Parcel
            </button>
          </div>
        </div>
      </div>

      <h4>📦 Existing Parcels</h4>
      {parcels.length === 0 ? (
        <p>No parcels available</p>
      ) : (
        parcels.map(parcel => (
          <div key={parcel._id} className="card my-3 shadow-sm">
            <div className="card-body">
              <h5>Tracking: <strong>{parcel.trackingNumber}</strong></h5>
              <p>Sender: {parcel.senderName} ({parcel.senderLocation})</p>
              <p>Receiver: {parcel.receiverName}</p>
              <p>Address: {parcel.receiverAddress} ({parcel.receiverLocation})</p>
              <p>Status: <span className="badge bg-info">{parcel.status}</span></p>

              <div className="mt-3">
                <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(parcel._id, 'In Transit')}>
                  Mark In Transit
                </button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => updateStatus(parcel._id, 'Delivered')}>
                  Mark Delivered
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(parcel._id, 'Cancelled')}>
                  Cancel Parcel
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
