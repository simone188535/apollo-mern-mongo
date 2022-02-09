import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

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

  const searchButton = Auth.loggedIn() ? <>
  <button class="btn btn-outline-success" type="submit">Search</button>
  </> : <>
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
            <ul className="dropdown-menu account-dropdown" aria-labelledby="search-dropdown">
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
          </>;

  // if (Auth.loggedIn()) {
  // return (
  //   <>
  //     <div>
  //       <InputGroup className="mb-3">
  //         <FormControl
  //           placeholder="Search Vinyls"
  //           aria-label="Recipient's username"
  //           aria-describedby="basic-addon2"
  //         />
  //         <Button variant="outline-secondary" id="button-addon2">
  //           Search
  //         </Button>
  //       </InputGroup>
  //     </div>
  //     <div>
  //       <NavDropdown title="Account">
  //         <Link to="/upload">Upload</Link>
  //         <Link to="/me">{Auth.getProfile().data.username}'s profile</Link>
  //         <button onClick={logout}>Logout</button>
  //       </NavDropdown>
  //     </div>
  //   </>
  // );
  // }

  // If logged out show login controls
  return (
    <>
      {/* <div className='d-flex'>
        <InputGroup className="mb-3">
          <FormControl aria-label="Text input with dropdown button" placeholder='ex. Elvis'
            onChange={event => setSearchTerm(event.target.value)} />

          <DropdownButton
            variant="outline-secondary"
            title="Search by"
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item onClick={() => setType("artist")} >Artist</Dropdown.Item>
            <Dropdown.Item onClick={() => setType("song")} >Song</Dropdown.Item>
            <Dropdown.Item onClick={() => setType("genre")} >Genre</Dropdown.Item>

          </DropdownButton>
        </InputGroup>
        <NavDropdown title='Account'>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Signup
          </Link>
        </NavDropdown>
      </div> */}

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
      <form className="d-flex mx-auto w-75">
          <input
            className="form-control me-2"
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
              className="nav-link dropdown-toggle text-light"
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
