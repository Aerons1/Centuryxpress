import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAdmin, isLoggedIn, getUserInfo } from '../auth';

function Navbar() {
  const navigate = useNavigate();
  const userInfo = getUserInfo(); // Assuming you have a function to get user info from the token

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">CenturyXpress 🚚📦</Link>
      <div className="ms-auto d-flex align-items-center gap-2">
        {!isLoggedIn() && (
          <>
            <Link className="btn btn-outline-light" to="/login">Login</Link>
            
          </>
        )}

        {isLoggedIn() && !isAdmin() && (
          <>
            <span className="navbar-text text-light">{userInfo?.name}</span> {/* User's name */}
            <Link className="btn btn-outline-info" to="/dashboard">Dashboard</Link>
          </>
        )}

        {isAdmin() && (
          <Link className="btn btn-warning" to="/admin">Admin</Link>
        )}

        {isLoggedIn() && (
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
