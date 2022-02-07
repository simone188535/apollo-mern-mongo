import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import './assets/css/style.css'

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Vinyl Collection</h1>
        </Link>
      </div>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
