import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import './assets/css/style.css';
import logo from './assets/images/logo.png'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg nav">
      <div className="container">
        <Link to="/" draggable='false' className="navbar-brand text-light">
          <img className='spin' draggable='false' src={logo} alt='Logo'></img>
        </Link>
        <Navbar />
      </div>
    </nav>
  );
};

export default Header;
