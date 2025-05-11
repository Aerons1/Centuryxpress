import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <h5 className="mb-3">Trusted By Over 10+ Million Users Worldwide</h5>
        <p>&copy; {new Date().getFullYear()} CenturyXpress. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
