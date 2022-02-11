import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Auth from "../../utils/auth";

function Navbar({ setEasterEgg }) {
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
      const splitTerm = searchTerm.split(':');
      if (splitTerm.length === 1) {
        setEasterEgg(false)
        history.push(`/results?q=${searchTerm}&${type.toLowerCase()}`)
      }
      else if (splitTerm[1] === 'spin') {
        setEasterEgg(true)
        history.push(`/results?q=${splitTerm[0]}&${type.toLowerCase()}`)
      }
    }
  };

  const searchType = (type) => {
    const result = type ? type : "Search by";
    return result;
  }

  const dropDownItem = Auth.loggedIn() ? (
    <>
      <li>
        <Link to="/upload" className="dropdown-item">
          <button className="col-12 btn btn-secondary border border-secondary text-white">Upload</button>
        </Link>
      </li>
      <li>
        <Link to="/me" className="dropdown-item">
          <button className="col-12 btn btn-secondary border border-secondary text-white">{Auth.getProfile().data.username}'s profile</button>
        </Link>
      </li>
      <li>
        <div className="dropdown-item">
          <button className="col-12 btn btn-secondary border border-secondary text-white" onClick={logout}>Logout</button>
        </div>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login" className="dropdown-item">
          <button className="col-12 btn btn-secondary border border-secondary text-white">Login</button>
        </Link>
      </li>
      <li>
        <Link to="/signup" className="dropdown-item">
          <button className="col-12 btn btn-secondary border border-secondary text-white">Sign Up</button>
        </Link>
      </li>
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
            className="form-control global-search"
            type="search"
            placeholder="ex. Elvis"
            aria-label="Search"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="btn-group border-left-0">
            <button
              className="btn btn-outline-secondary dropdown-toggle global-search-dropdown me-2"
              type="button"
              id="search-dropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
            >
              {searchType(type)}
            </button>
            <ul
              className="dropdown-menu account-dropdown"
              aria-labelledby="search-dropdown"
            >
              <li>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => setType("Artist")}
                >
                  Artist
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => setType("Song")}
                >
                  Song
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => setType("Genre")}
                >
                  Genre
                </Link>
              </li>
            </ul>
          </div>
          <button className="btn btn-secondary" type="submit">
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
