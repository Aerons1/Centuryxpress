// Save token in localStorage
export const saveToken = (token) => localStorage.setItem('token', token);

// Get user info from the token
export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return { name: decoded.name, isAdmin: decoded.isAdmin }; // Extract name and isAdmin from payload
  } catch {
    return null;
  }
};

// Logout by removing the token from localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if the user is an admin from the token payload
export const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.isAdmin === true;
  } catch {
    return false;
  }
};

// Check if the user is logged in by verifying the presence of the token
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;  // Check if there's a token stored
};
