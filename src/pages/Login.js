import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api';
import { saveToken } from '../auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      saveToken(data.token);

      const decoded = jwtDecode(data.token);

      if (decoded.isAdmin) {
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        toast.success('Login successful!');
        navigate('/dashboard'); // Redirect normal users to dashboard
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Invalid credentials');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await API.post('/auth/google', {
        token: credentialResponse.credential
      });
      saveToken(data.token);

      const decoded = jwtDecode(data.token);

      if (decoded.isAdmin) {
        toast.success('Admin Google login successful!');
        navigate('/admin');
      } else {
        toast.success('Google login successful!');
        navigate('/dashboard'); // Redirect normal users to dashboard
      }
    } catch (err) {
      toast.error('Google Sign-In failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-3">Login</h2>
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
      <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
        Login
      </button>
      <hr />
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error('Google Login Failed')}
      />
    </div>
  );
}

export default Login;
