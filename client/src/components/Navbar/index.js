import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Auth from "../../utils/auth";

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");

  if (searchTerm && type) {
    return <Redirect to={`/results?term=${searchTerm}&type=${type}`} />;
  }

  const dropDownItem = Auth.loggedIn() ? (
    <>
      <li>
        <Link to="/upload" className="dropdown-item">
          Upload
        </Link>
      </li>
      <li>
        <Link to="/me" className="dropdown-item">
          {Auth.getProfile().data.username}'s profile
        </Link>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login" className="dropdown-item">
          Login
        </Link>
      </li>
      <li>
        <Link to="/signup" className="dropdown-item">
          Sign Up
        </Link>
      </li>
    </>
  );

  const placeholder = Auth.loggedIn() ? "Search Vinyls" : "ex. Elvis";

  const searchButton = Auth.loggedIn() ? (
    <>
      <button class="btn btn-outline-success" type="submit">
        Search
      </button>
    </>
  ) : (
    <>
      <div className="btn-group">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="search-dropdown"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
        >
          Search by
        </button>
        <ul
          className="dropdown-menu account-dropdown"
          aria-labelledby="search-dropdown"
        >
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setType("artist")}
            >
              Artist
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setType("song")}
            >
              Song
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setType("genre")}
            >
              Genre
            </a>
          </li>
        </ul>
      </div>
    </>
  );

  // If logged out show login controls
  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon mt-2 text-light">
          <FontAwesomeIcon icon={faBars} />
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
        <form className="d-flex mx-auto w-75">
          <input
            className="form-control"
            type="search"
            placeholder={placeholder}
            aria-label="Search"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {searchButton}
        </form>
        <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-light text-center"
              href="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarScrollingDropdown"
            >
              {dropDownItem}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
