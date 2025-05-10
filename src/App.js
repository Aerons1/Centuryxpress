import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrackParcel from './pages/TrackParcel';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminRoute from './AdminRoute'; // <-- Import the admin route
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track/:trackingNumber" element={<TrackParcel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Normal user dashboard route */}
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
