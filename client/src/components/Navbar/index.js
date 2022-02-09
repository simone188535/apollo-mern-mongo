import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Auth from "../../utils/auth";

function Navbar() {
  const history = useHistory();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm && type) {
      history.push(`/results?q=${searchTerm}&${type}`)
    }
  };

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
        <button className="btn btn-primary" onClick={logout}>Logout</button>
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
      <button class="btn btn-secondary" type="submit">
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
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setType("artist")}
            >
              Artist
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setType("song")}
            >
              Song
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setType("genre")}
            >
              Genre
            </Link>
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
        <form
          className="d-flex mx-auto w-75"
          onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="search"
            placeholder={placeholder}
            aria-label="Search"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {searchButton}
          <button class="btn btn-secondary" type="submit">
            Search
          </button>
        </form>
        <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-light text-center"
              to="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </Link>
            <ul
              className="dropdown-menu text-center"
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
