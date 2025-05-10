import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api';
import { saveToken } from '../auth';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { data } = await API.post('/auth/signup', { name, email, password });
      saveToken(data.token);
      toast.success('Signup successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-3">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        className="form-control mb-2"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-success w-100" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}

export default Signup;
