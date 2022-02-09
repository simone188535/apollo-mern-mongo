import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import './assets/css/style.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg nav">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-light">
          <h1>Vinyl Collection</h1>
        </Link>
        <Navbar />
      </div>
    </nav>
  );
};

export default Header;
