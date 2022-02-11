import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import './assets/css/style.css';
import logo from './assets/images/logo.png'

const Header = ({ setEasterEgg }) => {
  return (
    <nav className="navbar navbar-expand-lg nav">
      <div className="container justify-content-center">
        <Link to="/" draggable='false' className="navbar-brand text-light">
          <img className='spin nav-logo' draggable='false' src={logo} alt='Logo'></img>
        </Link>
        <Navbar setEasterEgg={setEasterEgg} />
      </div>
    </nav>
  );
};

export default Header;
